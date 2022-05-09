var btn1 = document.getElementById('bgl_add_button');
var showItem1 = document.getElementById('bgl_form');
var closeBtn1 = document.getElementById('bgl_close');
var cover1 = document.getElementById('gray_form');
/* pop up for blood glucose add button*/
btn1.onclick = function show(){
    showItem1.style.display = "block";
    cover1.style.display = "block";
}

closeBtn1.onclick = function close(){
    showItem1.style.display = "none";
    cover1.style.display = "none";
}

var btn2 = document.getElementById('weight_add_button');
var showItem2 = document.getElementById('weight_form');
var closeBtn2 = document.getElementById('weight_close');
var cover2 = document.getElementById('gray_form_1');
/* pop up for weight add button*/
btn2.onclick = function show(){
    showItem2.style.display = "block";
    cover2.style.display = "block";
}

closeBtn2.onclick = function close(){
    showItem2.style.display = "none";
    cover2.style.display = "none";

}

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

var btn4 = document.getElementById('exercise_add_button');
var showItem4 = document.getElementById('exercise_form');
var closeBtn4 = document.getElementById('exercise_close');
var cover4 = document.getElementById('gray_form_3');
/* pop up for exercise add button*/
btn4.onclick = function show(){
    showItem4.style.display = "block";
    cover4.style.display = "block";
}

closeBtn4.onclick = function close(){
    showItem4.style.display = "none";
    cover4.style.display = "none";
}

