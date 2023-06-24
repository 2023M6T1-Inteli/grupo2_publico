package inteli.cc6.service;

import inteli.cc6.algorithm.CuttingStockAlgorithm;
import inteli.cc6.model.Scenario;
import inteli.cc6.repository.ScenarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScenarioService {
    private final ScenarioRepository scenarioRepository;

    /**
     * Constructs a new ScenarioService object with the specified scenario repository.
     *
     * @param scenarioRepository the scenario repository to be used
     */
    @Autowired
    public ScenarioService(ScenarioRepository scenarioRepository) {
        this.scenarioRepository = scenarioRepository;
    }

    /**
     * Saves the given scenario by applying the cutting stock algorithm and returns the solved scenario.
     *
     * @param scenario the scenario to be saved and solved
     * @return the solved scenario
     */
    public Scenario save(Scenario scenario) {
        CuttingStockAlgorithm cuttingStockAlgorithm = new CuttingStockAlgorithm();

        Scenario solvedScenario = cuttingStockAlgorithm.solve(scenario);

        return scenarioRepository.save(solvedScenario);
    }

    /**
     * Retrieves a list of all scenarios.
     *
     * @return the list of scenarios
     */
    public List<Scenario> findAll() {
        return scenarioRepository.findAll();
    }

    /**
     * Retrieves the scenario with the specified ID.
     *
     * @param id the ID of the scenario to be retrieved
     * @return the retrieved scenario, or null if not found
     */
    public Scenario findById(String id) {
        return scenarioRepository.findById(id).orElse(null);
    }

    /**
     * Deletes the scenario with the specified ID.
     *
     * @param id the ID of the scenario to be deleted
     * @return true if the scenario was successfully deleted, false otherwise
     */
    public boolean delete(String id) {
        scenarioRepository.deleteById(id);
        return true;
    }

    public boolean update(String id, Scenario scenario) {
        Scenario scenarioToUpdate = scenarioRepository.findById(id).orElse(null);

        if (scenarioToUpdate == null) {
            return false;
        }

        scenarioToUpdate.setName(scenario.getName());
        scenarioToUpdate.setDemands(scenario.getDemands());
        scenarioToUpdate.setMasterRollsUsed(scenario.getMasterRollsUsed());
        scenarioToUpdate.setMinMasterRollWidth(scenario.getMinMasterRollWidth());
        scenarioToUpdate.setMaxMasterRollWidth(scenario.getMaxMasterRollWidth());
        scenarioToUpdate.setMaxRolls(scenario.getMaxRolls());
        scenarioToUpdate.setMultipleOf(scenario.getMultipleOf());

        // Compute new solution
        CuttingStockAlgorithm cuttingStockAlgorithm = new CuttingStockAlgorithm();
        Scenario solvedScenario = cuttingStockAlgorithm.solve(scenarioToUpdate);

        scenarioRepository.save(solvedScenario);

        return true;
    }
}
