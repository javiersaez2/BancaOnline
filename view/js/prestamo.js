var MyApp=angular.module('MyApp',[]);
MyApp.controller('miController', function($scope, $http){
    var Amortizazioa = 0;
    var Aldiak = 0;
    var Kuota = 0;
    var Interesa = 0;
    var Metatua = 0;
    $scope.lista = [];

    $scope.calcular = function() {
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
                    Aldiak: Aldiak.toFixed(2),
                    Kuota: Kuota.toFixed(2),
                    Interesa: Interesa.toFixed(2),
                    Amortizazioa: Amortizazioa.toFixed(2),
                    Metatua: Metatua.toFixed(2),
                    Kapitala:kapitala.toFixed(2)
                });
            }
        }
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