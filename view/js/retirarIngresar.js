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
        var tipo = $scope.tipo;

        if (tipo == "ingresar") {
            $http({
                url: '../../controller/c_ingresar.php',
                method: "POST",
                data: JSON.stringify({'iban': iban, 'cantidad': cantidad, 'concepto': concepto, 'tipo': tipo})
            }).then(function (response) {
                alert("Biennnnnnnnnnn")
            }).catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            }) 
        }if (tipo == "retirar") {
            $http({
                url: '../../controller/c_retirar.php',
                method: "POST",
                data: JSON.stringify({'iban': iban, 'cantidad': cantidad, 'concepto': concepto, 'tipo': tipo})
            }).then(function (response) {
                alert("Biennnnnnnnnnn")
            }).catch(function (response) {
                console.error('Error occurred:', response.status, response.data)
            }) 
        }
       
        
    }
})