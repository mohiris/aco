class Anthill {
    constructor(map, cell, numbers = 100) {
        this.map = map;
        this.ants = [];
        this.case = cell;

        this.initAnts(numbers);
        this.spawner();
    }

    initAnts(numbers) {
        for (let i = 0; i <= numbers; i++) {
            this.ants.push(new Ant(this.map, this.case))
        }
    }

    createAnt(ant) {
        let span = document.createElement('span');
        span.className = 'ant';
        span.innerHTML='f';

        if (ant.state === 'FULL') {
            span.className += ' full';
        }
        return span;
    }

    spawner() {
        var myVar = setInterval(() => {
            const ant = this.ants.splice(0, 1);
            this.case.getEntity().appendChild(this.createAnt(ant));
            
            if (this.ants.length <= 0) {
                clearInterval(myVar);
            }
        }, 1000);
    }
}