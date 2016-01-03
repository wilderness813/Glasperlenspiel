/**
 * Created by Ruslan on 03.01.2016.
 */

/*
 Arithmetic quest like "2+3", "58*63".
 User must calculate the result.
 */
ArithmeticQuest.prototype = new Quest();
ArithmeticQuest.constructor = ArithmeticQuest;
ArithmeticQuest.type = "arithmetic";
ArithmeticQuest.ops = ["+", "*"];

//constructor
function ArithmeticQuest() {
    this.op = randomElem(ArithmeticQuest.ops);
    this.args = [randomIntUniform(0, Quest.complexity), randomIntUniform(0, Quest.complexity)];
}

// this may not be too beautiful
ArithmeticQuest.prototype.toString = function () {
    return this.args[0] + " " + this.op + " " + this.args[1];
};

// override base play method
ArithmeticQuest.prototype.play = function () {
    alert(this.toString());
};

/*
 Music interval quest. Plays random interval.
 User must determine what interval it is.
 */
IntervalQuest.prototype = new Quest();
IntervalQuest.constructor = IntervalQuest;
IntervalQuest.type = "interval";

IntervalQuest.notesRange = [10, 60];

//constructor
function IntervalQuest() {
    this.notes = [];
    this.maxInterval = Math.floor(Quest.complexity / 3); // maximum interval, which can appear
    this.notes[0] = randomIntUniform(IntervalQuest.notesRange[0], IntervalQuest.notesRange[1] - this.maxInterval);
    this.notes[1] = randomIntUniform(this.notes[0], this.notes[0] + this.maxInterval);
}

// this may not be too beautiful
IntervalQuest.prototype.toString = function () {
    return this.notes[0] + " " + this.notes[1];
};

// override base play method
IntervalQuest.prototype.play = function () {
    // TODO play midi in browser
    alert(this.toString());
};
