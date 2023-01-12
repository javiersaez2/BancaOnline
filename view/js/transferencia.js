
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
    $scope.modal = function (numero) {
        modalvisible(numero);
        $scope.modificarVista = 'true';
        $scope.insertarVista = 'false';
    }

    $scope.cerrarCuentas = function (numero) {
        $scope.dniIns = "";
        $scope.nombreIns = "";
        $scope.contrsenaIns = "";
        $scope.tipoIns = "";
        $scope.vefIns = "";
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


    //////////// - Modaeles no scroll - ////////////
    // PREVENT DEFAULT HANDLER
    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;
    }
    // PREVENT SCROLL KEYS
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    // left: 37, up: 38, right: 39, down: 40,
    // (Source: http://stackoverflow.com/a/4770179)
    function keydown(e) {
        var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }
    // PREVENT MOUSE WHEEL
    function wheel(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    // DISABLE SCROLL
    function disable_scroll() {
        if (document.addEventListener) {
            document.addEventListener('wheel', wheel, false);
            document.addEventListener('mousewheel', wheel, false);
            document.addEventListener('DOMMouseScroll', wheel, false);
        }
        else {
            document.attachEvent('onmousewheel', wheel);
        }
        document.onmousewheel = document.onmousewheel = wheel;
        document.onkeydown = keydown;

        x = window.pageXOffset || document.documentElement.scrollLeft,
            y = window.pageYOffset || document.documentElement.scrollTop,
            window.onscroll = function () {
                window.scrollTo(x, y);
            };
        // document.body.style.overflow = 'hidden'; // CSS
        disable_scroll_mobile();
    }
    // ENABLE SCROLL
    function enable_scroll() {
        if (document.removeEventListener) {
            document.removeEventListener('wheel', wheel, false);
            document.removeEventListener('mousewheel', wheel, false);
            document.removeEventListener('DOMMouseScroll', wheel, false);
        }
        document.onmousewheel = document.onmousewheel = document.onkeydown = null;
        window.onscroll = function () { };
        // document.body.style.overflow = 'auto'; // CSS
        enable_scroll_mobile();
    }

    // MOBILE
    function disable_scroll_mobile() {
        document.addEventListener('touchmove', preventDefault, false);
    }
    function enable_scroll_mobile() {
        document.removeEventListener('touchmove', preventDefault, false);
    }











    /*
        TRANSFERENCIA
    */
    $scope.transferir = function () {

        saldo = $scope.saldoT;
        concepto = $scope.conceptoT;

        /*
        if (concepto == ""){
            alert("Introduce concepto")
            return false;
        }
        */
        console.log(iban + "     " + saldo);

        lista = { "ibanEmisor": $scope.ibanPropio, "ibanReceptor": iban, "saldo": saldo, "concepto": concepto};


        $http({
            url: '../../controller/c_trasferencia.php',
            method: "POST",
            data: JSON.stringify(lista)
        }).then(function (response) {

            if (response.data.error == "Completado"){
                $scope.SeleccionT = false;
                $scope.OtrasT = false;
                modalnovisible(1);
            }

            vercuentas();
            vercuentasNoPersonales();

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