var miApp=angular.module('miApp',[]);
miApp.controller('miControlador', function($scope, $http){
    
    $scope.comprobarDatos=function() {
        var objecto = new Object();

        objecto.izena = $scope.izena;
        objecto.pasahitza = $scope.pasahitza;

        $http.post('../../controller/cLogin.php', objecto)
        .then(function(response){
            if (response.error == "no error"){
                console.log("bien")
            }else {
                console.log(response.error);
            }
        })
        .catch(function (response){
            console.error("error ocurred", response.status, response.data);
        })
    }
});
