var MyApp2 = angular.module('MyApp2', []);
MyApp2.controller('miController2', function ($scope, $http) {
    let Amortizazioa = 0.00;
    let Aldiak = 0.00;
    let Kuota = 0.00;
    let Interesa = 0.00;
    let Metatua = 0.00;
    $scope.lista = [];
    $('#periodoIntereses').on('change', function () {
        if ($('#periodoIntereses').val() == "ANUAL") {
            $("#tipoBase").html("<option value='ANUAL'>ANUAL</option>")
        }
        else if ($('#periodoIntereses').val() == "SEMESTRAL") {
            $("#tipoBase").html("<option value='ANUAL'>ANUAL</option> <option value='SEMESTRAL'>SEMESTRAL</option>")

        }
        else {
            $("#tipoBase").html("")
        }
    });
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
        else if ($("#tipoBase").val() == null) {
            alert("Por favor, asigne Tipo de Base Temporal");
        }
        else {
            $scope.ver = 'true';
            $scope.lista = [];
            if ($scope.sistema == "lineal") {


                if ($scope.periodoPago == "SEMESTRAL" && $("#tipoBase").val() == "ANUAL") {
                    var kapitala1 = $scope.capital;
                    var intr = Math.sqrt(1 + ($scope.interes / 100)) - 1
                    var mat = 0;;
                    for (let i = 1; i <= $scope.numero; i++) {
                        for (let j = 1; j <= 2; j++) {
                            if (j == 1) {
                                Interesa = kapitala1 * intr;
                                Amortizazioa = 0;
                                Metatua = 0;
                                kapitala1 = kapitala1;
                                Kuota = kapitala1 * intr;
                            } else {

                                Interesa = kapitala1 * intr;
                                Amortizazioa = $scope.capital / $scope.numero;
                                kapitala1 = kapitala1 - Amortizazioa;
                                Kuota = Amortizazioa + Interesa;
                                console.log(Metatua)
                                Metatua = mat + Amortizazioa;
                                mat = Metatua;
                            }
                            Aldiak = i + "-" + j;
                            $scope.lista.push({
                                Aldiak: Aldiak,
                                Kuota:new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Kuota.toFixed(2)) ,
                            Interesa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Interesa.toFixed(2)),
                            Amortizazioa:new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format( Amortizazioa.toFixed(2)),
                            Metatua:new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Metatua.toFixed(2)) ,
                            Kapitala:new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number( kapitala1).toFixed(2)) 
                            });
                        }

                    }
                }
                if (($scope.periodoPago == "ANUAL" && $("#tipoBase").val() == "ANUAL") || ($scope.periodoPago == "SEMESTRAL" && $("#tipoBase").val() == "SEMESTRAL")) {
                    document.getElementById("tipoBase").innerHTML = "<option value='ANUAL'>ANUAL</option>"
                    var kapitala = $scope.capital;
                    Amortizazioa = ($scope.capital / $scope.numero);
                    for (let index = 0; index < $scope.numero; index++) {
                        Interesa = (kapitala * $scope.interes) / 100;
                        kapitala = kapitala - Amortizazioa;
                        Aldiak = index + 1;
                        Kuota = Interesa + Amortizazioa;
                        Metatua = Metatua + Amortizazioa;
                        $scope.lista.push({
                            Aldiak: Aldiak,
                            Kuota:new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Kuota.toFixed(2)) ,
                            Interesa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Interesa.toFixed(2)),
                            Amortizazioa:new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format( Amortizazioa.toFixed(2)),
                            Metatua:new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Metatua.toFixed(2)) ,
                            Kapitala:new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(kapitala.toFixed(2)) 
                        });
                    }
                }
            }
            if ($scope.sistema == "frances") {
                var kapitala = $scope.capital;
                Kuota = ($scope.capital * ($scope.interes / 100)) / (1 - (Math.pow((1 + ($scope.interes / 100)), (-($scope.numero)))));
                for (let index = 0; index < $scope.numero; index++) {
                    Aldiak = index + 1;
                    Interesa = (kapitala * $scope.interes) / 100;
                    Amortizazioa = Kuota - Interesa;
                    Metatua = Metatua + Amortizazioa;
                    kapitala = kapitala - Amortizazioa;
                    $scope.lista.push({
                        Aldiak: Aldiak,
                        Kuota:new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Kuota.toFixed(2)) ,
                        Interesa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Interesa.toFixed(2)),
                        Amortizazioa:new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format( Amortizazioa.toFixed(2)),
                        Metatua:new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Metatua.toFixed(2)) ,
                        Kapitala:new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(kapitala.toFixed(2)) 
                    });
                }
            }
        }
        $scope.periodo = $scope.lista;
    }
    $scope.volver = function () {
        location.reload();
    }
})