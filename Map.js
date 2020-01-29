$(document).ready(function(){

    var height = $("#mHeight");
    var width = $("#mWidth");
    var el = $("#map");

    new Map(10, 10, el);

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

    constructor(height, width, el){
        this.height = height;
        this.width = width;
        this.foodLeft = 100;
        this.cases = [];
        this.el = el;

        this.initCases();
        this.render();
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
                this.createCase(c.type.toLowerCase())

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

        const random = Math.floor(Math.random() * this.cases.length);
        this.cases[random][Math.floor(Math.random() * this.cases[random].length)].type = CASE_TYPE.food;
    }

    createCase(type) {
        var div = document.createElement('div');
        div.className = `case-${type}`
        this.el.append(div);
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
    }

}