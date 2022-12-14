var miApp=angular.module('miApp',[]);
miApp.controller('miControlador', function($scope, $http){
    var codSecretoKont = 0;
    $scope.passMostrar = true;
    
    $scope.comprobarDatos=function() {
        var izena = $scope.izenaData; var pasahitza = $scope.pasahitzaData; var codSecreto = $scope.CodSecretoData;

        $http({
            url: '../../controller/cLogin.php',
            method: "POST",
            params: {data: JSON.stringify({izena: izena, pasahitza: pasahitza, codSecreto: codSecreto})}
        }).then(function (response) {
            console.log(response);
            if (response.error == "no error"){
                console.log("bien")
                codSecretoKont = 0;
            }else {
                alert(response.data.error);
                codSecretoKont++;
            } 

            if (codSecretoKont == 3){
                $scope.codSecretoMostrar = true;
                $scope.passMostrar = false;
            }
        }).catch(function () {
            console.error("Ocurrio un error", response.status, response.data)
        })  
    }
});
