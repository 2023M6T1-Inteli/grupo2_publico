package inteli.cc6.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "scenarios")
public class Scenario {
    @Id
    private String id;
    
    private List<Pattern> patterns;

    private String name;

    private List<Demand> demands;

    private int masterRollsUsed;

    private int maxMasterRollWidth;

    private int minMasterRollWidth;

    private int maxRolls;

    private int multipleOf;

    /**
     * Returns the ID of the scenario.
     *
     * @return the scenario ID
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the ID of the scenario.
     *
     * @param id the scenario ID to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Returns the list of patterns in the scenario.
     *
     * @return the list of patterns
     */
    public List<Pattern> getPatterns() {
        return patterns;
    }

    /**
     * Sets the list of patterns in the scenario.
     *
     * @param patterns the list of patterns to set
     */
    public void setPatterns(List<Pattern> patterns) {
        this.patterns = patterns;
    }
    public String getName(){
        return name;
    }

    public void setName(String projectName){
        this.name = projectName;
    }

    /**
     * Returns the list of demands in the scenario.
     *
     * @return the list of demands
     */
    public List<Demand> getDemands() {
        return demands;
    }

    /**
     * Sets the list of demands in the scenario.
     *
     * @param demands the list of demands to set
     */
    public void setDemands(List<Demand> demands) {
        this.demands = demands;
    }

    /**
     * Returns the number of master rolls used in the scenario.
     *
     * @return the number of master rolls used
     */
    public int getMasterRollsUsed() {
        return masterRollsUsed;
    }

    /**
     * Sets the number of master rolls used in the scenario.
     *
     * @param masterRollsUsed the number of master rolls used to set
     */
    public void setMasterRollsUsed(int masterRollsUsed) {
        this.masterRollsUsed = masterRollsUsed;
    }

    /**
     * Returns the maximum width of the master roll in the scenario.
     *
     * @return the maximum master roll width
     */
    public int getMaxMasterRollWidth() {
        return maxMasterRollWidth;
    }

    /**
     * Sets the maximum width of the master roll in the scenario.
     *
     * @param maxMasterRollWidth the maximum master roll width to set
     */
    public void setMaxMasterRollWidth(int maxMasterRollWidth) {
        this.maxMasterRollWidth = maxMasterRollWidth;
    }

    /**
     * Returns the minimum width of the master roll in the scenario.
     *
     * @return the minimum master roll width
     */
    public int getMinMasterRollWidth() {
        return minMasterRollWidth;
    }

    /**
     * Sets the minimum width of the master roll in the scenario.
     *
     * @param minMasterRollWidth the minimum master roll width to set
     */
    public void setMinMasterRollWidth(int minMasterRollWidth) {
        this.minMasterRollWidth = minMasterRollWidth;
    }

    /**
     * Returns the maximum number of rolls allowed in the scenario.
     *
     * @return the maximum number of rolls
     */
    public int getMaxRolls() {
        return maxRolls;
    }

    /**
     * Sets the maximum number of rolls allowed in the scenario.
     *
     * @param maxRolls the maximum number of rolls to set
     */
    public void setMaxRolls(int maxRolls) {
        this.maxRolls = maxRolls;
    }

    /**
     * Returns the multiple of the demand quantity in the scenario.
     *
     * @return the multiple of the demand quantity
     */
    public int getMultipleOf() {
        return multipleOf;
    }

    /**
     * Sets the multiple of the demand quantity in the scenario.
     *
     * @param multipleOf the multiple of the demand quantity to set
     */
    public void setMultipleOf(int multipleOf) {
        this.multipleOf = multipleOf;
    }

}
