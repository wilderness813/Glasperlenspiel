var mainApp = angular.module("mainApp", []);
mainApp.controller("ctrlMain", function ($scope) {

    // current quest
    $scope.quest = new Quest();

    // user's answer
    $scope.answer = {

        value: "1",

        check: function () {
            return $scope.answer.value == $scope.quest.answer;
        }
    };

    //$scope.doit = function () {
    //    alert(1);
    //}
    //

    $scope.genTask = function () {
        $scope.quest.genQuest();
    }


});

// how we show error
function throwError(text) {
    alert(text);
};