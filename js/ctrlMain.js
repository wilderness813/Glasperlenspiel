var mainApp = angular.module("mainApp", []);
mainApp.controller("ctrlMain", function ($scope) {

    // quest factory produces quests for user
    $scope.questFactory = new QuestFactory();

    $scope.quest = {};

    $scope.genQuest = function () {
        $scope.quest = $scope.questFactory.create();
        $scope.quest.play($scope);
    };

    // user's answer
    $scope.answer = {

        value: "",

        check: function () {
            var isRight = ($scope.answer.value == $scope.quest.answer);
            if (isRight) {
                $scope.answer.value = "";
                $scope.genQuest();
            }
            return isRight;
        }
    };

    // the question
    $scope.questString = "";

});