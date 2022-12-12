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
    }
})