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
// hard-coded parameters
IntervalQuest.octavesCount = 3;
IntervalQuest.maxNamedInterval = IntervalQuest.octavesCount * 12;
IntervalQuest.lowestNote = 50; // TODO: what note is this?
IntervalQuest.duration = 1.0;

IntervalQuest.notesRange = [IntervalQuest.lowestNote, IntervalQuest.lowestNote + 50];

// number of semitones to the form i[+|-], where i is the interval (3 - third, 8 - octave) and +|- is major or minor
// tritone is 4+
MIDI.semitonesToInterval = {};
(function () {
    var isIntMutable = [
        undefined, // 0?
        false,  // unison
        true,  // second
        true,  // third
        true, // forth
        false, // fifth
        true, // sixth
        true, // seventh
        false // octave
    ]; // true if interval can be minor or major
    var ht = 0;
    for (var oct = 0; oct < IntervalQuest.octavesCount; oct++) {
        for (var interval = 1; interval <= 8; interval++) {
            var intervalName = oct * 8 + interval;
            if (isIntMutable[interval]) {
                MIDI.semitonesToInterval[ht] = intervalName + ((interval == 4) ? "" : "-");
                ht++;
                MIDI.semitonesToInterval[ht] = intervalName + "+";
                ht++;
            }
            else {
                MIDI.semitonesToInterval[ht] = intervalName;
                ht++;
            }
        }
    }
})();

// initialize MIDI device
MIDI.loadPlugin({
    instrument: "acoustic_grand_piano",
    onprogress: function (state, progress) {
        console.log(state, progress);
    },
    onsuccess: function () {
        MIDI.setVolume(0, 127);
    }
});

//constructor
function IntervalQuest() {
    this.notes = [];
    this.maxInterval = Math.min(Math.floor(Quest.complexity / 2.5), IntervalQuest.maxNamedInterval); // maximum interval, which can appear
    this.notes[0] = randomIntUniform(IntervalQuest.notesRange[0], IntervalQuest.notesRange[1] - this.maxInterval);
    this.notes[1] = randomIntUniform(this.notes[0], this.notes[0] + this.maxInterval);
    this.answer = MIDI.semitonesToInterval[this.notes[1] - this.notes[0]];
}

// this may not be too beautiful
IntervalQuest.prototype.toString = function () {
    return MIDI.noteToKey[this.notes[0]] + " " + MIDI.noteToKey[this.notes[1]];
};

// override base play method
IntervalQuest.prototype.play = function ($scope) {
    //$scope.questString = this.toString();
    $scope.questString = "<listen>";
    var delay = 0; // play one note every quarter second
    var velocity = 127; // how hard the note hits
    // play the note
    MIDI.noteOn(0, this.notes[0], velocity, delay);
    MIDI.noteOn(0, this.notes[1], velocity, delay);
    MIDI.noteOff(0, this.notes[0], delay + IntervalQuest.duration);
    MIDI.noteOff(0, this.notes[1], delay + IntervalQuest.duration);
};

/*
 Factory that returns new quest of a random type
 */
QuestFactory.types = [ArithmeticQuest, IntervalQuest];
QuestFactory.complexity = 30;

function QuestFactory() {
    this.create = function () {
        Quest.complexity = QuestFactory.complexity;
        var type = randomElem(QuestFactory.types);
        return new type;
    }
}