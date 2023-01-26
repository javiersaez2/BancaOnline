var miApp = angular.module('miApp', []);

////////////////// - Controlador de sesion - //////////////////
miApp.controller('miControlador', function ($scope, $http) {
    $scope.passMostrar = true; $scope.tipoMostrar = false;

    ////////////////// - Funcion para verificar la sesion - //////////////////
    $scope.loggedVerify = function () {
        $http({
            url: "/controller/cLoggedVerify.php",
            method: "POST",
        }).then(function (response) {
            if (response.data.error != "logged") {
                if (window.location.pathname == "/view/html/cuenta.html") {
                   
                    window.location.href = "/view/index.html"
                }
                $scope.cuentaUsuario = false; $scope.botonAdmin = false; $scope.butonLogin = true;
            } else {
                $scope.butonLogOut = true; $scope.butonLogin = false;
                if (response.data.tipo == 1) {
                    $scope.botonAdmin = true; $scope.cuentaUsuario = true;
                } else {
                    $scope.cuentaUsuario = true;  $scope.botonAdmin = false;
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
});


////////////////// - Datos de usuario - //////////////////
miApp.controller('datoscliente', function ($scope, $http) {
    // - Variables (True se muestra la vista, false no se muestra la vista) - //
    $scope.tablaMostrar = false;
    $scope.botonAtras = false;
    $scope.datosClienteCarta = true;
    $scope.passMostrar = true;
    $scope.iniciarSesionSection = true;

    // Funcion ver carta de la cuenta //
    $scope.verCartaCuenta = function() {
        $scope.tablaMostrar = false; $scope.datosClienteCarta = true; $scope.botonAtras = false;
    }


    // Funcion para ver tabla de movimientos con o sin filtro //
    $scope.movimientos = function(iban, filtro){
        if (iban != 'vacio'){
            $scope.iban = iban;    
        }
        console.log($scope.iban);
        console.log(iban + " // " + filtro);
        $http({
            url: "/controller/c_movimientosCuenta.php",
            method: "POST",
            data: JSON.stringify({'iban': $scope.iban, "filtro": filtro})
        }).then( async function (response) {
            var datos = response.data.list;       
            $scope.ListaMovimientos = [];
            $scope.ListaMovimientos = await filtradoMovimientos(datos);
          
            $scope.tablaMostrar = true; $scope.datosClienteCarta = false; $scope.botonAtras = true;
        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        });
    };

    // Funcion para filtras los datos que llegan de la funcion movimientos() //
    async function filtradoMovimientos(datos){
        var movimientos = [];
        var tipoMovimiento = "";
        var claseMovimiento = "";
        var mensaje = "";
        console.log($scope.iban);
        for (var i = 0; i < datos.length; i++){
            if (datos[i].objMovimiento.tipoMovimiento != "Transferencia"){
                if (datos[i].objMovimiento.tipoMovimiento == "Ingresar"){
                    tipoMovimiento = "fa-solid fa-money-bill-trend-up fa-lg"; claseMovimiento = "ingr";
                    datos[i].objMovimiento.tipoMovimiento = "Ingreso";
                } else if (datos[i].objMovimiento.tipoMovimiento == "Retirar"){
                    tipoMovimiento = "fa-solid fa-sack-xmark fa-lg";  claseMovimiento = "reti";   
                    datos[i].objMovimiento.tipoMovimiento = "Retiro";
                } 

                mensaje = datos[i].objMovimiento.tipoMovimiento + " de " + datos[i].cantidad + "€ desde la cuenta: " + datos[i].iban + ".";
                movimientos.push({"iban":datos[i].iban, "fecha":datos[i].fecha, "cantidad":datos[i].cantidad, "tipoMovimientoIcon":tipoMovimiento, "tipoMovimiento":datos[i].objMovimiento.tipoMovimiento, "claseMovimiento":claseMovimiento, "mensaje":mensaje});
            }else {
                tipoMovimiento = "fa-solid fa-hand-holding-dollar fa-lg"; claseMovimiento = "tran";
               
                // array con el emisor y receptor //
                const arrayER = await devolverDestinatario(datos[i].idMovimiento);
                mensaje = datos[i].objMovimiento.tipoMovimiento + " de " + datos[i].cantidad + "€ del emisor " + arrayER[0].iban + " al receptor " + arrayER[1].iban + ".";
                movimientos.push({"iban":datos[i].iban, "fecha":datos[i].fecha, "cantidad":datos[i].cantidad, "tipoMovimientoIcon":tipoMovimiento, "tipoMovimiento":datos[i].objMovimiento.tipoMovimiento, "claseMovimiento":claseMovimiento, "destinatario":arrayER[1].iban, "emisor":arrayER[0].iban, "mensaje":mensaje});
            };
        };
        return movimientos;
    }

    // Devuelve el destinario filtrado por el idMovimiento que se envia desde la funcion filtradoMovimientos() //
    function devolverDestinatario(idMovimiento){
        return $http({
            url: "/controller/c_movimientoTransferencia.php",
            method: "POST",
            data: JSON.stringify({'idMovimiento': idMovimiento})
        }).then(function (response) {
            return response.data.movTransferencia;
        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        });
    };

    // Funcion que desmarca los radio y vuelve a mostrar todos los movimientos sin ningun filtro //
    $scope.uncheckAll = function () {
        if($("input[type='radio']:checked").length > 0 ){
            $("input[type='radio']:checked").prop("checked", false);
            $scope.movimientos($scope.iban, "vacio");
        }
    }


    $scope.ingresarretirar = function(numero){
        localStorage.setItem("ingresarretirarnumero", numero);
    };

    // Funcion que añade los datos del cliente // 
    $scope.datoscliente = function () {
        $http({
            url: "/controller/c_infocuenta.php",
            method: "POST"
        }).then(function (response) {

            $scope.infocuenta = response.data.list
            $scope.infocorriente = response.data.list.objCuenta

            if (response.data.list.tipo==1){
                $scope.tipo="ADMIN"
                $scope.tipoMostrar = true;
            }
            else if( response.data.list.tipo==0){
                 $scope.tipo=""

                };
        });
    };

    // Funcion que muestra la vista de modificar usuario //
    $scope.modificarUsuario = function (numero) {
        modalvisible(numero);
        $scope.modificarVista = 'true';
        $scope.insertarVista = 'false';
    };

    // Funcion para guardar el cambio de contraseña //
    $scope.guardarPassword = function () {
        if ($scope.passanti == null || $scope.passModificar == null || $scope.veriModificar == null) {
            $scope.errores = "Alguno de los campos estan vacios"
        };

        if ($scope.passModificar.length < 6){
            $scope.errores = "Escribe un minimo de 6 caracteres para la nueva clave";
        } else { 
            $http({
                url: '/controller/c_comprobarpassword.php',
                method: "POST",
                data: JSON.stringify({ 'pasahitza': $scope.passanti })
            }).then(function (response) {
                passverificada = response.data
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
                    };
                };
            });
        };
    };


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
})