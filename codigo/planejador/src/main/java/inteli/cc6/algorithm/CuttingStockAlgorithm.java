package inteli.cc6.algorithm;

import com.google.ortools.Loader;
import com.google.ortools.linearsolver.MPConstraint;
import com.google.ortools.linearsolver.MPObjective;
import com.google.ortools.linearsolver.MPSolver;
import com.google.ortools.linearsolver.MPVariable;
import inteli.cc6.model.Demand;
import inteli.cc6.model.Pattern;
import inteli.cc6.model.Scenario;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CuttingStockAlgorithm {
    public Scenario solve(Scenario scenario) {
        Loader.loadNativeLibraries();

        // Get data from scenario request body
        int minMasterRollWidth = scenario.getMinMasterRollWidth();
        int maxMasterRollWidth = scenario.getMaxMasterRollWidth();
        List<Demand> scenarioDemands = scenario.getDemands(); // demand for each width
        // Transform demands into widths and demands array
        int[] widths = new int[scenarioDemands.size()];
        int[] demands = new int[scenarioDemands.size()];
        for (int i = 0; i < scenarioDemands.size(); i++) {
            widths[i] = scenarioDemands.get(i).getRollWidth();
            demands[i] = scenarioDemands.get(i).getQuantity();
        }
        int multipleOf = scenario.getMultipleOf(); // multiple of
        int maxRolls = scenario.getMaxRolls(); // max number of rolls created per cutting pattern (depends on the number of knives)
        int numOrderWidths = widths.length; // number of order widths
        double infinity = java.lang.Double.POSITIVE_INFINITY; // necessary for the solver constraints

        // Step 1: generate some initial patterns (for each width, use as many rolls as possible that fit in the roll width)
        int[][] patterns = new int[numOrderWidths][numOrderWidths];
        for (int i = 0; i < numOrderWidths; i++) {
            // Use as many rolls as possible that fit in the roll width or maxRolls, whichever is smaller
            patterns[i][i] = Math.min(maxMasterRollWidth / widths[i], maxRolls);
        }

        // Print each pattearn
        for (int[] pattern : patterns) {
            System.out.println(Arrays.toString(pattern));
        }

        while (true) {
            // MASTER PROBLEM
            MPSolver solver = MPSolver.createSolver("GLOP");
            MPVariable[] x = new MPVariable[patterns.length];

            // Step 2 - Relax the integrality constraints and solve the LP of the master problem
            for (int j = 0; j < patterns.length; j++) {
                x[j] = solver.makeNumVar(0.0, infinity, "x" + j);
            }

            // Print number of vars in the master problem
            System.out.println("Number of variables = " + solver.numVariables());

            // Demand Constraints (one for each order width)
            for (int i = 0; i < numOrderWidths; i++) {
                MPConstraint constraint = solver.makeConstraint(demands[i], infinity, "demand" + i);
                for (int j = 0; j < patterns.length; j++) {
                    constraint.setCoefficient(x[j], patterns[j][i]);
                }
            }

            // Print number of constraints in the master problem
            System.out.println("Number of constraints = " + solver.numConstraints());

            MPObjective objective = solver.objective();
            for (MPVariable xj : x) {
                objective.setCoefficient(xj, 1);
            }
            objective.setMinimization();

            solver.solve();

            // Step 3 - Use the dual values from the master problem to solve the knapsack sub-problem
            double[] dualValues = new double[numOrderWidths];
            for (int i = 0; i < numOrderWidths; i++) {
                dualValues[i] = solver.constraints()[i].dualValue();
            }

            // print dual values
            System.out.println("Dual values:");
            for (double dv : dualValues) {
                System.out.println(dv);
            }

            // KNAPSACK SUB-PROBLEM
            MPSolver knapsackSolver = MPSolver.createSolver("SCIP");

            // Variables
            MPVariable[] numRolls = new MPVariable[numOrderWidths];
            for (int i = 0; i < numOrderWidths; i++) {
                numRolls[i] = knapsackSolver.makeIntVar(0.0, maxMasterRollWidth / widths[i], "max_rolls"); // upper bound ensures the width constraint
            }

            // Objective
            MPObjective knapsackObjective = knapsackSolver.objective();
            for (int i = 0; i < numOrderWidths; i++) {
                knapsackObjective.setCoefficient(numRolls[i], dualValues[i]);
            }
            knapsackObjective.setMaximization();

            // Constraint "width" - the sum of the widths of the order widths multiplied by the number of rolls of each order width must be
            // between the minimum roll width and the maximum roll width
            MPConstraint knapsackSizeConstraint = knapsackSolver.makeConstraint(minMasterRollWidth, maxMasterRollWidth, "width");
            for (int i = 0; i < numOrderWidths; i++) {
                knapsackSizeConstraint.setCoefficient(numRolls[i], widths[i]);
            }

            // Constraint "max rolls" - the sum of the number of rolls must be less than the maximum number of rolls allowed
            MPConstraint knapsackMaxRollsConstraint = knapsackSolver.makeConstraint(0.0, maxRolls, "max_rolls");
            for (int i = 0; i < numOrderWidths; i++) {
                knapsackMaxRollsConstraint.setCoefficient(numRolls[i], 1);
            }

            // Solve
            knapsackSolver.solve();

            // Print number of vars in KnapSack sub-problem
            System.out.println("Knapsack Number of variables = " + knapsackSolver.numVariables());

            // Print number of constraints in KnapSack sub-problem
            System.out.println("Knapsack Number of constraints = " + knapsackSolver.numConstraints());

            // Print objective value in KnapSack sub-problem
            System.out.println("Knapsack Objective value = " + knapsackObjective.value());

            // If the objective value of the knapsack sub-problem is less than 1, then we have found the optimal solution
            double EPS = 1e-6;
            if (knapsackObjective.value() < 1 + EPS) {
                // POST PROCESSING (STAGE 2)
                // Convert the solution to the knapsack sub-problem to an integer solution for the master problem
                // with integers representing the number of rolls of each order width to use
                MPSolver intSolver = MPSolver.createSolver("SCIP");

                // Variables
                MPVariable[] xInt = new MPVariable[patterns.length];
                MPVariable[] yInt = new MPVariable[patterns.length];
                for (int j = 0; j < patterns.length; j++) {
                    xInt[j] = intSolver.makeIntVar(0.0, infinity, "x" + j);
                    yInt[j] = intSolver.makeIntVar(0.0, infinity, "y" + j);
                }

                // Constraints

                // Demand Constraints (one for each order width), same as in the master problem
                for (int i = 0; i < numOrderWidths; i++) {
                    MPConstraint constraint = intSolver.makeConstraint(demands[i], infinity, "demand" + i);
                    for (int j = 0; j < patterns.length; j++) {
                        constraint.setCoefficient(xInt[j], patterns[j][i]);
                    }
                }

                // Objective - minimize the number of jumbo rolls used, same as in the master problem
                MPObjective intObjective = intSolver.objective();
                for (int j = 0; j < patterns.length; j++) {
                    intObjective.setCoefficient(xInt[j], 1);
                }

                // Multiple of "n" constraint - the number of jumbo rolls used must be a multiple of "n"
                if (multipleOf > 1) {
                    for (int j = 0; j < patterns.length; j++) {
                        MPConstraint constraint = intSolver.makeConstraint(0.0, 0.0, "multiple" + j);
                        constraint.setCoefficient(xInt[j], 1);
                        constraint.setCoefficient(yInt[j], -multipleOf);
                    }
                }

                intObjective.setMinimization();

                intSolver.solve();

                // Print out the final solution
                int[] patternUsage = new int[patterns.length];
                for (int j = 0; j < patterns.length; ++j) {
                    patternUsage[j] = (int) xInt[j].solutionValue();
                }
                for (int j = 0; j < patterns.length; ++j) {
                    if (patternUsage[j] > 0) {
                        System.out.println("Cut Pattern " + j + "(" + Arrays.toString(patterns[j]) + ") is used " + patternUsage[j] + " times.");
                    }
                }
                int masterRollsUsed = Arrays.stream(patternUsage).sum();
                System.out.println("TOTAL JUMBO ROLLS USED: " + masterRollsUsed);

                // Instantiate a list of patterns for the final solution
                List<Pattern> patternList = new ArrayList<>();
                for (int j = 0; j < patterns.length; j++) {
                    if (patternUsage[j] > 0) {
                        List<Integer> rolls = new ArrayList<>();
                        for (int w = 0; w < numOrderWidths; w++) {
                            for (int i = 0; i < patterns[j][w]; i++) {
                                rolls.add(widths[w]);
                            }
                        }

                        int usedWidth = rolls.stream().mapToInt(Integer::intValue).sum();
                        int waste = maxMasterRollWidth - usedWidth;

                        patternList.add(new Pattern(rolls, patternUsage[j], waste));
                    }
                }

                List<Integer> widthsList = new ArrayList<>();
                for (int width : widths) {
                    widthsList.add(width);
                }
                List<Integer> demandsList = new ArrayList<>();
                for (int i = 0; i < numOrderWidths; i++) {
                    demandsList.add(demands[i]);
                }

                scenario.setPatterns(patternList);
                scenario.setMasterRollsUsed(masterRollsUsed);
                // Return the scenario
                return scenario;
            }

            // Otherwise, add the new pattern to the array of patterns and repeat from step 2
            int[] newPattern = new int[numOrderWidths];
            for (int i = 0; i < numOrderWidths; i++) {
                newPattern[i] = (int) numRolls[i].solutionValue();
            }
            patterns = Arrays.copyOf(patterns, patterns.length + 1);
            patterns[patterns.length - 1] = newPattern;
        }
    }
}
