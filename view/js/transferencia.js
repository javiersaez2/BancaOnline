
var MyApp = angular.module('MyApp', []);

MyApp.controller('miController', function ($scope, $http) {

    $scope.saldoT=0;

    $scope.TablaPersonales=true;
    $scope.DineroT=false;
    $scope.SeleccionT=false;
    $scope.OtrasT=false;


    vercuentas();

    //cuentasPersonales
    function vercuentas() {
        $http.post('/controller/c_mostrar_cuentasPersonales.php')
            .then(function (response) {
                //console.log(response.data.list);
                $scope.cuentas = response.data.list;
                
            })
            .catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            })
    }


    /*
        MOSTRAR CUENTAS DE OTROS POR DNI
    */
    vercuentasNoPersonales();
    function vercuentasNoPersonales(){
        $http.post('/controller/c_mostrar_cuentasTransferir.php')
        .then(function (response) {
            //console.log(response.data.list);
            $scope.cuentasNoPersonales = response.data.list;
            
        })
        .catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        })
    }



    /*
        ESCOGER TU CUENTA
    */
    $scope.EscogerPersonal = function($index, contenido){
        $scope.DineroT=true;
        $scope.saldoT = 0;

    }


    /*
        ASIGNAR EL SALDO
    */
    $scope.AsignarSaldo = function(){
        $scope.SeleccionT=true;
        //console.log($scope.cuentasNoPersonales);

    }


    /*
        MOSTRAR LAS DEMAS
    */
    $scope.MostrarRestos = function(){
        dni = {"dniCliente": $scope.juan.dniCliente};
        //console.log(dni);

        $http({
            url: '../../controller/c_mostrarOtrasCuentas.php',
            method: "POST",
            data: JSON.stringify(dni)
        }).then(function (response) {
            //console.log(response.data.list);
            $scope.OtrasCuentas = response.data.list;

        }).catch(function (response) {
            console.error('Error occurred:', response.status, response.data)
        }) 
        
        $scope.OtrasT=true;

    }


    /*
        TRANSFERENCIA
    */
    $scope.transferir = function($index,contenidoss){

        iban = contenidoss.iban;
        saldo = $scope.saldoT;

        console.log(iban+" \ "+saldo);

    }

})