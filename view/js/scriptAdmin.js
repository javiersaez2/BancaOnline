var MyApp = angular.module('MyApp', []);

MyApp.controller('miController', function ($scope, $http) {
    $scope.butonLogOut = true;
    $scope.cuenta = []
    /////cargar los datos de la tabla usuario de la base de datos 
    verusuarios()

    ///////////////////////////////
    // Mostrar lista de usuarios //
    ///////////////////////////////
    function verusuarios() {
        $http.get('../../controller/controlador_consulta_usuarios.php')
            .then(function (response) {
                console.log(response.data.list);
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
        console.log(item.dniCliente)
        datos = item.dniCliente;
        var datosjson = JSON.stringify(datos)
        console.log(datosjson);
        $http({
            url: '../../controller/delete_usuario.php',
            method: "POST",
            params: { value: datos }
        }).then(function (response) {
            alert(response.data.error)
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
        document.getElementById("demo-modal1").style.visibility = "visible";
        document.getElementById("demo-modal1").style.opacity = 1;
    }

    $scope.nuevoCliente = function () {


        if ($scope.contrsenaIns != $scope.vefIns) {
            alert("Las claves no coinciden");
            return false;
        }

        $scope.listaInsertar = {
            dni: $scope.dniIns,
            nombre: $scope.nombreIns,
            contrasena: $scope.contrsenaIns,
            tipo: $scope.tipoIns
        };
        var datosInsert = JSON.stringify($scope.listaInsertar);
        console.log(datosInsert)

        ////////FETCH DE INSERTAR/////
        $http({
            url: '../../controller/c_insertarClientes.php',
            method: 'POST',
            params: { value: datosInsert }
        })
            .then(function (response) {
                alert(response.data.error);
                $scope.insertarVista = 'false';
                verusuarios();


                document.getElementById("demo-modal1").style.visibility = "hidden";
                document.getElementById("demo-modal1").style.opacity = 0;
            })
            .catch(function (response) {
                console.log('Error ocurred: ', response.status);
                console.log('Error ocurred: ', response.data);

            })
    }

    /////////////////////////////////////////////////
    ////////// - Mostrar cuenta corriente - /////////
    /////////////////////////////////////////////////
    $scope.MostrarCuentas = function (miIndex, item) {
        $scope.cuenta = [];
        console.log(miIndex)
        console.log("--")
        console.log(item.objCuenta.iban)
        for (i = 0; i < item.objCuenta.length; i++) {
            $scope.cuenta.push({ iban: item.objCuenta[i].iban, dniCliente: item.objCuenta[i].dniCliente, titular: item.objCuenta[i].titular, saldo: item.objCuenta[i].saldo, cuentaPos: i+1});
            console.log($scope.cuenta)
        }
        document.getElementById("demo-modal0").style.visibility = "visible";
        document.getElementById("demo-modal0").style.opacity = 1;
    }

    $scope.cerrarCuentas = function (numero) {
        console.log(numero)
        document.getElementById("demo-modal"+numero+"").style.visibility = "hidden";
        document.getElementById("demo-modal"+numero+"").style.opacity = 0;

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
            params: {value:{dniCliente: dni, nombre: nombreCliente}}
        }).then(function (response) {
            alert(response.data.error)
            verusuarios();
        }, function (error) {
            console.error("Ocurrio un error", response.status, response.data)
        }) 

    }

    $scope.borrarCuenta = function(datos){
        var iban = datos.iban;

        $http({
            url: '../../controller/delete_cuenta.php',
            method: "POST",
            params: {value:{iban: iban}}
        }).then(function (response) {
            alert(response.data.error)
            window.location.reload();
        }, function (error) {
            console.error("Ocurrio un error", response.status, response.data)
        }) 
    }

    ////////////////////////
    ////////Update//////////
    ////////////////////////
    $scope.modificarUsuario = function (miIndex, item) {
        document.getElementById("demo-modal2").style.visibility = "visible";
        document.getElementById("demo-modal2").style.opacity = 1;

        document.getElementById("dniModificar").disabled = true;
        $scope.modificarVista = 'true';
        $scope.insertarVista = 'false';
        console.log(item)
        $scope.dniModificar = item.dniCliente;
        $scope.nombreModificar = item.nombre;
        $scope.contrasenaModificar = item.pasahitza;
        $scope.vefModificar = item.pasahitza;
    }

    $scope.guardarCliente = function () {
        dniCliente = $scope.dniModificar;
        nombre = $scope.nombreModificar;
        pasahitza = $scope.contrasenaModificar;
        if ($scope.contrasenaModificar == $scope.vefModificar) {
            $http({
                url: "../../controller/controller_update.php",
                method: "POST",
                params: { 'dniCliente': dniCliente, 'nombre': nombre, 'pasahitza': pasahitza }
            }).then(function (response) {
                alert(response.data.error);
                $scope.modificarVista = 'false';
                verusuarios();

                document.getElementById("demo-modal2").style.visibility = "hidden";
                document.getElementById("demo-modal2").style.opacity = 0;
            })
                .catch(function (response) {
                    console.error('Error occurred:', response.status, response.data)
                })
        } else {
            alert("Contraseñas no son iguales")
        }
    }


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
                    alert("Error: Usuario sin permisos");
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
                    $scope.cuentaUsuario = false;
                    $scope.users = true;
                } else {
                    alert("User: " + response.data.izena + " | Sin acceso, tipo: " + response.data.tipo);
                    $scope.cuentaUsuario = true;
                    $scope.botonAdmin = false;
                    $scope.users = false;

                    if (window.location.pathname != "/index.html") {
                        window.location.href = "/index.html";
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
            window.location.href = "/index.html";
            $scope.butonLogOut = false;
        }).catch(function () {
            console.error("Ocurrio un error", response.status, response.data);
        })
    }
})

