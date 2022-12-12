var MyApp = angular.module('MyApp',[]);

app.controller('miController', function($scope, $http){
    /////cargar los datos de la tabla usuario de la base de datos 
    $http.get('controlador/controlador_consulta_usuarios.php')
    .then(function(response) {
        $scope.usuarios = response.list;
    })
    .catch(function(response) {
        console.error('Error occurred:', response.status, response.data)
    })
})