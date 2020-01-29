const STATE_TYPE = {
    empty: 'EMPTY',
    full: 'FULL'
}

class Ant {
    constructor(map, cell) {
        this.map = map;
        this.state = STATE_TYPE.empty;
        this.pheromone = 0;
        this.case = cell
    }

    /**
     * 
     */
    getCase() {
        return this.case;
    }

    /**
     * 
     * @param {*} position 
     */
    setCase(cell) {
        this.case = cell;
    }

    /**
     * 
     */
    getState() {
        return this.state;
    }

    /**
     * 
     * @param {*} state 
     */
    setState(state) {
        this.state = state;
    }

    /**
     * 
     */
    getPheromone() {
        return this.pheromone;
    }

    /**
     * 
     * @param {number} pheromone 
     */
    setPheromone(pheromone) {
        this.pheromone = pheromone;
    }

    /**
     * 
     */
    pickFood() {
        if (this.map.foodLeft > 0 && !this.isFull()) {
            this.state = this.STATE_TYPE.full;
            this.map.decrementFoodLeft();
        }
    }

    /**
     * 
     */
    isFull() {
        return this.state === this.STATE_TYPE.full; 
    }

}