var MyApp = angular.module('MyApp', []);
MyApp.controller('miController', function ($scope, $http) {
    let Amortizazioa = 0.00;
    let Aldiak = 0.00;
    let Kuota = 0.00;
    let Interesa = 0.00;
    let Metatua = 0.00;
    $scope.lista = [];

    $scope.calcular = function () {
        if ($scope.sistema == null) {
            alert("Por favor, asigne tipo de sistema");
        }
        else if ($scope.duracion == null) {
            alert("Por favor, asigne tipo de duracion");
        }
        else if ($scope.numero == null) {
            alert("Por favor, asigne Cantidad Meses / Años");
        }
        else if ($scope.capital == null) {
            alert("Por favor, asigne Capital");
        }
        else if ($scope.interes == null) {
            alert("Por favor, asigne Tasa de Interés %");
        }
        else if ($scope.periodoPago == null) {
            alert("Por favor, asigne Periodo de pago de intereses");
        }
        else {
            $scope.ver = 'true';
            $scope.lista = [];
            if ($scope.sistema == "lineal") {
                
                
                if ($scope.periodoPago == "SEMESTRAL") {
                    var kapitala1 = $scope.capital;
                    var intr = Math.sqrt(1+($scope.interes/100))-1
                var mat=0;;
                    for (let i = 1; i <= $scope.numero; i++) {
                        for (let j = 1; j <= 2; j++) {
                            if (j==1) {
                                Interesa=kapitala1*intr;
                                Amortizazioa=0;
                                Metatua=0;
                                kapitala1=kapitala1;
                                Kuota=kapitala1*intr;
                            }else{
                               
                                Interesa=kapitala1*intr;
                                Amortizazioa=$scope.capital/$scope.numero;
                                kapitala1=kapitala1 - Amortizazioa;
                                Kuota= Amortizazioa+Interesa;
                                console.log(Metatua)
                                Metatua=mat + Amortizazioa;
                                mat=Metatua;
                            }
                            Aldiak = i +"-"+ j;
                            $scope.lista.push({
                                Aldiak: Aldiak,
                                Kuota: Kuota.toFixed(2),
                                Interesa: Interesa.toFixed(2),
                                Amortizazioa: Amortizazioa.toFixed(2),
                                Metatua: Metatua.toFixed(2),
                                Kapitala: kapitala1
                            });
                        }
                        
                    }
                }
                if ($scope.periodoPago == "ANUAL") {
                    var kapitala = $scope.capital;
                    ////////////////////
                    Amortizazioa = ($scope.capital / $scope.numero);
                    ////////////////////
                    for (let index = 0; index < $scope.numero; index++) {
                        /////////////////////
                        Interesa = (kapitala * $scope.interes) / 100;
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
                            Kapitala: kapitala.toFixed(2)
                        });
                    }
                }


            }

            if ($scope.sistema == "frances") {
                var kapitala = $scope.capital;
                Kuota = ($scope.capital * ($scope.interes / 100)) / (1 - (Math.pow((1 + ($scope.interes / 100)), (-($scope.numero)))));
                for (let index = 0; index < $scope.numero; index++) {
                    ////////////////////
                    Aldiak = index + 1;
                    ///////////////////
                    Interesa = (kapitala * $scope.interes) / 100;
                    ///////////////////
                    Amortizazioa = Kuota - Interesa;
                    ///////////////////
                    Metatua = Metatua + Amortizazioa;
                    ///////////////////
                    kapitala = kapitala - Amortizazioa;
                    $scope.lista.push({
                        Aldiak: Aldiak,
                        Kuota: Kuota.toFixed(2),
                        Interesa: Interesa.toFixed(2),
                        Amortizazioa: Amortizazioa.toFixed(2),
                        Metatua: Metatua.toFixed(2),
                        Kapitala: kapitala.toFixed(2)
                    });
                }
            }
        }
        //$scope.lista = $scope.lista.replace(/,/g, '.');
        //const valorNumerico = parseFloat(valor).toFixed(2)

        $scope.periodo = $scope.lista;
    }


    $scope.volver = function () {
        /*  $scope.ver = 'false';
         $scope.lista = [];
        $scope.sistema="";
         $scope.duracion="";
         $scope.numero=0;
         $scope.gastos=0;
         $scope.capital=0;
         $scope.periodoPago="";
         $scope.tipo="";
         $scope.interes=0;
         $scope.periodoCarencia=0;*/
        location.reload();

    }
})