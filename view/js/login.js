var miApp=angular.module('miApp',[]);
miApp.controller('miControlador', function($scope, $http){

    ////////////
    /* JQuery */
    ////////////

    /* Validar cantidad de caracteres en dni*/    
    $("#dniInput").keypress(function(event){
        if ($(this).val().length >= 8){
            event.preventDefault();
        };
    });

    /* Valida la cantidad de caracteres del codigo secreto y que todos sean numero */ 
    $("#codSecretoInput").keypress(function(event){
        if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57)) {
            event.preventDefault();
        } else {
            if ($(this).val().length >= 4){
                event.preventDefault();
            };
        }
    });

    /////////////
    /* Angular */
    /////////////

    /* Variables */
    var codSecretoKont = 0;
    $scope.passMostrar = true;
    $scope.iniciarSesionSection = true; 
    $scope.showError = false;

    /* Funciones */
    $scope.comprobarDatosSesion=function() {
        var pasahitza = "";
        var dni = "";
        var codSecreto = "";

        if ($scope.dniData == undefined || $scope.dniData == ""){
            dni = " ";
        } else {
            dni = $scope.dniData;
        }
        
        if ($scope.CodSecretoData == undefined || $scope.CodSecretoData == ""){
            codSecreto = " ";
        } else {
            codSecreto = $scope.CodSecretoData;   
        }

        if ($scope.pasahitzaData == undefined || $scope.pasahitzaData == ""){
            pasahitza = " ";    
        } else {
            pasahitza = $scope.pasahitzaData;   
        }

        $http({
            url: '../../controller/cLogin.php',
            method: "POST",
            data: JSON.stringify({'dni': dni, 'pasahitza': pasahitza, 'codSecreto': codSecreto, 'contador':codSecretoKont})
        }).then(function (response) {
            console.log(response);
            if (response.data.error == "no error"){
                codSecretoKont = 0;
                $scope.butonLogin = false;
                $scope.showError = false;
                window.location.href = "/index.html";     
            }else {
                $scope.showError = true;
                $("#textError").text(response.data.error);
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
