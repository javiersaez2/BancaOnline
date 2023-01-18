nav=""
nav=' <!--HEADER-->'+
  '<div class="company-logo"><img src="/view/img/LogoZornotza.png" alt=""></div>'+
  '<nav class="navbar">'+
    '<ul class="nav-items">'+
      '<li class="nav-item"><a href="/index.html" class="nav-link"> INICIO</a></li>'+
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