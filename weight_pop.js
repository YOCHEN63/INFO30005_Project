var btn2 = document.getElementById('weight_add_button');
var showItem2 = document.getElementById('weight_form');
var closeBtn2 = document.getElementById('weight_close');

btn2.onclick = function show(){
    showItem2.style.display = "block";
}

closeBtn2.onclick = function close(){
    showItem2.style.display = "none";
}
