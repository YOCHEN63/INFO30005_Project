var btn4 = document.getElementById('exercise_add_button');
var showItem4 = document.getElementById('exercise_form');
var closeBtn4 = document.getElementById('exercise_close');
var cover4 = document.getElementById('gray_form_3');
btn4.onclick = function show(){
    showItem4.style.display = "block";
    cover4.style.display = "block";
}

closeBtn4.onclick = function close(){
    showItem4.style.display = "none";
    cover4.style.display = "none";
}
