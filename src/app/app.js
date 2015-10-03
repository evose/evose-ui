(function (){
    angular
        .module('evo.se.ui',[])
        .controller('appController',['$scope',function($scope){
            $scope.test = "It Works!!!";
        }]);
}());