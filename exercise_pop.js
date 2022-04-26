var btn4 = document.getElementById('exercise_add_button');
var showItem4 = document.getElementById('exercise_form');
var closeBtn4 = document.getElementById('exercise_close');

btn4.onclick = function show(){
    showItem4.style.display = "block";
}

closeBtn4.onclick = function close(){
    showItem4.style.display = "none";
}
