var MyApp = angular.module('MyApp', []);

MyApp.controller('miControl', function ($scope, $http) {
    $scope.mover = function () {
        alert("jjj")
        console.log("njnjnn")
        // $scope.cantidad + $scope.concepto + $scope.cuentas 
    }
})