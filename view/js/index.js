var miApp=angular.module('miApp',[]);
miApp.controller('miControlador', function($scope, $http){
    $scope.comprobarDatos=function() {
        var objecto = new Object();

        objecto.izena = $scope.izena;
        objecto.pasahitza = $scope.pasahitza;

        console.log(objecto)
        $http.post('../../controller/cLogin.php', objecto)
        .then(function(response){
            console.log(response)

            if (response.error == "no error"){
                console.log(response.user);
            } else {
                console.log(response.error);
            }
        })
        .catch(function (reponse){
            console.error("error ocurred", reponse.status, reponse.data);
        })
    }
});
