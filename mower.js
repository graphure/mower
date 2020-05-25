 class Mower {
    constructor(surface, x, y, currentDirection) {
        this.surface = surface;
        this.x = x;
        this.y = y;
        this.currentDirection = currentDirection;
        this.directions = ["N", "W", "S", "E"];
        this.directionIndex = this.directions.indexOf(this.currentDirection);
    }

    manageDirection() {
        if (this.directionIndex > 3) {
            this.directionIndex = 0;
        } else if (this.directionIndex < 0) {
            this.directionIndex = 3;
        }
        this.currentDirection = this.directions[this.directionIndex];
    }

    goLeft() {
        this.directionIndex--;
        this.manageDirection();
    }

    goRight() {
        this.directionIndex++;
        this.manageDirection();
    }

    goForward() {
        switch (this.currentDirection) {
        	//NORD
            case "N":
                if (this.y < this.surface.y) {
                    this.y++;
                }
                break;
            //SUD
            case "S":
                if (this.y > 0) {
                    this.y--;
                }
                break;
             //OUEST
            case "W":
                if (this.x < this.surface.x) {
                    this.x++;
                }
                break;
            //EST
            case "E":
                if (this.x > 0) {
                    this.x--;
                }
                break;
        }
    }

    followInstructions(instructions) {
        for (var i = 0; i < instructions.length; i++) {
            switch (instructions[i]) {
                case "L":
                    this.goLeft();
                    break;
                case "R":
                    this.goRight();
                    break;
                case "F":
                    this.goForward();
                    break;
            }
        }
        return `${this.y} ${this.x} ${this.currentDirection}`;
    }

}


QUnit.test("First Mower", function(assert) {
    let mower = new Mower({x:5,y:5},1,2,"N");
    assert.equal(mower.followInstructions("LFLFLFLFF"), "3 1 N", "Correct coordinates"); 
});

QUnit.test("Second Mower", function(assert) {
    let mower = new Mower({x:5,y:5},3 ,3,"E");
    assert.equal(mower.followInstructions("FFRFFRFRRF"), "5 1 E", "Correct coordinates"); 
});

module.exports = Mower;