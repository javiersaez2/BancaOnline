
var MyApp = angular.module('MyApp', []);

MyApp.controller('miController', function ($scope, $http) {

    $scope.saldoT=0;

    $scope.TablaPersonales=true;
    $scope.DineroT=false;
    $scope.SeleccionT=false;
    $scope.OtrasT=false;


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



    $scope.EscogerPersonal = function($index, contenido){
        $scope.DineroT=true;
    }

    $scope.AsignarSaldo = function(){
        $scope.SeleccionT=true;
        console.log($scope.cuentasNoPersonales);

    }

    $scope.MostrarRestos = function(){
        dni = $scope.juan;

        $http({
            url: '../../controller/c_mostrarOtrasCuentas.php',
            method: "POST",
            data: JSON.stringify({'dniCliente': dni})
        }).then(function (response) {
            console.log(response.data.list);
            $scope.OtrasCuentas = response.data.list;

        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        }) 
        
        $scope.OtrasT=true;

    }


})