
var MyApp = angular.module('MyApp', []);

MyApp.controller('miController', function ($scope, $http) {

    //saldo
    $scope.saldoT = 0;

    ///Visualizacion
    $scope.TablaPersonales = true;
    $scope.DineroT = false;
    $scope.SeleccionT = false;
    $scope.OtrasT = false;

    //Parametros propios
    $scope.ibanPropio;


    vercuentas();

    //cuentasPersonales
    function vercuentas() {
        $http.post('/controller/c_mostrar_cuentasPersonales.php')
            .then(function (response) {
                //console.log(response.data.list);
                $scope.cuentas = response.data.list;

            })
            .catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            })
    }


    /*
        MOSTRAR CUENTAS DE OTROS POR DNI
    */
    vercuentasNoPersonales();
    function vercuentasNoPersonales() {
        $http.post('/controller/c_mostrar_cuentasTransferir.php')
            .then(function (response) {
                $scope.cuentasNoPersonales = response.data.list;

            })
            .catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            })
    }



    /*
        ESCOGER TU CUENTA
    */
    $scope.EscogerPersonal = function ($index, contenido) {

        $scope.SeleccionT = true;
        $scope.saldoT = 0;

        $scope.ibanPropio = contenido.iban;
        console.log($scope.ibanPropio);

    }


    /*
    MOSTRAR LAS DEMAS
    */
    $scope.MostrarRestos = function () {
        //$scope.juan -> Lo que se esconde dentro
        dni = { "dniCliente": $scope.juan.dniCliente };

        $http({
            url: '../../controller/c_mostrarOtrasCuentas.php',
            method: "POST",
            data: JSON.stringify(dni)
        }).then(function (response) {
            $scope.OtrasCuentas = response.data.list;
            $scope.OtrasT = true;


        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        })

    }

    $scope.modalIban = function ($index, contenidoss) {
        iban = contenidoss.iban;

    }

    

    /*
    MODAL
    */









    /*
        ASIGNAR EL SALDO
    */
    /*
     $scope.AsignarSaldo = function(){
         $scope.SeleccionT=true;
 
     }
     */





    /*
        TRANSFERENCIA
    */
    $scope.transferir = function ($index, contenidoss) {

        //iban = contenidoss.iban;
        saldo = $scope.saldoT;

        console.log(iban + "     " + saldo);

        lista = { "ibanEmisor": $scope.ibanPropio, "ibanReceptor": iban, "saldo": saldo };



        $http({
            url: '../../controller/c_trasferencia.php',
            method: "POST",
            data: JSON.stringify(lista)
        }).then(function (response) {
            console.log(response.data.error);
            alert("Movimiento realizado");

        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        })

    }





    /////LOGGED VERIFY
    $scope.passMostrar = true;
    $scope.iniciarSesionSection = true;

    $scope.loggedVerify = function () {
        $http({
            url: "/controller/cLoggedVerify.php",
            method: "POST"
        }).then(function (response) {

            if (response.data.error != "logged") {
                $scope.cuentaUsuario = false;
                $scope.botonAdmin = false;
                $scope.butonLogin = true;
                window.location.href = "/index.html";

            } else {
                $scope.butonLogOut = true;
                $scope.butonLogin = false;
                if (response.data.tipo == 1) {
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