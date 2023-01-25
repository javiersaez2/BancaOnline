nav=""
nav=' <!--HEADER-->'+
  '<div class="company-logo"><img src="/view/img/LogoZornotza.png" alt=""></div>'+
  '<nav class="navbar">'+
    '<ul class="nav-items">'+
      '<li class="nav-item"><a href="/view/html/index.html" class="nav-link"> INICIO</a></li>'+
      '<li class="nav-item"><a href="/view/html/paginaPrestamo.html" class="nav-link"> SIMULADOR</a></li>'+

      '<li class="nav-item" ng-show="butonLogin"><a href="/view/html/login.html" class="nav-link">LOGIN</a></li>'+
      '<li class="nav-item" ng-show="cuentaUsuario"><a href="/view/html/cuenta.html" class="nav-link">CUENTA</a></li>'+
      '<li class="nav-item" ng-show="botonAdmin"><a href="/view/html/paginaAdmin.html" class="nav-link">ADMIN</a></li>'+
      '<li class="nav-item" ng-show="butonLogOut"><a ng-click="logout()" class="nav-link">LOG OUT</a></li>'+
    '</ul>'+

  '</nav>'+
  '<div class="menu-toggle">'+
    '<i class="bx bx-menu"></i>'+
    '<i class="bx bx-x"></i>'+
  '</div>'
$('header').append(nav)


footer=""
footer='<div class="container">'+
'<div class="row">'+
'<div class="columnas">'+
  '<h6>DESTACADOS</h6>'+
    '<ul class="footer-links">'+
     '<li><a href="#">Calcular Prestamo Simple</a></li>'+
      '<li><a href="#">Calcular Prestamo Francés</a></li>'+
      '<li><a href="#">Calcular Prestamo Lineal</a></li>'+
      '<li><a href="#">Calcular Prestamo Americano</a></li>'+
      '<li><a href="#">Cuenta Online</a></li>'+
      '<li><a href="#">Horarios</a></li>'+
      '<li><a href="#">Trabaja con nosotros</a></li>'+
      '<li><a href="#">Zornotza Agentes</a></li>'+
    '</ul>'+
  '</div>'+

  '<div class="columnas">'+
    '<h6>INFORMACIÓN LEGAL Y SEGURIDAD</h6>'+
    '<ul class="footer-links">'+
      '<li><a href="#">Aviso Legal</a></li>'+
      '<li><a href="#">Politica de cookies</a></li>'+
      '<li><a href="#">Anuncios</a></li>'+
      '<li><a href="#">Ley de servicios de pago</a></li>'+
      '<li><a href="#">Acessibilidad</a></li>'+
      '<li><a href="#">Seguridad online</a></li>'+
      '<li><a href="#">Reclamaciones</a></li>'+
      '<li><a href="#">Pormociones</a></li>'+
    '</ul>'+
  '</div>'+

  '<div class="columnas">'+
    '<h6>WWBS FP ZORNOTZA</h6>'+
    '<ul class="footer-links">'+
      '<li><a href="#">Sobre Grupo 4</a></li>'+
      '<li><a href="#">Contacto</a></li>'+
      '<li><a href="#">Asistente</a></li>'+
      '<li><a href="#">Consumidor</a></li>'+
      '<li><a href="#">Blog</a></li>'+
      '<li><a href="#">Politicas de Privacidad</a></li>'+
      '<li><a href="#">Finanzas Personales</a></li>'+
    '</ul>'+
  '</div>'+
'</div>'+
'</div>'+
'<div class="container">'+
'<div class="row2">'+
  '<div class="columnas">'+
    '<p class="copyright-text">Copyright &copy;Grupo4 Zonortza 2022.</p>'+
    '<a href="#">Todos los derechos reservados</a>.'+
  '</div>'+

  '<div class="columnas">'+
   ' <ul class="social-icons">'+
      '<li><a class="facebook" href="#"><i class="fa-brands fa-facebook fa-2xl"></i></a></li>'+
      '<li><a class="twitter" href="#"><i class="fa-brands fa-twitter fa-2xl"></i></a></li>'+
      '<li><a class="instagram" href="#"><i class="fa-brands fa-instagram fa-2xl"></i></a></li>'+
      '<li><a class="linkedin" href="#"><i class="fa-brands fa-linkedin fa-2xl"></i></a></li>'+
    '</ul>'+
 ' </div>'+
'</div>'+
'</div>'


$('footer').append(footer)
'use strict'


/*
const menuToggle = document.querySelector('.menu-toggle');
const bxMenu = document.querySelector('.bx-menu');
const bxX = document.querySelector('.bx-x');

const navBar = document.querySelector('.navbar');
*/

// --- open menu ---
$('.bx-menu').click(function (e) {
        $('.navbar').addClass('show-navbar');
        $('.bx-menu').addClass('hide-bx');
        $('.bx-x').addClass('show-bx');

})

/*
bxMenu.addEventListener('click', (e)=> {
    if(e.target.classList.contains('bx-menu')){
        navBar.classList.add('show-navbar');
        bxMenu.classList.add('hide-bx');
        bxX.classList.add('show-bx');
    }
})
*/

// --- close menu ---
$('.bx-x').click(function (e) {
        $('.navbar').removeClass('show-navbar');
        $('.bx-menu').removeClass('hide-bx');
        $('.bx-x').removeClass('show-bx');

})
/*
bxX.addEventListener('click', (e)=> {
    if(e.target.classList.contains('bx-x')){
        navBar.classList.remove('show-navbar');
        bxMenu.classList.remove('hide-bx');
        bxX.classList.remove('show-bx');
    }
})
*/