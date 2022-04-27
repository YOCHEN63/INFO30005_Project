var btn3 = document.getElementById('insulin_add_button');
var showItem3 = document.getElementById('insulin_form');
var closeBtn3 = document.getElementById('insulin_close');
var cover3 = document.getElementById('gray_form_2');
/* pop up for insulin add button*/
btn3.onclick = function show(){
    showItem3.style.display = "block";
    cover3.style.display = "block";
}

closeBtn3.onclick = function close(){
    showItem3.style.display = "none";
    cover3.style.display = "none";
}
