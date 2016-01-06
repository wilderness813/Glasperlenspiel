/**
 * Created by Ruslan on 29.12.2015.
 */

/*
 Base class for a quest.
 */
function Quest() {
    this.answer = ""; // correct answer to a task
}

Quest.style = {'opacity': 1.0};
Quest.type = "general";
// Quest.complexity is defined in QuestFactory
//Quest.complexity = 100;

// each quest implementation must have a play function to display it to user
Quest.prototype.play = function ($scope) {
    throwError("play(): not implemented in Quest!");
};

Quest.prototype.findAnswer = function () {
    throwError("findAnswer(): not implemented in Quest!");
};