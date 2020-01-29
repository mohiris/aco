stateType = {
    empty: 'EMPTY',
    full: 'FULL'
}

class Ant {
    constructor(map) {
        this.map = map;
        this.state = stateType.empty;
        this.case = { x: 0, y: 0 };
        this.pheromone = 0;
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
    setCase(position) {
        this.case = position;
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
            this.state = this.stateType.full;
            this.map.foodLeft -=1;
        }
    }

    /**
     * 
     */
    isFull() {
        return this.state === this.stateType.full; 
    }


}