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



// $("#simulador").click(function() {
//     $('html,body').animate({
//         scrollTop: $("#slides").offset()},
//         'slow');
// });
$("#simulador").on('click', function (e) {
    e.preventDefault();
  
    var targetEle = this.hash;
    var $targetEle = $(targetEle);
  
    $('#slides').stop().animate({
        'scrollTop': $targetEle.offset().top
    }, 800, 'swing', function () {
        window.location.hash = targetEle;
    });
});

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