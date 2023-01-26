var MyApp = angular.module('MyApp', []);

MyApp.controller('miController', function ($scope, $http) {
    $scope.butonLogOut = true;
    $scope.cuenta = []
    /////cargar los datos de la tabla usuario de la base de datos 
    verusuarios();
    //Posicion de la alerta
    alertify.set('notifier', 'position', 'top-left');
    ///////////////////////////////
    // Mostrar lista de usuarios //
    ///////////////////////////////
    function verusuarios() {
        $http.post('/controller/controlador_consulta_usuarios.php')
            .then(function (response) {
                (response.data.list);
                $scope.usuarios = response.data.list;
            })
            .catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            })
    }


    /////////////////////
    // Borrar usuarios //
    /////////////////////
    $scope.borrarUsuario = function (miIndex, item) {
        var datosjson = { 'dniCliente': item.dniCliente };
        $http({
            url: '../../controller/delete_usuario.php',
            method: "POST",
            data: JSON.stringify(datosjson)
        }).then(function (response) {
            if (response.data.error == "Cuenta corriente borrada con exito") {

                alertify.success(response.data.error)
            }
            else {

                alertify.error(response.data.error)
            }
            verusuarios();
        }, function (error) {
            console.error("Ocurrio un error", response.status, response.data)
        })   //
    }

    ////////////////////
    //INSERTAR CLIENTE//
    ////////////////////
    $scope.insertarVista = 'false';
    $scope.listaInsertar = [];

    $scope.nuevoUsuario = function () {
        modalvisible(1);
    }

    $scope.nuevoCliente = function () {



        if ($scope.dniIns == null || $scope.nombreIns == null || $scope.contrsenaIns == null || $scope.vefIns == null || $scope.tipoIns == null) {
            alertify.error("Algun campo vacio!");
        }
        else {
            //Funcion que comprueba el dni
            function nif(dni) {
                var numero
                var letr
                var letra
                var expresion_regular_dni

                expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

                if (expresion_regular_dni.test(dni) == true) {
                    numero = dni.substr(0, dni.length - 1);
                    letr = dni.substr(dni.length - 1, 1);
                    numero = numero % 23;
                    letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
                    letra = letra.substring(numero, numero + 1);
                    if (letra != letr.toUpperCase()) {

                        alertify.error('Dni erroneo, la letra del NIF no se corresponde');
                    } else {

                    
    

        if ($scope.contrsenaIns.length < 6) {

            alertify.error("Escribe un minimo de 6 caracteres para la nueva clave");
        }
        else if ($scope.contrsenaIns != $scope.vefIns) {

            alertify.error("Las contraseñas no son iguales");
            $scope.contrsenaIns = "";
            $scope.vefIns = "";
        }

        else {
            $scope.listaInsertar = {
                'dni': $scope.dniIns,
                'nombre': $scope.nombreIns,
                'contrasena': $scope.contrsenaIns,
                'tipo': $scope.tipoIns
            };
            var datosInsert = JSON.stringify($scope.listaInsertar);

            ////////FETCH DE INSERTAR/////
            $http({
                url: '../../controller/c_insertarClientes.php',
                method: 'POST',
                data: datosInsert
            })

                .then(function (response) {
                    if (response.data.error=="dni duplicado"){
                       
                        alertify.error("El DNI esta duplicado, pruebe con otro DNI distinto");
                    (response.data.error)
                    }
                    if (response.data.error == "Usuario añadido con exito") {
                        alertify.success(response.data.error);
                        $scope.insertarVista = 'false';
                        verusuarios();


                        $scope.dniIns = "";
                        $scope.nombreIns = "";
                        $scope.contrsenaIns = "";
                        $scope.tipoIns = "";
                        $scope.vefIns = "";
                        modalnovisible(1);
                    }
                  
                    
                
                })
                .catch(function (response) {
                    ('Error ocurred: ', response.status);
                    ('Error ocurred: ', response.data);

                })
        }
    }
} else {

    alertify.error('Dni erroneo, formato no válido');
}
}
nif($scope.dniIns);

    }
    
}

    /////////////////////////////////////////////////
    ////////// - Mostrar cuenta corriente - /////////
    /////////////////////////////////////////////////
    $scope.MostrarCuentas = function (miIndex, item) {
        $scope.cuenta = [];
        (miIndex)
        ("--")
        (item.objCuenta.iban)
        for (i = 0; i < item.objCuenta.length; i++) {
            $scope.cuenta.push({ iban: item.objCuenta[i].iban, dniCliente: item.objCuenta[i].dniCliente, titular: item.objCuenta[i].titular, saldo: item.objCuenta[i].saldo, cuentaPos: i + 1 });
            ($scope.cuenta)
        }
        modalvisible(0);
    }

    $scope.cerrarCuentas = function (numero) {
        $scope.dniIns = "";
        $scope.nombreIns = "";
        $scope.contrsenaIns = "";
        $scope.tipoIns = "";
        $scope.vefIns = "";
        modalnovisible(numero);
    }

    ////////////////////////////////////////////////////////
    ////////// - Crear y borrar cuenta corriente - /////////
    ///////////////////////////////////////////////////////
    $scope.guardarCuenta = function (datos) {
        var dni = datos.dniCliente;
        var nombreCliente = datos.nombre;

        $http({
            url: '../../controller/c_insertarCuenta.php',
            method: "POST",
            data: JSON.stringify({ 'dniCliente': dni, 'nombre': nombreCliente })
        }).then(function (response) {
            if (response.data.error.includes("La cuenta se ha insertado con exito")) {

                alertify.success(response.data.error)
            }
            else {

                alertify.error(response.data.error)
            }
            verusuarios();
        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        })

    }

    $scope.borrarCuenta = function (datos) {
        var iban = datos.iban;

        $http({
            url: '../../controller/delete_cuenta.php',
            method: "POST",
            data: JSON.stringify({ 'iban': iban })
        }).then(function (response) {

            if (response.data.error == "No puedes borrar tu usuario") {

                alertify.error(response.data.error)
            }
            else {

                alertify.success(response.data.error)
            }
            $scope.cerrarCuentas(0);
            verusuarios();
        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        })
    }

    ////////////////////////
    ////////Update//////////
    ////////////////////////
    $scope.modificarUsuario = function (miIndex, item) {
        modalvisible(2);
        document.getElementById("dniModificar").disabled = true;
        $scope.comprobarnombre=item.nombre;
        $scope.comprobarpassword=item.pasahitza;
        $scope.modificarVista = 'true';
        $scope.insertarVista = 'false';
        $scope.dniModificar = item.dniCliente;
        $scope.nombreModificar = item.nombre;
        $scope.contrasenaModificar = item.pasahitza;
        $scope.vefModificar = item.pasahitza;
    }

    $scope.guardarCliente = function () {
        dniCliente = $scope.dniModificar;
        nombre = $scope.nombreModificar;
        pasahitza = $scope.contrasenaModificar;
        $scope.modificado=false;
        if ( $scope.comprobarnombre!=$scope.nombreModificar || $scope.comprobarpassword!=$scope.vefModificar || $scope.comprobarpassword!=$scope.contrasenaModificar){
            $scope.modificado=true;
        }
        if ($scope.modificado==false){
            alertify.error("No se ha modificado nada")
        }
        else{
            if ($scope.nombreModificar  == null || $scope.vefModificar == null || $scope.contrasenaModificar == null) {
                alertify.error("Algun campo vacio!");
            }else{
        if ($scope.contrasenaModificar == $scope.vefModificar) {
            $http({
                url: "../../controller/controller_update.php",
                method: "POST",
                data: JSON.stringify({ 'dniCliente': $scope.dniModificar, 'nombre': $scope.nombreModificar, 'pasahitza': $scope.contrasenaModificar })
            }).then(function (response) {
                if (response.data.error == "El usuario se ha modificado con exito.") {

                    alertify.success(response.data.error)
                }
                else {

                    alertify.error(response.data.error)
                }
                $scope.modificarVista = 'false';
                verusuarios();

                modalnovisible(2);
            }).catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            })
        } else {
            alertify.error("Las contraseñas no son iguales");
        }
    }
}
}

    //////////////////////////
    //////////////////////////
    // Buscador de usuarios //
    //////////////////////////
    //////////////////////////

    $("#buscadorDni").keypress(function (event) {
        if (event.keyCode == 13) {
            if ($(this).val().length > 0) {
                $http({
                    url: "/controller/c_buscadorDniAdmin.php",
                    method: "POST",
                    data: JSON.stringify({ 'dniCliente': $(this).val() })
                }).then(function (response) {
                    (response.data);
                    $scope.usuarios = response.data.list;
                }).catch(function (response) {
                    console.error("Ocurrio un error", response.status, response.data);
                })
                event.preventDefault();
            } else {
                verusuarios();
            }

        }
    });

    ///////////////////////////////
    ///////////////////////////////
    // Comprobar y cerrar sesion //
    ///////////////////////////////
    ///////////////////////////////

    $scope.loggedVerify = function () {
        $http({
            url: "/controller/cLoggedVerify.php",
            method: "POST"
        }).then(function (response) {
            if (response.data.error != "logged") {
                if (window.location.pathname == "/view/html/paginaAdmin.html") {
                     alertify.error("Error: Usuario sin permisos");
                    window.location.href = "/view/index.html"
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
                    $scope.users = true;
                } else {
                    alertify.error("User: " + response.data.izena + " | Sin acceso, tipo: " + response.data.tipo);
                    $scope.cuentaUsuario = true;
                    $scope.botonAdmin = false;
                    $scope.users = false;

                    if (window.location.pathname != "/view/index.html") {
                        window.location.href = "/view/index.html";
                    }
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
            window.location.href = "/view/index.html";
            $scope.butonLogOut = false;
        }).catch(function () {
            console.error("Ocurrio un error", response.status, response.data);
        })
    }
})


////////////////////////////////////
// Funciones scroll para el modal //
////////////////////////////////////
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

// Evitar el controlador por defecto
function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.returnValue = false;
}

// Prevenir las teclas de SCROLL
function keydown(e) {
    var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

// Prevenir rueda del ratons
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
    // document.body.style.overflow = 'hidden'; // CSS
    disable_scroll_mobile();
}

// Habilitar scoll
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

// Mobil
function disable_scroll_mobile() {
    document.addEventListener('touchmove', preventDefault, false);
}
function enable_scroll_mobile() {
    document.removeEventListener('touchmove', preventDefault, false);
}