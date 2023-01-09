var MyApp = angular.module('MyApp', []);

MyApp.controller('miControl', function ($scope, $http) {
    $scope.mover = function () {
        alert($scope.cantidad + $scope.concepto + $scope.cuentas)
    }
})