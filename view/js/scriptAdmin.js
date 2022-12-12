var MyApp = angular.module('MyApp',[]);

MyApp.controller('miController', function($scope, $http){
    /////cargar los datos de la tabla usuario de la base de datos 
    $http.get('../../controller/controlador_consulta_usuarios.php')
    .then(function(response) {

        console.log(response.data.list);
        $scope.usuarios = response.data.list;
    })
    .catch(function(response) {
        console.error('Error occurred:', response.status, response.data)
    })




    $scope.borrarUsuario= function (miIndex, item){
        console.log(item.idCliente)
        datos = item.idCliente;
        var datosjson = JSON.stringify(datos)
        console.log(datosjson);
        $http({
            url: '../../controller/delete_usuario.php',
            method: "GET",
            params: { value: datos }
        }).success(function (response) {
            alert("Funciona")
        }).error(function () {
            console.error("Ocurrio un error", response.status, response.data)
        })   //

        //INSERTAR CLIENTE//
    $scope.insertarVista = 'false';
    $scope.listaInsertar = [];

    $scope.nuevoUsuario=function(){
        $scope.insertarVista = 'true';
    }

    $scope.nuevoCliente=function(){
       
        /*
        if ($scope.contrsenaIns == $scope.vefIns) {
            console.log("A");
        }
        */
        $scope.listaInsertar = {
            nombre: $scope.nombreIns, 
            contrasena: $scope.contrsenaIns, 
            contrasena2: $scope.vefIns
        };
        var datosInsert = JSON.stringify($scope.listaInsertar);
        console.log(datosInsert)
        ////////FETCH DE INSERTAR/////
        $http({url: '../../controlador/c_insertarClientes.php', 
                method: 'GET',
                params: {value: datosInsert}
        })    
            .success (function (response) {
                alert('Datos insertados con exito '+ response.data);
                $scope.insertarVista = 'false';        

            })
            .error(function (response){
                console.log('Error ocurred: ', response.status);
                console.log('Error ocurred: ', response.data);

            })
    }




    $scope.borrarUsuario=function(miIndex, item){
        console.log(item)
    }
})