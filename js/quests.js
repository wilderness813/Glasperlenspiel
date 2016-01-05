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
    var range = Quest.complexity;
    if ((this.op == "+") || (this.op == "-")) {
        range *= range;
    }

    this.args = [randomIntUniform(0, range), randomIntUniform(0, range)];
    // calculate answer
    switch (this.op) {
        case "+":
            this.answer = this.args[0] + this.args[1];
            break;
        case "*":
            this.answer = this.args[0] * this.args[1];
            break;
        case "-":
            this.answer = this.args[0] - this.args[1];
            break;
        case "%":
            this.answer = this.args[0] % this.args[1];
            break;
        default:
            throwError("ArithmeticQuest:'" + this.op + "': unknown operation");
    }
}

// this may not be too beautiful
ArithmeticQuest.prototype.toString = function () {
    return this.args[0] + " " + this.op + " " + this.args[1] + " = ?";
};

// override base play method
ArithmeticQuest.prototype.play = function ($scope) {
    $scope.questString = this.toString();
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
    this.answer = "";
}

// this may not be too beautiful
IntervalQuest.prototype.toString = function () {
    return this.notes[0] + " " + this.notes[1];
};

// override base play method
IntervalQuest.prototype.play = function ($scope) {
    // TODO play midi in browser
    $scope.questString = this.toString();
};

/*
 Factory that returns new quest of a random type
 */
QuestFactory.types = [ArithmeticQuest, IntervalQuest];
QuestFactory.complexity = 10;

function QuestFactory() {
    this.create = function () {
        Quest.complexity = QuestFactory.complexity;
        var type = randomElem(QuestFactory.types);
        return new type;
    }
}