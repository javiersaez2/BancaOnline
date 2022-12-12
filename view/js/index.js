var miApp=angular.module('miApp',[]);
miApp.controller('miControlador', function($scope){
    $scope.comprobarDatos=function() {
        console.log($scope.izena);
        console.log($scope.pasahitza);
    }
});
