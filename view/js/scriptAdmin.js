var MyApp = angular.module('MyApp',[]);

MyApp.controller('miController', function($scope, $http){
    /////cargar los datos de la tabla usuario de la base de datos 
    verusuarios()
    function verusuarios(){
    $http.get('../../controller/controlador_consulta_usuarios.php')
    .then(function(response) {

        console.log(response.data.list);
        $scope.usuarios = response.data.list;
    })
    .catch(function(response) {
        console.error('Error occurred:', response.status, response.data)
    })
    }



    $scope.borrarUsuario= function (miIndex, item){
        console.log(item.idCliente)
        datos = item.idCliente;
        var datosjson = JSON.stringify(datos)
        console.log(datosjson);
        $http({
            url: '../../controller/delete_usuario.php',
            method: "POST",
            params: { value: datos }
        }).then(function (response) {
            alert("Funciona")
            verusuarios();
        },function (error){
            console.error("Ocurrio un error", response.status, response.data)
        })   //
    }
        //INSERTAR CLIENTE//
    $scope.insertarVista = 'false';
    $scope.listaInsertar = [];

    $scope.nuevoUsuario=function(){
        $scope.insertarVista = 'true';
    }

    $scope.nuevoCliente=function(){
       
        
        if ($scope.contrsenaIns != $scope.vefIns) {
            return false;
        }
        
        $scope.listaInsertar = {
            nombre: $scope.nombreIns, 
            contrasena: $scope.contrsenaIns, 
        };
        var datosInsert = JSON.stringify($scope.listaInsertar);
        console.log(datosInsert)
        ////////FETCH DE INSERTAR/////
        $http({url: '../../controller/c_insertarClientes.php', 
                method: 'POST',
                params: {value: datosInsert}
        })    
            .then (function (response) {
                alert('Datos insertados con exito '+ response.data);
                console.log(response.data.list.secreto);
                $scope.insertarVista = 'false';        

            })
            .catch(function (response){
                console.log('Error ocurred: ', response.status);
                console.log('Error ocurred: ', response.data);

            })
    }






    ////////Update//////////
    var idCliente=0;

    $scope.modificarUsuario=function(miIndex, item){
        $scope.insertarVista = 'true';
        console.log(item)
        idCliente=item.idCliente;
        $scope.nombreIns=item.nombre;
       $scope.contrsenaIns=item.pasahitza;
        $scope.vefIns=item.pasahitza;
    }
    $scope.guardarCliente=function(){
            idCliente=idCliente;
            nombre=$scope.nombreIns;
            pasahitza= $scope.contrsenaIns;
            if($scope.contrsenaIns==$scope.vefIns){
                $http({
                    url: "../../controller/controller_update.php",
                    method: "POST",
                    params: { 'idCliente': idCliente,'nombre':nombre,'pasahitza':pasahitza }
                }).then(function(response) {
                    alert("Los datos han guardado")
                    $scope.insertarVista = 'false';
                    verusuarios()
                })
                .catch(function(response) {
                    console.error('Error occurred:', response.status, response.data)
                })
            }else{
                alert("Contraseñas no son iguales")
            }
       
    }
})