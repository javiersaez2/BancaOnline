var miApp = angular.module('miApp', []);
//Nav

miApp.controller('miControlador', function ($scope, $http) {
    $scope.passMostrar = true;
    $scope.iniciarSesionSection = true;
    $scope.tipoMostrar = false;

    $scope.loggedVerify = function () {
        $http({
            url: "/controller/cLoggedVerify.php",
            method: "POST",
        }).then(function (response) {

            if (response.data.error != "logged") {
                if (window.location.pathname == "/view/html/cuenta.html") {
                   
                    window.location.href = "/index.html"
                }
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
});


//Datos de usuario//
miApp.controller('datoscliente', function ($scope, $http) {
    $scope.tablaMostrar = false;
    $scope.datosClienteCarta = true;
    $scope.botonAtras = false;
    $scope.passMostrar = true;
    $scope.iniciarSesionSection = true;

    // Funcion para ver la carta
    $scope.verCartaCuenta = function(){
        $scope.tablaMostrar = false;
        $scope.datosClienteCarta = true;
        $scope.botonAtras = false;
    }

    // Funcion para ver tabla de movimientos //
    $scope.movimientos = function(iban, callback){
        $http({
            url: "/controller/c_movimientosCuenta.php",
            method: "POST",
            data: JSON.stringify({'iban': iban})
        }).then( async function (response) {
            $scope.ListaMovimientos = [];
            var datos = response.data.list; var mensaje = "";
          
            for (var i = 0; i < datos.length; i++){
                if (datos[i].objMovimiento.tipoMovimiento != "Transferencia"){
                    if (datos[i].objMovimiento.tipoMovimiento == "Ingresar"){
                        tipoMovimiento = "fa-solid fa-money-bill-trend-up fa-lg";
                        claseMovimiento = "ingr";  
                        datos[i].objMovimiento.tipoMovimiento = "Ingreso";
                    } else if (datos[i].objMovimiento.tipoMovimiento == "Retirar"){
                        tipoMovimiento = "fa-solid fa-sack-xmark fa-lg";
                        claseMovimiento = "reti";   
                        datos[i].objMovimiento.tipoMovimiento = "Retiro";
                    } 

                    mensaje = datos[i].objMovimiento.tipoMovimiento + " de " + datos[i].cantidad + "€ desde la cuenta: " + datos[i].iban + ".";
                    $scope.ListaMovimientos.push({"iban":datos[i].iban, "fecha":datos[i].fecha, "cantidad":datos[i].cantidad, "tipoMovimientoIcon":tipoMovimiento, "tipoMovimiento":datos[i].objMovimiento.tipoMovimiento, "claseMovimiento":claseMovimiento, "mensaje":mensaje});
                }else {
                    tipoMovimiento = "fa-solid fa-hand-holding-dollar fa-lg";
                    claseMovimiento = "tran";
                   
                    // array con el emisor y receptor //
                    const arrayER = await devolverDestinatario(datos[i].idMovimiento);
                    mensaje = datos[i].objMovimiento.tipoMovimiento + " de " + datos[i].cantidad + "€ del emisor " + arrayER[0].iban + " al receptor " + arrayER[1].iban + ".";
                    $scope.ListaMovimientos.push({"iban":datos[i].iban, "fecha":datos[i].fecha, "cantidad":datos[i].cantidad, "tipoMovimientoIcon":tipoMovimiento, "tipoMovimiento":datos[i].objMovimiento.tipoMovimiento, "claseMovimiento":claseMovimiento, "destinatario":arrayER[1].iban, "emisor":arrayER[0].iban, "mensaje":mensaje});         
                    $scope.mensaje = "mensaje";
                }

                
               
            }
 
            $scope.tablaMostrar = true;
            $scope.datosClienteCarta = false;
            $scope.botonAtras = true;
        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        })
    }

    function devolverDestinatario(idMovimiento,){
        return $http({
            url: "/controller/c_movimientoTransferencia.php",
            method: "POST",
            data: JSON.stringify({'idMovimiento': idMovimiento})
        }).then(function (response) {
            var movTrans = response.data.movTransferencia;  
            return movTrans;
        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        })
    }

    $scope.ingresarretirar = function(numero){
        localStorage.setItem("ingresarretirarnumero", numero);
    }

    $scope.datoscliente = function () {
        $http({
            url: "/controller/c_infocuenta.php",
            method: "POST"
        }).then(function (response) {

            $scope.infocuenta = response.data.list
            $scope.infocorriente = response.data.list.objCuenta
            console.log($scope.infocorriente)
            console.log($scope.infocuenta);
            if (response.data.list.tipo==1){
                $scope.tipo="ADMIN"
                $scope.tipoMostrar = true;
            }
            else if( response.data.list.tipo==0){
                 $scope.tipo=""

                }
        })
    }

    $scope.modificarUsuario = function (numero) {
        modalvisible(numero);
        
        $scope.modificarVista = 'true';
        $scope.insertarVista = 'false';
    }

    $scope.guardarPassword = function () {

        if ($scope.passanti == null || $scope.passModificar == null || $scope.veriModificar == null) {
            $scope.errores = "Alguno de los campos estan vacios"
        }

        if ($scope.passModificar.length < 6){
            $scope.errores = "Escribe un minimo de 6 caracteres para la nueva clave";
        }


        else {
        
            $http({
                url: '/controller/c_comprobarpassword.php',
                method: "POST",
                data: JSON.stringify({ 'pasahitza': $scope.passanti })
            }).then(function (response) {
                console.log(response);
                passverificada = response.data
                console.log(passverificada)
                if (passverificada == 2) { $scope.errores = "Contaseña incorrecta" }
                else if (passverificada==1) {
                    if ( $scope.passModificar == $scope.veriModificar) {
                        $http({
                            url: '/controller/c_modificarpassword.php',
                            method: "POST",
                            data: JSON.stringify({ 'pasahitza': $scope.passModificar })
                        }).then(function (response) {
                        
                        $scope.errores = "Contaseña modificada"
                        $scope.passanti=""
                        $scope.passModificar=""
                        $scope.veriModificar=""
                        $scope.errores="";
                        modalnovisible(1)
                    })
                    }
                    else{
                        $scope.errores = "Los campos de la nueva contraseña no coinciden  "
                    }
                }

            })
        }
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
        scrollena();
    }
    function modalnovisible(x) {
        document.getElementById("demo-modal" + x + "").style.visibility = "hidden";
        document.getElementById("demo-modal" + x + "").style.opacity = 0;
        scrolldis()
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
/*
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
    */

})