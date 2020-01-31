const STATE_TYPE = {
    empty: 'EMPTY',
    full: 'FULL'
}

class Ant {
    constructor(map, cell, speed = 5) {
        this.deliver = 0;
        this.map = map;
        this.state = STATE_TYPE.empty;
        this.pheromone = 0;
        this.case = cell;
        this.entity = null;
        this.speed = speed;
        this.memoCase = [];
        this.turn = 0;
    }

    /**
     * 
     */
    isInMemo(id) {
        let result = false;

        this.memoCase.forEach(theCase => {
            if (theCase.entity.id === id) {
                result = true;
            }
        });

        return result;
    }

    /**
     * 
     */
    collect() {
        switch (this.state) {
            case STATE_TYPE.empty:
                setTimeout(() => {
                    this.moveRandPossible();
                    this.collect();
                }, this.speed * 100);
                break;

            case STATE_TYPE.full:
                this.memoCase.reverse().forEach((theCase, key) => {
                    setTimeout(() => {
                        this.moveToThisCase(theCase);
                        theCase.setPheromones(theCase.getPheromones() + 1);

                        if (key ===  this.memoCase.reverse().length - 1) {
                            this.deliverFood();
                        }
                    }, (this.speed * 100) * key);
                });
                break;

            default: return;
        }
    }

    getEntity() {
        return this.entity;
    }

    setEntity(entity) {
        this.entity = entity;
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
            this.entity.style.backgroundColor = 'red';
            this.state = STATE_TYPE.full;
            this.map.decrementFoodLeft();
            this.turn++;
        }
    }

    /**
     * 
     */
    deliverFood() {
        if (this.isFull()) {
            const anthill = this.map.getAnthill();
            this.entity.style.backgroundColor = 'blue';
            this.state = STATE_TYPE.empty;
            anthill.addFood();
            this.collect();
        }
    }

    /**
     * 
     */
    isFull() {
        return this.state === STATE_TYPE.full;
    }

    /** */
    addPossibility(array, x, y) {
        const cases = this.map.getCases();

        if (cases[x]
            && cases[x][y]
            && cases[x][y].type !== CASE_TYPE.obstacle
            // && !this.isInMemo(cases[x][y].entity.id)
        ) {
            array.push(cases[x][y]);
        }
    }

    /**
     * 
     */
    getLine() {
        const cases = this.map.getCases();
        const {x, y} = this.case;
        let possibilities = [];

        if (x-1 >= 0) this.addPossibility(possibilities, x-1, y);
        if (x+1 <= cases.length) this.addPossibility(possibilities, x+1, y);
        if (y-1 >= 0) this.addPossibility(possibilities,x, y-1);
        if (cases[x] && y+1 <= cases[x].length) this.addPossibility(possibilities, x, y+1)

        return possibilities;
    }

    /**
     * 
     */
    getDiagonale() {
        const cases = this.map.getCases();
        const {x, y} = this.case;
        let possibilities = []

        if (x-1 >= 0) {
            if (y-1 >=0) this.addPossibility(possibilities, x-1, y-1);
            if (cases[x-1] && y+1 <= cases[x-1].length) this.addPossibility(possibilities, x-1, y+1);
        }

        if (x+1 <= cases.length) {
            if (y-1 >=0) this.addPossibility(possibilities, x+1, y-1);
            if (cases[x+1] && y+1 <= cases[x+1].length) this.addPossibility(possibilities, x+1, y+1);
        }

        return possibilities;
    }

    /**
     * 
     */
    getMovePossibility() {
        const possibilities = [
            ...this.getLine(),
            ...this.getDiagonale()
        ];
        
        if (possibilities.length >= 0) {
            return possibilities.filter(c =>
                c.type === CASE_TYPE.empty || c.type === CASE_TYPE.food
            );
        }

        return [];
    }

    /**
     * 
     */
    moveToThisCase(theCase) {
        this.case = theCase;

        if (this.state === STATE_TYPE.empty) {
            this.memoCase.push(theCase);
        }

        if (theCase.type === CASE_TYPE.food) {
            this.pickFood();
        }

        return $(this.entity).animate(
            {
                top: theCase.getPlot().offsetTop,
                left: theCase.getPlot().offsetLeft
            }, this.speed * 100
        )
    }

    /**
     * 
     */
    moveRandPossible() {
        const possibilities = this.getMovePossibility();

        //console.log("wesh", possibilities)
        if (possibilities.length >= 0) {
            return this.moveToThisCase(
                possibilities[Math.floor(Math.random() * possibilities.length)]
            );
        }
    }

}