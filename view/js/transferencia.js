
var MyApp = angular.module('MyApp', []);

MyApp.controller('miController', function ($scope, $http) {
    $scope.butonLogOut = true;
    $scope.cuenta = []
    /////cargar los datos de la tabla usuario de la base de datos 
    vercuentas()

    function vercuentas() {
        $http.post('/controller/controlador_consulta_cuentas.php')
            .then(function (response) {
                /*
                console.log(response.data.list);
                $scope.usuarios = response.data.list;
                */
            })
            .catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            })
    }

})