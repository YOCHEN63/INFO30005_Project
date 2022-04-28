var btn2 = document.getElementById('weight_add_button');
var showItem2 = document.getElementById('weight_form');
var closeBtn2 = document.getElementById('weight_close');
var cover2 = document.getElementById('gray_form_1');
btn2.onclick = function show(){
    showItem2.style.display = "block";
    cover2.style.display = "block";
}

closeBtn2.onclick = function close(){
    showItem2.style.display = "none";
    cover2.style.display = "none";

}
