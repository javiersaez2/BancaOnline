var MyApp=angular.module('MyApp',[]);
MyApp.controller('miController', function($scope, $http){
    let Amortizazioa = 0.00;
    let Aldiak = 0.00;
    let Kuota = 0.00;
    let Interesa = 0.00;
    let Metatua = 0.00;
    $scope.lista = [];

    $scope.calcular = function() {

        //($scope.numero == "" || $scope.capital == "" || $scope.interes == "")
        if ($scope.sistema == "" || $scope.duracion == ""){
            console.log("Por favor, asigne tipo de sistema o duracion");
            return false;
            
        }

        $scope.ver = 'true';
        $scope.lista = [];
        if ($scope.sistema == "lineal") {
            var kapitala = $scope.capital;
            ////////////////////
            Amortizazioa = ($scope.capital / $scope.numero);

            ////////////////////
            for (let index = 0; index < $scope.numero; index++) {
                /////////////////////
                Interesa = ($scope.capital * $scope.interes) / 100;
                /////////////////////
                kapitala = kapitala - Amortizazioa;
                ////////////////////
                Aldiak = index + 1;
                ////////////////////
                Kuota = Interesa + Amortizazioa;
                ////////////////////
                Metatua = Metatua + Amortizazioa;
                ///////////////////

                $scope.lista.push({
                    Aldiak: Aldiak,
                    Kuota: Kuota.toFixed(2),
                    Interesa: Interesa.toFixed(2),
                    Amortizazioa: Amortizazioa.toFixed(2),
                    Metatua: Metatua.toFixed(2),
                    Kapitala:kapitala.toFixed(2)
                });
            }
        }
        //$scope.lista = $scope.lista.replace(/,/g, '.');
        //const valorNumerico = parseFloat(valor).toFixed(2)

        $scope.periodo = $scope.lista;
    }


    $scope.volver = function() {
        $scope.ver = 'false';
        $scope.lista = [];
        $scope.sistema="";
        $scope.duracion="";
        $scope.numero=0;
        $scope.gastos=0;
        $scope.capital=0;
        $scope.periodoPago="";
        $scope.tipo="";
        $scope.interes=0;
        $scope.periodoCarencia=0;

    }
})