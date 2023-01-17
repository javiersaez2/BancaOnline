
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
        $('.navBar').removeClass('show-navbar');
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