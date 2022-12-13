var miApp=angular.module('miApp',[]);
miApp.controller('miControlador', function($scope, $http){
    var codSecretoKont = 0;
    $scope.loginInicialMostrar = true;
    
    $scope.comprobarDatos=function() {
        var array_list = new Array();
        var objecto = new Object();

        objecto.izena = $scope.izena;
        objecto.pasahitza = $scope.pasahitza;
        objecto.CodSecreto = $scope.CodSecreto;

        array_list.push(objecto);

        $http.post('../../controller/cLogin.php', array_list)
        .then(function(response){
            console.log(response);
            if (response.error == "no error"){
                console.log("bien")
                codSecretoKont = 0;
            }else {
                console.log(response.error);
                codSecretoKont++;
            }

            if (codSecretoKont == 3){
                $scope.codSecretoMostrar = true;
                $scope.loginInicialMostrar = false;
            }
        })
        .catch(function (response){
            console.error("error ocurred", response.status, response.data);
        })
    }
});
