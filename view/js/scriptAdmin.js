var MyApp = angular.module('MyApp',[]);

MyApp.controller('miController', function($scope, $http){
    /////cargar los datos de la tabla usuario de la base de datos 
    $http.get('../../controller/controlador_consulta_usuarios.php')
    .then(function(response) {
<<<<<<< HEAD
=======
        console.log(response.data.list);
>>>>>>> 7fddfbab80c41ffddbbf16be31072925c20131e7
        $scope.usuarios = response.data.list;
    })
    .catch(function(response) {
        console.error('Error occurred:', response.status, response.data)
    })
})