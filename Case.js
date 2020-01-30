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