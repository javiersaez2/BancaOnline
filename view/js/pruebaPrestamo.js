var MyApp = angular.module('MyApp', []);
MyApp.controller('miController', function ($scope, $http) {
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
                    $scope.cuentaUsuario = true;
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

    let Amortizazioa = 0.00;
    let Aldiak = 0.00;
    let Kuota = 0.00;
    let Interesa = 0.00;
    let Metatua = 0.00;
    $scope.lista = [];

    $scope.calcular = function () {
        //$('#title').append("<h1>Sistema " + $scope.sistema + "  " + $scope.periodoPago + "meses </h1>");
        //$('#title').append("<h3>INT = " + $scope.interes + " %</h3>");
        // $('#title').append("<h4>i(k) = " + (intr * 100).toFixed(4) + " %</h4>");
        /* if ($scope.sistema == null) {
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
          else if ($scope.tipo == null) {
              alert("Por favor, asigne Tipo de Base Temporal");
          }
          else {
  
          }*/
        $scope.ver = 'true';
        $scope.lista = [];
        var kapitala = $scope.capital;
        var intr = 0;
        var meta = 0;
        var kap = 0;
        var kap2 = 0;
        $scope.lista.push({
            Aldiak: 0,
            Kuota: "0,00 €",
            Interesa: "0,00 €",
            Amortizazioa: "0,00 €",
            Metatua: "0,00 €",
            Kapitala: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(kapitala).toFixed(2))
        });
        if ($scope.periodoPago != $scope.tipo) {
            intr = Math.sqrt(1 + ($scope.interes / 100)) - 1;
        }
        if (($scope.periodoPago == $scope.tipo)) {
            intr = $scope.interes / 100;
        }
        
        //////LINEAL////
        if ($scope.sistema == "Lineal") {
            for (let i = 1; i <= $scope.numero; i++) {
                for (let j = 1; j <= 12 / $scope.periodoPago; j++) {
                    Aldiak = i + "-" + j;
                    if ($scope.periodoCarencia == 0) {//////////////////////////////////////////////////////// Sin periodo de carencia  
                        if (j == 12 / $scope.periodoPago) {
                            Interesa = kapitala * intr;
                            Amortizazioa = $scope.capital / $scope.numero;
                            kapitala = kapitala - Amortizazioa;
                            Kuota = Amortizazioa + Interesa;
                            Metatua = meta + Amortizazioa;
                            meta = Metatua;
                        }
                        else {
                            Interesa = kapitala * intr;
                            Amortizazioa = 0;
                            Metatua = 0;
                            kapitala = kapitala;
                            Kuota = Interesa;
                        }
                    }
                    else {//////////////////////////////////////////////////////// Con periodo de carencia 
                        if ($scope.gabezia == "int") {/////////////////////////////////////////////////////////////Con periodo de carencia int
                            if ($scope.periodoCarencia < i && j == 12 / $scope.periodoPago) {
                                Interesa = kapitala * intr;//
                                Amortizazioa = $scope.capital / ($scope.numero - $scope.periodoCarencia);
                                kapitala = kapitala - Amortizazioa;//
                                Kuota = Interesa + Amortizazioa;//
                                Metatua = meta + Amortizazioa;//
                                meta = Metatua;
                            }
                            else {
                                Interesa = kapitala * intr;
                                Amortizazioa = 0;
                                Metatua = Metatua;
                                kapitala = kapitala;
                                Kuota = Interesa;
                            }
                        } if (($scope.gabezia == "totala")) {////////////////////////////////////////////////////////Con periodo de carencia totala 
                            if ($scope.periodoPago == $scope.tipo) {
                                if ($scope.periodoCarencia < i && j == 12 / $scope.periodoPago) {
                                    Interesa = kapitala * intr;
                                    Amortizazioa = kap / ($scope.numero - $scope.periodoCarencia);
                                    kapitala = kapitala - Amortizazioa;
                                    Kuota = Interesa + Amortizazioa;
                                    Metatua = meta + Amortizazioa;
                                    meta = Metatua;
                                }
                                else {
                                    Interesa = 0;
                                    Amortizazioa = 0;
                                    Metatua = 0;
                                    kapitala = parseInt(kapitala) * (1 + intr);
                                    Kuota = 0;
                                    kap = kapitala;
                                }
                            }
                            if ($scope.periodoPago != $scope.tipo) {
                                if (i <= $scope.periodoCarencia) {
                                    Interesa = 0;
                                    Amortizazioa = 0;
                                    Metatua = 0;
                                    kapitala = parseInt(kapitala) * (1 + intr);
                                    Kuota = 0;
                                }
                                if (i == (parseInt($scope.periodoCarencia) + 1) && j != 12 / $scope.periodoPago) {
                                    Interesa = 0;
                                    Amortizazioa = 0;
                                    Metatua = 0;
                                    kapitala = parseInt(kapitala) * (1 + intr);
                                    Kuota = 0;
                                    kap = kapitala;
                                }
                                if (i == (parseInt($scope.periodoCarencia) + 1) && j == 12 / $scope.periodoPago) {
                                    Interesa = kapitala * intr;
                                    Amortizazioa = kap / ($scope.numero - $scope.periodoCarencia);
                                    kapitala = kapitala - Amortizazioa;
                                    Kuota = Interesa + Amortizazioa;
                                    Metatua = meta + Amortizazioa;
                                    meta = Metatua;
                                }
                                if (i > (parseInt($scope.periodoCarencia) + 1) && j != 12 / $scope.periodoPago) {
                                    Interesa = kapitala * intr;
                                    Amortizazioa = 0;
                                    Metatua = meta;
                                    kapitala = kapitala - Amortizazioa;
                                    Kuota = 0;
                                }
                                if (i > (parseInt($scope.periodoCarencia) + 1) && j == 12 / $scope.periodoPago) {
                                    Interesa = kapitala * intr;
                                    Amortizazioa = kap / ($scope.numero - $scope.periodoCarencia);
                                    kapitala = kapitala - Amortizazioa;
                                    Kuota = Interesa + Amortizazioa;
                                    Metatua = meta + Amortizazioa;
                                    meta = Metatua;
                                }
                            }



                        }
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
            for (let i = 1; i <= $scope.numero; i++) {
                for (let j = 1; j <= 12 / $scope.periodoPago; j++) {
                    Aldiak = i + "-" + j;
                    if ($scope.periodoCarencia == 0) {
                        if (j == 12 / $scope.periodoPago) {
                            Interesa = kapitala * intr;
                            Kuota = ($scope.capital * (intr)) / (1 - (Math.pow((1 + (intr)), (-($scope.numero)))));
                            Amortizazioa = Kuota - Interesa;
                            kapitala = kapitala - Amortizazioa;
                            Metatua = meta + Amortizazioa;
                            meta = Metatua;
                        }
                        else {
                            Interesa = kapitala * intr;
                            Amortizazioa = 0;
                            Metatua = 0;
                            kapitala = kapitala;
                            Kuota = Interesa + Amortizazioa;
                        }
                    }
                    else {
                        if ($scope.gabezia == "int") {
                            if ($scope.periodoCarencia < i && j == 12 / $scope.periodoPago) {
                                Interesa = kapitala * intr;
                                Kuota = ($scope.capital * (intr)) / (1 - (Math.pow((1 + (intr)), (-($scope.numero - $scope.periodoCarencia)))));
                                Amortizazioa = Kuota - Interesa;
                                kapitala = kapitala - Amortizazioa;
                                Metatua = meta + Amortizazioa;
                                meta = Metatua;
                            }
                            else {
                                Interesa = kapitala * intr;
                                Amortizazioa = 0;
                                Metatua = 0;
                                kapitala = kapitala;
                                Kuota = Interesa;
                            }
                        }
                        if (($scope.gabezia == "totala")) {////////////////////////////////////////////////////////Con periodo de carencia totala 
                            if ($scope.periodoPago == $scope.tipo) {
                                if ($scope.periodoCarencia < i && j == 12 / $scope.periodoPago) {
                                    Interesa = kapitala * intr;
                                    Kuota = (kap * (intr)) / (1 - (Math.pow((1 + (intr)), (-($scope.numero - $scope.periodoCarencia)))));
                                    Amortizazioa = Kuota - Interesa;
                                    kapitala = kapitala - Amortizazioa;
                                    Metatua = meta + Amortizazioa;
                                    meta = Metatua;
                                }
                                else {
                                    Interesa = 0;
                                    Amortizazioa = 0;
                                    Metatua = 0;
                                    kapitala = parseInt(kapitala) * (1 + intr);
                                    Kuota = 0;
                                    kap = kapitala;
                                }
                            }
                            if ($scope.periodoPago != $scope.tipo) {
                                if (i <= $scope.periodoCarencia) {
                                    Interesa = 0;
                                    Amortizazioa = 0;
                                    Metatua = 0;
                                    kapitala = parseInt(kapitala) * (1 + intr);
                                    Kuota = 0;
                                }
                                if (i == (parseInt($scope.periodoCarencia) + 1) && j != 12 / $scope.periodoPago) {
                                    Interesa = 0;
                                    Amortizazioa = 0;
                                    Metatua = 0;
                                    kapitala = parseInt(kapitala) * (1 + intr);
                                    Kuota = 0;
                                    kap = kapitala;
                                }
                                if (i == (parseInt($scope.periodoCarencia) + 1) && j == 12 / $scope.periodoPago) {
                                    Interesa = kapitala * intr;
                                    Kuota = (kap * (intr)) / (1 - (Math.pow((1 + (intr)), (-($scope.numero - $scope.periodoCarencia)))));
                                    Amortizazioa = Kuota - Interesa;
                                    kapitala = kapitala - Amortizazioa;
                                    Metatua = meta + Amortizazioa;
                                    meta = Metatua;
                                }
                                if (i > (parseInt($scope.periodoCarencia) + 1) && j != 12 / $scope.periodoPago) {
                                    Interesa = kapitala * intr;
                                    Amortizazioa = 0;
                                    Metatua = meta;
                                    kapitala = kapitala - Amortizazioa;
                                    Kuota = 0;
                                }
                                if (i > (parseInt($scope.periodoCarencia) + 1) && j == 12 / $scope.periodoPago) {
                                    Kuota = (kap * (intr)) / (1 - (Math.pow((1 + (intr)), (-($scope.numero - $scope.periodoCarencia)))));
                                    Interesa = kapitala * intr;
                                    Amortizazioa = Kuota - Interesa;
                                    kapitala = kapitala - Amortizazioa;
                                    Metatua = meta + Amortizazioa;
                                    meta = Metatua;
                                }
                            }
                        }
                    }
                    $scope.lista.push({
                        Aldiak: Aldiak,
                        Kuota: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(Kuota).toFixed(2)),
                        Interesa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(Interesa).toFixed(2)),
                        Amortizazioa: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(Amortizazioa).toFixed(2)),
                        Metatua: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(Metatua).toFixed(2)),
                        Kapitala: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(kapitala).toFixed(2))
                    });
                }
            }
        }
        //////SIMPLE////
        if ($scope.sistema == "Simple") {
            //kapital y capital
            var kapitala = $scope.capital;
            for (let index = 1; index <= $scope.numero; index++) {
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
            for (let index = 1; index <= $scope.numero; index++) {
                Aldiak = index;
                if (Aldiak > 0 && Aldiak < $scope.numero) {
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
        ///Exponer la Lista
        $scope.periodo = $scope.lista;
        console.log($scope.periodo);
    }
    //Regresar
    $scope.volver = function () {
        location.reload();
    }







})