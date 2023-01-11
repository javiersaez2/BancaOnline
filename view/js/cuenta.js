
var miApp = angular.module('miApp', []);

miApp.controller('miControlador', function($scope, $http){
    $scope.passMostrar = true;
    $scope.iniciarSesionSection = true; 

    $scope.loggedVerify=function() {
        $http({
            url: "/controller/cLoggedVerify.php",
            method: "POST"
        }).then(function (response) {
         
            if (response.data.error != "logged"){
                $scope.cuentaUsuario = false;
                $scope.botonAdmin = false;
                $scope.butonLogin = true;
            } else {             
                $scope.butonLogOut = true;
                $scope.butonLogin = false;
                if (response.data.tipo == 1){
                    $scope.botonAdmin = true;
                    $scope.cuentaUsuario = false;
                } else {
                    $scope.cuentaUsuario = true;
                    $scope.botonAdmin = false;
                    console.log(response);
                }
            }
        }).catch(function (response) {
            console.error("Ocurrio un error", response.status, response.data);
        })	   
    }	

    $scope.logout=function(){
        $http({
            url: "/controller/cLogout.php",
            method: "POST"
        }).then(function () {
            window.location.href = "/index.html";
            $scope.butonLogOut = false;
        }).catch(function () {
            console.error("Ocurrio un error", response.status, response.data);
        })	
    }
});

miApp.controller('datoscliente', function ($scope, $http) {

    $scope.passMostrar = true;
    $scope.iniciarSesionSection = true;

    $scope. datoscliente= function () {

        $http({
            url: "/controller/c_infocuenta.php",
            method: "POST"
        }).then(function (response) {
            $scope.infocuenta=response.data.list
            $scope.infocorriente=response.data.list.objCuenta
            console.log($scope.infocorriente)
        })
    }
})