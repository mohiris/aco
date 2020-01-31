const CASE_TYPE = {
    food: 'FOOD',
    obstacle : 'OBSTACLE',
    empty: 'EMPTY',
    spawn: 'SPAWN'
}

class Case {

    constructor(x,y,caseType = CASE_TYPE.empty){
        this.type = caseType;
        this.x = x;
        this.y = y;
        this.entity = null;
        this.plot = undefined;
        this.pheromones = 0;
    }

    setType(type) {
        this.type = type;
        this.entity.id = `case-${type}`;
        this.entity.className = `case-${type}`;
    }

    getPheromones() {
        return this.pheromones;
    }

    setPheromones(pheromones) {
        this.pheromones = pheromones;
        //let stade = '';

        // if (this.type === CASE_TYPE.food) {
        //     return;
        // }

        // if (this.pheromones >= 1) {
        //     stade = 's';
        // }

        // if (this.pheromones >= 6) {
        //     stade = 'm';
        // }


        // if (this.pheromones >= 8) {
        //     stade = 'l';
        // }

        // this.entity.className = `case-${this.type} pheromones-${stade}`;
    }

    setEntity(entity) {
        this.entity = entity;
    }

    getEntity() {
        return this.entity;
    }

    setPlot(plot) {
        this.plot = plot;
    }

    getPlot() {
        return this.plot;
    }


}