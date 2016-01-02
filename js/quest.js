/**
 * Created by Ruslan on 29.12.2015.
 */

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function randomIntUniform(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

function Quest() {

    this.style = {'opacity': 1.0};
    this.types = {0: "arithmetic", 1: "interval"}; //type of current task: can be "interval", "arithmetic"
    this.type = "";
    this.answer = ""; // correct answer to a task
    this.toString = function () {
        this.arithmetic.firstArg + " " + this.arithmetic.op + " " + this.arithmetic.secondArg;
    }

    // "guess interval" quest
    this.notesRange = [40, 60];
    this.interval = {lowNote: this.notesRange[0], highNote: this.notesRange[1]}; // value of interval that user has to guess

    // "solve arithmetic problem" quest
    this.ops = ["+", "*"];
    this.arithmetic = {firstArg: "1", secondArg: "2", op: this.ops[0]}; // first operand, operation, second operand for arithmetic problem

    // generate new quest with random type
    this.genQuest = function () {
        //this.type = this.types[Math.floor(Math.random() * this.types.length)];
        this.type = this.types[0];

        switch (this.type) {
            case "arithmetic":
                this.genArithmeticQuest();
                this.playArithmeticQuest();
                break;
            case "interval":
                this.genIntervalQuest();
                this.playIntervalQuest();
                break;
            default:
                throwError("Oi! Unknown quest type!");
                break;
        }
    };

    // TO DO I have a dream that one day quest will be an interface (or how it's done in javascript)
    // with implementations for each type

    // generate arithmetic test kinda "1+2"
    this.genArithmeticQuest = function () {
        this.arithmetic.firstArg = randomIntUniform(0, 10);
        this.arithmetic.secondArg = randomIntUniform(0, 10);
        this.arithmetic.op = this.ops[randomIntUniform(0, this.ops.length)];

        switch (this.arithmetic.op) {
            case this.ops[0]: // "+"
                this.answer = this.arithmetic.firstArg + this.arithmetic.secondArg;
                break;
            case this.ops[1]: // "*"
                this.answer = this.arithmetic.firstArg * this.arithmetic.secondArg;
                break;
            default:
                throwError("No operation \"" + this.arithmetic.op + "\" found");
                break;
        }

    };

    this.playArithmeticQuest = function () {
        // TO DO this is method stub
        alert(this.arithmetic.firstArg + " " + this.arithmetic.op + " " + this.arithmetic.secondArg);
    };

    // generate interval quest (playing interval, user should guess what interval is played)
    this.genIntervalQuest = function () {
        this.lowNote = randomIntUniform(this.notesRange[0], this.notesRange[1]);
        this.highNote = randomIntUniform(this.lowNote, this.notesRange[1]);
    };
    this.playIntervalQuest = function () {
        // TO DO this is method stub
    };
};