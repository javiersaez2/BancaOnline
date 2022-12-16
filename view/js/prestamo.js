var miApp=angular.module('miApp',[]);
miApp.controller('miControlador', function($scope, $http){
    var Amortizazioa = 0;
    var Aldiak = 0;
    var Kuota = 0;
    var Interesa = 0;
    var Metatua = 0;
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
})