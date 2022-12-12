var miApp=angular.module('miApp',[]);
miApp.controller('miControlador', function($scope){
    $scope.comprobarDatos=function() {
        var array_list = new Array();
        var objecto = new Object();

        objecto.izena = $scope.izena;
        objecto.pasahitza = $scope.pasahitza;

        array_list.push(objecto);

        $http.post('../../controller/cLogin.php', array_list)
        .then(function(reponse){
            
        })
        .catch(function (reponse){
            console.error("error ocurred", reponse.status, reponse.data);
        })
    }
});
