
var MyApp = angular.module('MyApp', []);

MyApp.controller('miController', function ($scope, $http) {
    //$scope.butonLogOut = true;
    //$scope.cuenta = []
    /////cargar los datos de la tabla usuario de la base de datos 
    vercuentas();

    //cuentasNoPersonales
    function vercuentas() {
        $http.post('/controller/c_mostrar_cuentasPersonales.php')
            .then(function (response) {
                console.log(response.data.list);
                $scope.cuentas = response.data.list;
                
            })
            .catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            })
    }


    vercuentasNoPersonales();
    function vercuentasNoPersonales(){
        $http.post('/controller/c_mostrar_cuentasTransferir.php')
        .then(function (response) {
            console.log(response.data.list);
            $scope.cuentasNoPersonales = response.data.list;
            
        })
        .catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        })
    }


})