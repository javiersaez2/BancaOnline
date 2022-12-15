var miApp=angular.module('miApp',[]);
miApp.controller('miControlador', function($scope, $http){
    var codSecretoKont = 0;
    $scope.passMostrar = true;
    $scope.iniciarSesionSection = true; 

    $scope.comprobarDatosSesion=function() {
        if ($scope.CodSecretoData == undefined || $scope.CodSecretoData == ""){
            $scope.CodSecretoData = " ";
        }

        if ($scope.pasahitzaData == undefined || $scope.pasahitzaData == ""){
            $scope.pasahitzaData = "  ";    
        } else if (codSecretoKont >= 3){
            $scope.pasahitzaData = "";    
        }

        var dni = $scope.dniData; var pasahitza = $scope.pasahitzaData; var codSecreto = $scope.CodSecretoData;

        $http({
            url: '/controller/cLogin.php',
            method: "POST",
            params: {data: JSON.stringify({dni: dni, pasahitza: pasahitza, codSecreto: codSecreto, contador:codSecretoKont})}
        }).then(function (response) {
            console.log(response);
            if (response.data.error == "no error"){
                console.log("bien")
                codSecretoKont = 0;
                $scope.butonLogin = false;
                window.location.href = "/index.html";     
            }else {
                alert(response.data.error);
                codSecretoKont++;
                $scope.CodSecretoData = "";
                $scope.pasahitzaData = "";
            } 

            if (codSecretoKont == 3){
                $scope.codSecretoMostrar = true;
                $scope.passMostrar = false;
            }
        }).catch(function (response) {
            console.error("Ocurrio un error", response.status, response.data);
        })  
    }


    $scope.loggedVerify=function() {
        $http({
            url: "/controller/cLoggedVerify.php",
            method: "POST"
        }).then(function (response) {
            if (response.data.error != "logged"){                
                $scope.iniciarSesionSection = true;
                $scope.cuentaUsuario = false;
                $scope.botonAdmin = false;
                $scope.butonLogin = true;
            } else {
                $scope.iniciarSesionSection = false; 
                $scope.butonLogOut = true;
                $scope.butonLogin = false;
                window.location.href="/index.html"
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
