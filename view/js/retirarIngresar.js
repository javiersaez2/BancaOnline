var MyApp = angular.module('MyApp', []);
MyApp.controller('miControl', function ($scope, $http) {
    mostrarCuenta();
    function mostrarCuenta(){
        $http.post('/controller/c_mostrar_cuentasPersonales.php')
            .then(function (response) {
                $scope.cuentas = response.data.list;
            })
            .catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            })
    }
    var ibanElegido;
    $scope.elegir = function($index, contenido) {
        ibanElegido = contenido.iban;
        $scope.formVer = 'true';
        $scope.textoVer = 'true';
        $('#ibanClick').html(contenido.iban);
    };
    
    $scope.mover = function () {
    
        var iban= ibanElegido;
        var cantidad =$scope.cantidad;
        var concepto = $scope.concepto;
        var tipo = $scope.tipo;

        if (tipo ==null) {
            alert("tipo vacio")
        }
        else if (cantidad ==null) {
            alert("cantidad vacio")
        }
        else if (concepto ==null) {
            alert("concepto vacio")
        }
        else{
        if (tipo == "ingresar") {
            $http({
                url: '../../controller/c_ingresar.php',
                method: "POST",
                data: JSON.stringify({'iban': iban, 'cantidad': cantidad, 'concepto': concepto, 'tipo': tipo})
            }).then(function (response) {
                alert(response.data.ingresar);
                location.reload();
            }).catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            }) 
        }if (tipo == "retirar") {
            $http({
                url: '../../controller/c_retirar.php',
                method: "POST",
                data: JSON.stringify({'iban': iban, 'cantidad': cantidad, 'concepto': concepto, 'tipo': tipo})
            }).then(function (response) {
                alert(response.data.retirar);
                location.reload();
            }).catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            }) 
        }
    }
    }
    
    //verificar usuario
    $scope.loggedVerify = function () {
        $http({
            url: "../../controller/cLoggedVerify.php",
            method: "POST"
        }).then(function (response) {
            if (response.data.error != "logged") {
                $scope.cuentaUsuario = false;
                $scope.botonAdmin = false;
                $scope.butonLogin = true;
            } else {
                $scope.butonLogOut = true;
                $scope.butonLogin = false;

                if (response.data.tipo == 1) {
                    $scope.botonAdmin = true;
                    $scope.cuentaUsuario = true;
                } else {
                    $scope.cuentaUsuario = true;
                    $scope.botonAdmin = false;
                }
            }
        }).catch(function (response) {
            console.error("Ocurrio un error", response.status, response.data);
        })
    }
    $scope.logout = function () {
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

})




