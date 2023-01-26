var MyApp = angular.module('MyAppSesion', []);
MyApp.controller('miControlSesion', function ($scope, $http) {
    ////////////////// - Funcion para verificar la sesion - //////////////////
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
    };

    ////////////////// - Funcion para cerrar sesion - //////////////////
    $scope.logout = function () {
        $http({
            url: "/controller/cLogout.php",
            method: "POST"
        }).then(function () {
            window.location.href = "/view/html/index.html";
            $scope.butonLogOut = false;
        }).catch(function () {
            console.error("Ocurrio un error", response.status, response.data);
        })
    };
});