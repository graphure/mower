
const Mower = require('./mower.js');

QUnit.test("First Mower", function(assert) {
    let mower = new Mower({x:5,y:5},1,2,"N");
    assert.equal(mower.followInstructions("LFLFLFLFF"), "3 1 N", "Correct coordinates"); 
});

QUnit.test("Second Mower", function(assert) {
    let mower = new Mower({x:5,y:5},3 ,3,"E");
    assert.equal(mower.followInstructions("FFRFFRFRRF"), "5 1 E", "Correct coordinates"); 
});