var btn1 = document.getElementById('bgl_add_button');
var showItem1 = document.getElementById('bgl_form');
var closeBtn1 = document.getElementById('bgl_close');
var cover1 = document.getElementById('gray_form');
btn1.onclick = function show(){
    showItem1.style.display = "block";
    cover1.style.display = "block";
}

closeBtn1.onclick = function close(){
    showItem1.style.display = "none";
    cover1.style.display = "none";
}

