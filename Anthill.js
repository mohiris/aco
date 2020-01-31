class Anthill {
    constructor(map, cell, numbers = 1) {
        this.map = map;
        this.ants = [];
        this.case = cell;
        this.foods = 0;

        this.initAnts(numbers);
        this.spawner();
    }

    /**
     * 
     */
    addFood() {
        this.foods += 1;
        document.getElementById('anthill-food').innerHTML = this.foods;
    }


    /**
     * 
     */
    initAnts(numbers) {
        for (let i = 0; i <= numbers; i++) {
            this.ants.push(new Ant(this.map, this.case, Math.floor(Math.random() * 7) + 3))
        }
    }

    /**
     * 
     */
    createAnt(ant) {
        let span = document.createElement('span');
        span.className = 'ant';

        if (ant.state === 'FULL') {
            span.className += ' full';
        }
        return span;
    }

    /**
     * 
     */
    spawner() {
        var rand = Math.round(Math.random() * 700) + 300;
        let myVar = setInterval(() => {
            const ant = this.ants.splice(0, 1)[0];
            ant.setEntity(this.createAnt(ant));
            this.case.getEntity().appendChild(ant.getEntity());
            ant.collect();

            if (this.ants.length <= 0) {
                clearInterval(myVar);
            }
        }, rand);
    };
}