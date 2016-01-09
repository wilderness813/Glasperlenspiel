var mainApp = angular.module("mainApp", []);
mainApp.controller("ctrlMain", function ($scope) {

    // the question
    $scope.questString = "";

    $scope.quest = {};

    $scope.hint = "1";

    // user's answer
    $scope.answer = {

        value: "",
        hintValue: "/",
        skipValue: "*",
        hintGiven: false, // true if hint on current quest is already given

        // check user's answer for correctness or needing help or skipping
        check: function () {
            var isRight = (this.value == $scope.quest.answer);
            switch (true) {
                case (this.value == $scope.quest.answer): // it's correct answer
                    $scope.score.inc();
                    $scope.newQuest();
                    break;
                case (this.value == this.hintValue): // help needed!
                    this.value = "";
                    if (!this.hintGiven) {
                        this.hintGiven = true;
                        $scope.score.penalty();
                        $scope.hint = $scope.quest.hint();
                    }
                    break;
                case (this.value == this.skipValue): // skip quest :(
                    $scope.score.dec();
                    $scope.newQuest();
                    break;
            }
            return isRight;
        },

        clean: function () {
            this.value = "";
            this.hintGiven = false;
        }
    };

    // user's score. increment it for right answer, decrement it for skip or hint etc.
    $scope.score = {
        value: 0,
        // answer's right, increment score
        inc: function () {
            this.value += QuestFactory.complexity;
        },
        // user asked for hint, decrement score
        penalty: function () {
            this.value -= QuestFactory.complexity;
        },
        // user skipped quest, decrement score dramatically :(
        dec: function () {
            this.value -= 2 * QuestFactory.complexity;
        }
    };

    $scope.newQuest = function () {
        $scope.answer.clean();
        $scope.hint = "";
        $scope.quest = QuestFactory.create();
        $scope.quest.play($scope);
    };

    $scope.start = function () {
        $scope.score.value = 0;
        $scope.newQuest();
    }
});