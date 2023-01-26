var MyApp = angular.module('MyApp', []);
MyApp.controller('miControl', function ($scope, $http) {
    mostrarCuenta();

    ////////////////// - Funcion para verificar la sesion - //////////////////
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
    };

    ////////////////// - Funcion para cerrar sesion - //////////////////
    $scope.logout = function () {
        $http({
            url: "/controller/cLogout.php",
            method: "POST"
        }).then(function () {
            window.location.href = "/view/html/index.html";
            $scope.butonLogOut = false;
        }).catch(function () {
            console.error("Ocurrio un error", response.status, response.data);
        })
    };

    $scope.ingresarretirar = localStorage.getItem("ingresarretirarnumero");
    if ($scope.ingresarretirar == 1) {
        $scope.titulo = "RETIRAR"
    }
    else if ($scope.ingresarretirar == 0) {
        $scope.titulo = "INGRESAR"
    }

    // Muestra las cuentas del usuario //
    function mostrarCuenta() {
        $http.post('/controller/c_mostrar_cuentasPersonales.php')
            .then(function (response) {
                $scope.cuentas = response.data.list;
            })
            .catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            })
    }

    // Elecion de Iban //
    var ibanElegido;
    $scope.elegir = function ($index, contenido) {
        ibanElegido = contenido.iban;
        $scope.formVer = 'true';
        $scope.textoVer = 'true';
        $('#ibanClick').html(contenido.iban);
    };

    $scope.mover = function () {
        var iban = ibanElegido;
        var cantidad = $scope.cantidad;
        var concepto = $scope.concepto;


        if (cantidad == null) {
            $scope.errores = "Elige una cantidad";
        }
        else if (concepto == null) {
            $scope.errores = "Elige un concepto";
        }
        else {
            if ($scope.ingresarretirar == "0") {
                $http({
                    url: '../../controller/c_ingresar.php',
                    method: "POST",
                    data: JSON.stringify({ 'iban': iban, 'cantidad': cantidad, 'concepto': concepto, 'tipo': "Ingresar" })
                }).then(function (response) {
                    location.reload();
                    window.location.href="cuenta.html";

                }).catch(function (response) {
                    console.error('Error occurred:', response.status, response.data)
                })
           
            } if ($scope.ingresarretirar == "1") {
                $http({
                    url: '../../controller/c_retirar.php',
                    method: "POST",
                    data: JSON.stringify({ 'iban': iban, 'cantidad': cantidad, 'concepto': concepto, 'tipo': "Retirar" })
                }).then(function (response) {
                    if(response.data.retirar == 0){
                        $scope.errores = "La cantidad es mayor que el saldo";
                        return false;
                    }                       
                    location.reload();
                    window.location.href="cuenta.html";
              
                }).catch(function (response) {
                    console.error('Error occurred:', response.status, response.data)
                })
            }
        }
    }

    // Solo numeros en la cantidad //
    $("#cantidad").keypress(function(e){
        if (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) {
            e.preventDefault();
        }
    });

    // Funcion que muestra la vista de retirar/ingresar //
    $scope.modal = function (numero) {
        modalvisible(numero);
        $scope.modificarVista = 'true';
        $scope.insertarVista = 'false';
    }

    // Boton que cierra el modal //
    $scope.cerrarCuentas = function (numero) {
        $scope.dniIns = "";
        $scope.nombreIns = "";
        $scope.contrsenaIns = "";
        $scope.tipoIns = "";
        $scope.vefIns = "";
        modalnovisible(numero);
    }

    // Funciones para el modal (no scroll y visibilidad) //
    function modalvisible(x) {
        document.getElementById("demo-modal" + x + "").style.visibility = "visible";
        document.getElementById("demo-modal" + x + "").style.opacity = 1;
        disable_scroll();
        disable_scroll_mobile();
    }
    function modalnovisible(x) {
        document.getElementById("demo-modal" + x + "").style.visibility = "hidden";
        document.getElementById("demo-modal" + x + "").style.opacity = 0;
        enable_scroll();
        enable_scroll_mobile();
    }



    // Prevenir scroll keys
    function keydown(e) {
        var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }

    // Prevenir rueda del raton
    function wheel(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    // Desactivar scroll
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
        disable_scroll_mobile();
    }

    // Habilitar scroll
    function enable_scroll() {
        if (document.removeEventListener) {
            document.removeEventListener('wheel', wheel, false);
            document.removeEventListener('mousewheel', wheel, false);
            document.removeEventListener('DOMMouseScroll', wheel, false);
        }
        document.onmousewheel = document.onmousewheel = document.onkeydown = null;
        window.onscroll = function () { };
        enable_scroll_mobile();
    }

    // Mobil
    function disable_scroll_mobile() {
        document.addEventListener('touchmove', preventDefault, false);
    }
    function enable_scroll_mobile() {
        document.removeEventListener('touchmove', preventDefault, false);
    }

})