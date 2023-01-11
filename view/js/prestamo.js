var MyApp = angular.module('MyApp', []);
MyApp.controller('miController', function ($scope, $http) {

    let Amortizazioa = 0.00;
    let Aldiak = 0.00;
    let Kuota = 0.00;
    let Interesa = 0.00;
    let Metatua = 0.00;
    $scope.lista = [];
    $('#periodoIntereses').on('change', function () {
        if ($('#periodoIntereses').val() == "Anual") {
            $("#tipoBase").html("<option value='Anual'>Anual</option>")
        }
        else if ($('#periodoIntereses').val() == "Semestral") {
            $("#tipoBase").html("<option value='Anual'>Anual</option> <option value='Semestral'>Semestral</option>")

        }
        else {
            $("#tipoBase").html("")
        }
    });
    $scope.calcular = function () {
        $('#title').append("<h1>Sistema " + $scope.sistema + "  " + $scope.periodoPago + "</h1>");
        $('#title').append("<h3>INT = " + $scope.interes + " %</h3>");


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







            //////LINEAL////
            if ($scope.sistema == "Lineal") {


                if ($scope.periodoPago == "Semestral" && $("#tipoBase").val() == "Anual") {

                    var kapitala1 = $scope.capital;
                    var intr = Math.sqrt(1 + ($scope.interes / 100)) - 1;
                    $('#title').append("<h4>i(k) = " + (intr * 100).toFixed(4) + " %</h4>");
                    var mat = 0;;
                    $scope.lista.push({
                        Aldiak: 0,
                        Kuota: "0,00 €",
                        Interesa: "0,00 €",
                        Amortizazioa: "0,00 €",
                        Metatua: "0,00 €",
                        Kapitala: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(kapitala1).toFixed(2))
                    });
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
                                Kuota: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Kuota.toFixed(2)),
                                Interesa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Interesa.toFixed(2)),
                                Amortizazioa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Amortizazioa.toFixed(2)),
                                Metatua: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Metatua.toFixed(2)),
                                Kapitala: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(kapitala1).toFixed(2))
                            });
                        }

                    }
                }
                if (($scope.periodoPago == "Anual" && $("#tipoBase").val() == "Anual") || ($scope.periodoPago == "Semestral" && $("#tipoBase").val() == "Semestral")) {
                    document.getElementById("tipoBase").innerHTML = "<option value='Anual'>Anual</option>"
                    var kapitala = $scope.capital;

                    for (let index = 0; index <= $scope.numero; index++) {
                        Aldiak = index;
                        if (Aldiak == 0) {
                            Interesa = Aldiak;
                            Amortizazioa = Aldiak;
                            Metatua = Aldiak;
                            kapitala = kapitala;
                            Kuota = Aldiak;

                        }
                        else {
                            Amortizazioa = ($scope.capital / $scope.numero);
                            Interesa = (kapitala * $scope.interes) / 100;
                            kapitala = kapitala - Amortizazioa;
                            Kuota = Interesa + Amortizazioa;
                            Metatua = Metatua + Amortizazioa;
                        }
                        $scope.lista.push({
                            Aldiak: Aldiak,
                            Kuota: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Kuota.toFixed(2)),
                            Interesa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Interesa.toFixed(2)),
                            Amortizazioa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Amortizazioa.toFixed(2)),
                            Metatua: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Metatua.toFixed(2)),
                            Kapitala: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(kapitala).toFixed(2))
                        });
                    }
                }
            }


            //////FRANCES////
            if ($scope.sistema == "Frances") {
                var kapitala = $scope.capital;
                for (let index = 0; index <= $scope.numero; index++) {
                    Aldiak = index;
                    if (Aldiak == 0) {
                        Interesa = Aldiak;
                        Amortizazioa = Aldiak;
                        Metatua = Aldiak;
                        kapitala = kapitala;
                        Kuota = Aldiak;

                    }
                    else {
                        Kuota = ($scope.capital * ($scope.interes / 100)) / (1 - (Math.pow((1 + ($scope.interes / 100)), (-($scope.numero)))));
                        Interesa = (kapitala * $scope.interes) / 100;
                        Amortizazioa = Kuota - Interesa;
                        Metatua = Metatua + Amortizazioa;
                        kapitala = kapitala - Amortizazioa;
                    }
                    $scope.lista.push({
                        Aldiak: Aldiak,
                        Kuota: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Kuota.toFixed(2)),
                        Interesa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Interesa.toFixed(2)),
                        Amortizazioa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Amortizazioa.toFixed(2)),
                        Metatua: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Metatua.toFixed(2)),
                        Kapitala: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(kapitala).toFixed(2))
                    });
                }


            }



            //////SIMPLE////
            if ($scope.sistema == "Simple") {
                //kapital y capital
                var kapitala = $scope.capital;

                for (let index = 0; index <= $scope.numero; index++) {
                    //veces
                    Aldiak = index;

                    if (Aldiak < $scope.numero) {
                        Interesa = 0;
                        Amortizazioa = 0;
                        Metatua = 0;
                        kapitala = kapitala;
                        Kuota = 0;
                    
                    } else {
                        //Los 2 que se deben cambiar
                        Kuota = ($scope.capital * (Math.pow((1 + ($scope.interes / 100)), ($scope.numero))));
                        Interesa = Kuota - $scope.capital;

                        Amortizazioa = Kuota - Interesa;
                        Metatua = Metatua + Amortizazioa;
                        kapitala = kapitala - Amortizazioa;
                    }

                    $scope.lista.push({
                        Aldiak: Aldiak,
                        Kuota: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Kuota.toFixed(2)),
                        Interesa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Interesa.toFixed(2)),
                        Amortizazioa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Amortizazioa.toFixed(2)),
                        Metatua: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Metatua.toFixed(2)),
                        Kapitala: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(kapitala).toFixed(2))
                    });
                }
            }



            //////AMERICANO////
            if ($scope.sistema == "Americano") {
                var kapitala = $scope.capital;
                for (let index = 0; index <= $scope.numero; index++) {
                    Aldiak = index;
                    if (Aldiak == 0) {
                        Interesa = Aldiak;
                        Amortizazioa = Aldiak;
                        Metatua = Aldiak;
                        kapitala = kapitala;
                        Kuota = Aldiak;

                    } else if (Aldiak > 0 && Aldiak < $scope.numero) {
                        Interesa = kapitala * ($scope.interes / 100);
                        Amortizazioa = 0;
                        Metatua = 0;
                        kapitala = kapitala;
                        Kuota = Interesa;
                    
                    }
                    else {
                        Interesa = kapitala * ($scope.interes / 100);
                        Kuota = parseInt(Interesa) + parseInt(kapitala);
                        console.log(Kuota);
                        Amortizazioa = Kuota - Interesa;
                        Metatua = Metatua + Amortizazioa;
                        kapitala = kapitala - Amortizazioa;
                    }
                    $scope.lista.push({
                        Aldiak: Aldiak,
                        Kuota: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Kuota.toFixed(2)),
                        Interesa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Interesa.toFixed(2)),
                        Amortizazioa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Amortizazioa.toFixed(2)),
                        Metatua: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Metatua.toFixed(2)),
                        Kapitala: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(kapitala).toFixed(2))
                    });
                }
            }
        }


        ///Exponer la Lista
        $scope.periodo = $scope.lista;
        console.log($scope.periodo);
    }

    //Regresar
    $scope.volver = function () {
        location.reload();
    }











    //verificar usuario
    $scope.loggedVerify = function () {
        $http({
            url: "../../controller/cLoggedVerify.php",
            method: "POST"
        }).then(function (response) {
            if (response.data.error != "logged") {
                $scope.cuentaUsuario = false;
                $scope.botonAdmin = false;
                $scope.butonLogin = true;
            } else {
                $scope.butonLogOut = true;
                $scope.butonLogin = false;

                if (response.data.tipo == 1) {
                    $scope.botonAdmin = true;
                    $scope.cuentaUsuario = false;
                } else {
                    $scope.cuentaUsuario = true;
                    $scope.botonAdmin = false;
                }
            }
        }).catch(function (response) {
            console.error("Ocurrio un error", response.status, response.data);
        })
    }
    $scope.logout = function () {
        $http({
            url: "/controller/cLogout.php",
            method: "POST"
        }).then(function () {
            window.location.href = "/index.html";
            $scope.butonLogOut = false;
        }).catch(function () {
            console.error("Ocurrio un error", response.status, response.data);
        })
    }
})