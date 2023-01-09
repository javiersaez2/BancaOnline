var MyApp = angular.module('MyApp', []);

MyApp.controller('miControl', function ($scope, $http) {
    mostrarCuenta();
    function mostrarCuenta(){
        $http.post('/controller/c_mostrar_cuentasPersonales.php')
            .then(function (response) {
                for (let index = 0; index < response.data.list.length; index++) {
                   $('#cuentas').append( "<option value='"+response.data.list[index].iban+"' >"+response.data.list[index].iban+"</option>") ;
                }
            })
            .catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            })
    }
    $scope.mover = function () {
        var iban= $('#cuentas').val();
        var cantidad =$scope.cantidad;
        var concepto = $scope.concepto;
        console.log($scope.buttones)
        console.log(iban)
        console.log(cantidad)
        console.log(concepto)
    }
})