
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
        $scope.OtrasT = false;

        $scope.ibanPropio = contenido.iban;
        console.log($scope.ibanPropio);
    }





    /*
    MOSTRAR LAS DEMAS
    */
    $scope.MostrarRestos = function () {
        //$scope.juan -> Lo que se esconde dentro

        dni = { "dniCliente": $scope.juan.dniCliente, "iban": $scope.ibanPropio};

        $http({
            url: '../../controller/c_mostrarOtrasCuentas.php',
            method: "POST",
            data: JSON.stringify(dni)
        }).then(function (response) {
            console.log(response.data.list)
            $scope.OtrasCuentas = response.data.list;
            $scope.OtrasT = true;


        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        })

    }

    $scope.modalIban = function ($index, contenidoss) {
        iban = contenidoss.iban;

        $scope.saldoT = 0;
        $scope.conceptoT = "";
    }











    /*
    MODAL
    */
    $scope.modal = function (numero) {
        modalvisible(numero);
        $scope.modificarVista = 'true';
        $scope.insertarVista = 'false';
    }

    $scope.cerrarCuentas = function (numero) {
        modalnovisible(numero);
    }
    function modalvisible(x) {
        document.getElementById("demo-modal" + x + "").style.visibility = "visible";
        document.getElementById("demo-modal" + x + "").style.opacity = 1;

    }
    function modalnovisible(x) {
        document.getElementById("demo-modal" + x + "").style.visibility = "hidden";
        document.getElementById("demo-modal" + x + "").style.opacity = 0;

    }











    /*
        TRANSFERENCIA
    */
    $scope.transferir = function () {



        if ($scope.conceptoT == null) {
            alert("Por favor; introduce Concepto");
            return false;
        }

        if ($scope.conceptoT != null && $scope.saldoT == 0) {
            alert("Por favor; introduce Saldo");
            return false;

        }

        saldo = $scope.saldoT;
        concepto = $scope.conceptoT;



        console.log(iban + "     " + saldo);
        lista = { "ibanEmisor": $scope.ibanPropio, "ibanReceptor": iban, "saldo": saldo, "concepto": concepto };


        $http({
            url: '../../controller/c_trasferencia.php',
            method: "POST",
            data: JSON.stringify(lista)
        }).then(function (response) {

            alert(response.data.error);

            vercuentas();
            //vercuentasNoPersonales();

            if (response.data.error == "Completado") {
                $scope.SeleccionT = false;
                $scope.OtrasT = false;
                modalnovisible(1);
            }



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
                    $scope.cuentaUsuario = true;
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