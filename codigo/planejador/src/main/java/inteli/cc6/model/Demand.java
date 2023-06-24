package inteli.cc6.model;


public class Demand {
    private int rollWidth;
    private int quantity;

    /**
     * Returns the roll width of the demand.
     *
     * @return the roll width
     */
    public int getRollWidth() {
        return rollWidth;
    }

    /**
     * Returns the quantity of the demand.
     *
     * @return the quantity
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * Sets the roll width of the demand.
     *
     * @param rollWidth the roll width to set
     */
    public void setRollWidth(int rollWidth) {
        this.rollWidth = rollWidth;
    }

    /**
     * Sets the quantity of the demand.
     *
     * @param quantity the quantity to set
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}