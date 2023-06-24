package inteli.cc6.model;


import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "machines")
public class Machine {
    private String id;

    private String name;

    private int maxMasterRollWidth;

    private int minMasterRollWidth;

    private int maxRolls;

    /**
     * Returns the ID of the machine.
     *
     * @return the machine ID
     */
    public String getId() {
        return id;
    }

    /**
     * Returns the maxMasterRollWidth of the demand.
     *
     * @return the maxMasterRollWidth
     */
    public int getmaxMasterRollWidth() {
        return maxMasterRollWidth;
    }

    /**
     * Returns the quantity of the demand.
     *
     * @return the quantity
     */
    public int getminMasterRollWidth() {
        return minMasterRollWidth;
    }

    /**
     * Returns the name of the machine.
     *
     * @return the machine name
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the maxRolls of the demand.
     *
     * @return the maxRolls
     */
    public int getmaxRolls() {
        return maxRolls;
    }

    /**
     * Sets the ID of the machine.
     *
     * @param id the machine ID to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Sets the roll width of the demand.
     *
     * @param rollWidth the roll width to set
     */
    public void setmaxMasterRollWidth(int maxMasterRollWidth) {
        this.maxMasterRollWidth = maxMasterRollWidth;
    }

    /**
     * Sets the minMasterRollWidth of the demand.
     *
     * @param minMasterRollWidth the minMasterRollWidth to set
     */
    public void setminMasterRollWidth(int minMasterRollWidth) {
        this.minMasterRollWidth = minMasterRollWidth;
    }

    /**
     * Sets the maxRolls of the demand.
     *
     * @param maxRolls the maxRolls to set
     */
    public void setmaxRolls(int maxRolls) {
        this.maxRolls = maxRolls;
    }

    /**
     * Sets the name of the machine.
     *
     * @param name the machine name to set
     */
    public void setName(String name) {
        this.name = name;
    }
}