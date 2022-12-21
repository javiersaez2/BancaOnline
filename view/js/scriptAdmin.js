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
     modalvisible(1);
    }

    $scope.nuevoCliente = function () {
        if ($scope.contrsenaIns != $scope.vefIns) {
            alert("Las claves no coinciden");
            $scope.contrsenaIns = "";
            $scope.vefIns = "";
        } else {
            $scope.listaInsertar = {
                dni: $scope.dniIns,
                nombre: $scope.nombreIns,
                contrasena: $scope.contrsenaIns,
                tipo: $scope.tipoIns
            };
            console.log($scope.dniIns);
            console.log($scope.nombreIns);
            console.log($scope.contrsenaIns);
            var datosInsert = JSON.stringify($scope.listaInsertar);
            console.log(datosInsert)
    
            ////////FETCH DE INSERTAR/////
            $http({
                url: '../../controller/c_insertarClientes.php',
                method: 'POST',
                params: { value: datosInsert }
            })
                .then(function (response) {
                    console.log(response.data.error);
                    console.log(response);
                    alert(response.data.error);
                    $scope.insertarVista = 'false';
                    verusuarios();
    
                    
                    $scope.dniIns = "";
                    $scope.nombreIns = "";
                    $scope.contrsenaIns = "";
                    $scope.tipoIns = "";
                    $scope.vefIns = "";

                    modalnovisible(1);
                })
                .catch(function (response) {
                    console.log('Error ocurred: ', response.status);
                    console.log('Error ocurred: ', response.data);
    
                })
        }
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
       modalvisible(0);
    }

    $scope.cerrarCuentas = function (numero) {
        console.log(numero)
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
            params: {value:JSON.stringify({dniCliente: dni, nombre: nombreCliente})}
        }).then(function (response) {
            alert(response.data.error)
            verusuarios();
        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        }) 

    }

    $scope.borrarCuenta = function(datos){
        var iban = datos.iban;

        $http({
            url: '../../controller/delete_cuenta.php',
            method: "POST",
            params: {value:JSON.stringify({iban: iban})}
        }).then(function (response) {
            alert(response.data.error)
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
                params: { value:JSON.stringify({'dniCliente': dniCliente, 'nombre': nombre, 'pasahitza': pasahitza})}
            }).then(function (response) {
                alert(response.data.error);
                $scope.modificarVista = 'false';
                verusuarios();

                modalnovisible(2);
            }).catch(function (response) {
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


// function switchScroll() {
//     if (document.getElementById('scroll').checked == true){
//       enable_scroll();
//     } else {
//       disable_scroll();
//     }
//   }
  






function modalvisible(x) {
    document.getElementById("demo-modal"+x+"").style.visibility = "visible";
    document.getElementById("demo-modal"+x+"").style.opacity = 1;
    disable_scroll();
    disable_scroll_mobile();
}

function modalnovisible(x) {
    document.getElementById("demo-modal"+x+"").style.visibility = "hidden";
    document.getElementById("demo-modal"+x+"").style.opacity = 0;
    enable_scroll();
    enable_scroll_mobile();
}
  
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
    var keys = [32,33,34,35,36,37,38,39,40];
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
    window.onscroll = function() {
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
    window.onscroll = function() {};
    // document.body.style.overflow = 'auto'; // CSS
    enable_scroll_mobile();
  }
  
  // MOBILE
  function disable_scroll_mobile(){
    document.addEventListener('touchmove', preventDefault, false);
  }
  function enable_scroll_mobile(){
    document.removeEventListener('touchmove', preventDefault, false);
  }