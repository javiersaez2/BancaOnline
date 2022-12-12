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
        console.log($scope.listaInsertar);

    }




    $scope.borrarUsuario=function(miIndex, item){
        console.log(item)
    }
})