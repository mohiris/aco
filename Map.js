$(document).ready(function(){

    var height = $("#mHeight");
    var width = $("#mWidth");
    var el = $("#map");

    var mapFood = $('#map-food');

    new Map(10, 10, el, mapFood);

    $(".hValue").innerHtml = height.value;
    $(".wValue").innerHtml = width.value;
    
    $("#mHeight").change(function(){
        $(".hValue").innerHtml = this.value;
    });

    $("#mWidth").change(function(){
        $(".wValue").innerHtml = this.value;
    });

});


class Map{

    constructor(height, width, el, mapFood){
        this.height = height;
        this.width = width;
        this.foodLeft = 100;
        this.cases = [];
        this.el = el;
        this.mapFood = mapFood;

        this.initCases();
        this.anthill = new Anthill(this, this.cases[0][0]);
        this.render();
    }

    /**
     * 
     */
    getCases() {
        return this.cases;
    }

    /**
     * 
     */
    getAnthill() {
        return this.anthill;
    }

    render() {
        this.cases.forEach((line, key) => {
            line.forEach(c => {
                if (c.x === 0) {
                    this.createCase('obstacle')

                    if (c.y === this.height-1) {
                        this.createCase('obstacle');
                        this.createCase('obstacle')
                        this.el.append(document.createElement('br'));
                    }
                }

            }); 

            line.forEach(c => {
                if (c.y === 0) {
                    this.createCase('obstacle')
                }
                this.createCase(c.type.toLowerCase(), `${c.x}${c.y}`)

                if (c.y === this.height -1) {
                    this.createCase('obstacle')
                }
            });
            this.el.append(document.createElement('br'));

            line.forEach(c => {
                if (c.x === this.height -1) {
                    this.createCase('obstacle')
                    
                    if (c.y === this.height -1) {
                        this.createCase('obstacle')
                        this.createCase('obstacle')
    
                    }
                }
            }); 
        });

        this.mapFood.text(this.foodLeft);
    }

    decrementFoodLeft() {
        this.foodLeft -= 1;
        this.mapFood.text(this.foodLeft);
    }

    initCases(){
        for (let i = 0; i < this.width; i++) {
            this.cases[i] = [];

            for (let j = 0; j < this.height; j++) {
                if (i === 0 && j === 0) {
                    this.cases[i][j] = new Case(i, j, CASE_TYPE.spawn);
                }
                else {
                    this.cases[i][j] = this.caseRandom(i,j,[
                        'OBSTACLE',
                        'EMPTY',
                        'EMPTY',
                        'EMPTY',
                        'EMPTY',
                        'EMPTY',
                        'EMPTY',
                        'EMPTY',
                        'EMPTY',
                        'EMPTY'
                    ]);
                }
            }
        }

        const x = Math.floor(Math.random() * this.cases.length);
        const y = Math.floor(Math.random() * this.cases[x].length);
        this.cases[x][y].type = CASE_TYPE.food;
    }

    createCase(type, id) {
        var div = document.createElement('div');
        div.className = `case-${type}`;

        if (id) {
            div.id = `case-${id}`;

            const cell = this.cases[id[0]][id[1]];

            if (cell) {
                cell.setEntity(div);

                if (type !== 'obstacle') {
                    const span = document.createElement('span');
                    span.className = 'plot';
                    span.id = `plot-${id}`
                    cell.setPlot(span);
                    div.appendChild(span)
                }
            }
        }
        this.el.append(div);

        if (id && $(`#plot-${id}`).offset()) $(`#plot-${id}`).offset({top:$(`#plot-${id}`).offset().top +15, left: $(`#plot-${id}`).offset().left + 15 })
    }

    caseRandom(x,y,types){
        return new Case(x,y,types[Math.floor(Math.random() * types.length)])
    }

    /*createWall(){
        for(let i = 0; i < this.cases.length; i++){
            var random = Math.floor(Math.random() * this.cases.length - Math.floor(this.cases.length / 2)); 
        }
    }*/
}