const menuBtn = document.querySelector('.AD-menu-btn')
const navlinks = document.querySelector('.AD-nav-links')

menuBtn.addEventListener('click', ()=>{
    navlinks.classList.toggle('mobile-menu')
})