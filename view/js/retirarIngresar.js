var MyApp = angular.module('MyApp', []);
MyApp.controller('miControl', function ($scope, $http) {
    mostrarCuenta();
    $scope.ingresarretirar = localStorage.getItem("ingresarretirarnumero");
    if ($scope.ingresarretirar == 1) {
        $scope.titulo = "RETIRAR"
    }
    else if ($scope.ingresarretirar == 0) {
        $scope.titulo = "INGRESAR"
    }



    function mostrarCuenta() {
        $http.post('/controller/c_mostrar_cuentasPersonales.php')
            .then(function (response) {
                $scope.cuentas = response.data.list;
            })
            .catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            })
    }
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
                    alert(response.data.ingresar);
                    location.reload();
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
                    
                
                }).catch(function (response) {
                    console.error('Error occurred:', response.status, response.data)
                })
            }
        }
    }








    $scope.regresar = function () {
        window.location.href="cuenta.html";
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
        disable_scroll();
        disable_scroll_mobile();
    }
    function modalnovisible(x) {
        document.getElementById("demo-modal" + x + "").style.visibility = "hidden";
        document.getElementById("demo-modal" + x + "").style.opacity = 0;
        enable_scroll();
        enable_scroll_mobile();
    }






    function noscroll() {
        window.scrollTo(0, 0);
    }

    function scrolldis() {
        window.removeEventListener("scroll", noscroll);
    };

    function scrollena() {
        window.addEventListener("scroll", noscroll);
    };

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

})