/**
 * Created by Ruslan on 29.12.2015.
 */

/*
    Base class for a quest.
 */
function Quest() {
    this.answer = ""; // correct answer to a task
}

Quest.style ={'opacity': 1.0};
Quest.type = "general";
Quest.complexity = 10;

// each quest implementation must have a play function to display it to user
Quest.prototype.play = function () {
    throwError("play(): not implemented in Quest!");
};

Quest.prototype.findAnswer = function() {
    throwError("findAnswer(): not implemented in Quest!");
};

/*
    Factory that returns new quest of a random type
 */
QuestFactory.types = [ArithmeticQuest, IntervalQuest];

function QuestFactory() {
    //var type = randomElem()
    this.create = function () {
        var type = randomElem(QuestFactory.types);
        return new type;
    }

}