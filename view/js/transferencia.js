
var MyApp = angular.module('MyApp', []);

MyApp.controller('miController', function ($scope, $http) {
    // - Variables - //
        $scope.saldoT = 0;

        ///Visualizacion
        $scope.TablaPersonales = true;
        $scope.DineroT = false;
        $scope.SeleccionT = false;
        $scope.OtrasT = false;

        //Parametros propios
        $scope.ibanPropio;


    // Cargamos las cuentas de usuario //
    vercuentas();

    // Funcion que guarda las cuentas del usuario //
    function vercuentas() {
        $http.post('/controller/c_mostrar_cuentasPersonales.php')
            .then(function (response) {
                //(response.data.list);
                $scope.cuentas = response.data.list;
            })
            .catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            })
    }


    // Funcion que guarda las cuentas de los demas usuarios //
    vercuentasNoPersonales();
    function vercuentasNoPersonales() {
        $http.post('/controller/c_mostrar_cuentasTransferir.php')
            .then(function (response) {
                $scope.cuentasNoPersonales = response.data.list;

                $('#FiltrarPorDNINoPersonales').append($('<option>', {
                    value: "DNI",
                    text: 'DNI'
                }));
            }).catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            })
    }







    // Muestra las cuentas del usuario para que pueda escoger */
    $scope.EscogerPersonal = function ($index, contenido) {
        $scope.SeleccionT = true;
        $scope.OtrasT = false;

        $scope.ibanPropio = contenido.iban;
        ($scope.ibanPropio);
        $("#FiltrarPorDNINoPersonales").val("DNI");
    }

    // Mostras las cuentas de los demas usuario */
    $scope.MostrarRestos = function () {
        dni = { "dniCliente": $scope.variosdni.dniCliente, "iban": $scope.ibanPropio};

        $http({
            url: '../../controller/c_mostrarOtrasCuentas.php',
            method: "POST",
            data: JSON.stringify(dni)
        }).then(function (response) {
            (response.data.list)
            $scope.OtrasCuentas = response.data.list;
            $scope.OtrasT = true;
        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        })

    }

    // Modals //
    $scope.modalIban = function ($index, contenidoss) {
        iban = contenidoss.iban;
        $scope.saldoT = 0;
        $scope.conceptoT = "";
    }

    $scope.modal = function (numero) {
        modalvisible(numero);
        $scope.modificarVista = 'true';
        $scope.insertarVista = 'false';
    }

    $scope.cerrarCuentas = function (numero) {
        modalnovisible(numero);
    }

    // Funciones para el modal (visibilidad) //
    function modalvisible(x) {
        document.getElementById("demo-modal" + x + "").style.visibility = "visible";
        document.getElementById("demo-modal" + x + "").style.opacity = 1;

    }
    function modalnovisible(x) {
        document.getElementById("demo-modal" + x + "").style.visibility = "hidden";
        document.getElementById("demo-modal" + x + "").style.opacity = 0;

    }

    // Funcion que completa la transferencia
    $scope.transferir = function () {
        if ($scope.conceptoT != null && $scope.saldoT == 0) {
            $scope.fallosVisibles = "Por favor; introduce Saldo";
            return false;

        }

        if ($scope.conceptoT == false) {
            $scope.fallosVisibles = "Por favor; introduce Concepto";
            return false;
        }

        saldo = $scope.saldoT;
        concepto = $scope.conceptoT;

        (iban + "     " + saldo);
        lista = { "ibanEmisor": $scope.ibanPropio, "ibanReceptor": iban, "saldo": saldo, "concepto": concepto };

        $http({
            url: '../../controller/c_trasferencia.php',
            method: "POST",
            data: JSON.stringify(lista)
        }).then(function (response) {
            vercuentas();
            //vercuentasNoPersonales();

            if (response.data.error == "Completado") {
                $scope.SeleccionT = false;
                $scope.OtrasT = false;
                modalnovisible(1);
                window.location.href="cuenta.html";

            } else{
                $scope.fallosVisibles = response.data.error;
            }
        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        })
    }






    $scope.regresar = function () {
        window.location.href="cuenta.html";
    }

    //Solo numeros en la cantidad
    document.getElementById("saldoT").onkeypress = noletras;
    function noletras(e) {
        if (e.key < "0" || e.key > "9") {
            e.preventDefault()
        }
    }
  

    ////////////////// - Funcion para verificar la sesion - //////////////////
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
                window.location.href = "/view/index.html";

            } else {
                $scope.butonLogOut = true;
                $scope.butonLogin = false;
                if (response.data.tipo == 1) {
                    $scope.botonAdmin = true;
                    $scope.cuentaUsuario = true;
                } else {
                    $scope.cuentaUsuario = true;
                    $scope.botonAdmin = false;
                    (response);
                }
            }
        }).catch(function (response) {
            console.error("Ocurrio un error", response.status, response.data);
        })
    }

    ////////////////// - Funcion para cerrar sesion - //////////////////
    $scope.logout = function () {
        $http({
            url: "/controller/cLogout.php",
            method: "POST"
        }).then(function () {
            window.location.href = "/view/index.html";
            $scope.butonLogOut = false;
        }).catch(function () {
            console.error("Ocurrio un error", response.status, response.data);
        })
    }
})