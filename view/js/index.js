var miApp=angular.module('miApp',[]);
miApp.controller('miControlador', function($scope, $http){
    $scope.passMostrar = true;
    $scope.iniciarSesionSection = true; 

    $scope.loggedVerify=function() {
        $http({
            url: "/controller/cLoggedVerify.php",
            method: "POST"
        }).then(function (response) {
         
            if (response.data.error != "logged"){
                $scope.cuentaUsuario = false;
                $scope.botonAdmin = false;
                $scope.butonLogin = true;
            } else {             
                $scope.butonLogOut = true;
                $scope.butonLogin = false;
                if (response.data.tipo == 1){
                    $scope.botonAdmin = true;
                    $scope.cuentaUsuario = true;
                } else {
                    $scope.cuentaUsuario = true;
                    $scope.botonAdmin = false;
                    console.log(response);
                }
            }
        }).catch(function (response) {
            console.error("Ocurrio un error", response.status, response.data);
        })	   
    }	

    $scope.logout=function(){
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
});


////////////////// - Animacion simulador - //////////////////
$(function() {
    $('.shape').addClass("shape-border");
    $('.svg-wrapper').hover(function() {
      $('.shape').toggleClass('shape-border');
    });
  });

  ////////////////// - SLIDES SIMULADOR - //////////////////
var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
      invert: false,
    },
    // autoHeight: true,
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    }
  });


  /////////PASAR AL SIMULADOR///////////
$('.blog-slider__button').click(function(event){


    //console.log($(this).attr('value'));
    pasarSimulador = $(this).attr('value');
    console.log(pasarSimulador);

    localStorage["Simulacion"] = JSON.stringify(pasarSimulador);
    window.location.href = "/view/html/paginaPrestamo.html";

});



  