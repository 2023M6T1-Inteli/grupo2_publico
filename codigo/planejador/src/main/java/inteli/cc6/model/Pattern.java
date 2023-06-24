package inteli.cc6.model;

import java.util.List;

public class Pattern {
    private final List<Integer> rolls;
    private final int timesUsed;

    private final int waste;

    /**
     * Constructs a new Pattern object with the specified rolls, times used, and waste.
     *
     * @param rolls     the list of rolls in the pattern
     * @param timesUsed the number of times the pattern has been used
     * @param waste     the amount of waste associated with the pattern
     */
    public Pattern(List<Integer> rolls, int timesUsed, int waste) {
        this.rolls = rolls;
        this.timesUsed = timesUsed;
        this.waste = waste;
    }

    /**
     * Returns the list of rolls in the pattern.
     *
     * @return the list of rolls
     */
    public List<Integer> getRolls() {
        return rolls;
    }

    /**
     * Returns the number of times the pattern has been used.
     *
     * @return the number of times used
     */
    public int getTimesUsed() {
        return timesUsed;
    }

    /**
     * Returns the amount of waste associated with the pattern.
     *
     * @return the amount of waste
     */
    public int getWaste() {
        return waste;
    }

}
