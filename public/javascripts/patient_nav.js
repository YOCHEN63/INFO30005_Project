const moreBtn = document.querySelector('.nav_icon_more')
const PHnavlinks = document.querySelector('.PH-nav-more')

moreBtn.addEventListener('click', ()=>{
PHnavlinks.classList.toggle('PH-nav-display')
})