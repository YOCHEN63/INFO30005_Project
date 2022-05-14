//------------------------------------------weight threshold submit form------------------------------------------
var threshold_btn = document.getElementById('set_threshold_weight');
var show_stuff = document.getElementById('threshold_form_weight');
var threshold_close = document.getElementById('weightThreshold_close');
var gray_cover = document.getElementById('gray_form_4');

/* pop up for weight threshold add button*/
threshold_btn.onclick = function show(){
    show_stuff.style.display = "block";
    gray_cover.style.display = "block";
}
/* close */
threshold_close.onclick = function close(){
    show_stuff.style.display = "none";
    gray_cover.style.display = "none";
}


//------------------------------------------bgl threshold submit form------------------------------------------
var threshold_btn1 = document.getElementById('set_threshold_bgl');
var show_stuff1 = document.getElementById('threshold_form_bgl');
var threshold_close1 = document.getElementById('bglThreshold_close');
var gray_cover1 = document.getElementById('gray_form_5');

/* pop up for bgl add button*/
threshold_btn1.onclick = function show(){
    show_stuff1.style.display = "block";
    gray_cover1.style.display = "block";
}
/* close*/
threshold_close1.onclick = function close(){
    show_stuff1.style.display = "none";
    gray_cover1.style.display = "none";
}


//------------------------------------------insulin threshold submit form------------------------------------------
var threshold_btn2 = document.getElementById('set_threshold_insulin');
var show_stuff2 = document.getElementById('threshold_form_insulin');
var threshold_close2 = document.getElementById('insulinThreshold_close');
var gray_cover2 = document.getElementById('gray_form_6');

/* pop up for insulin add button*/
threshold_btn2.onclick = function show(){
    show_stuff2.style.display = "block";
    gray_cover2.style.display = "block";
}

threshold_close2.onclick = function close(){
    show_stuff2.style.display = "none";
    gray_cover2.style.display = "none";
}


//------------------------------------------exercise threshold submit form------------------------------------------
var threshold_btn3 = document.getElementById('set_threshold_exercise');
var show_stuff3 = document.getElementById('threshold_form_exercise');
var threshold_close3 = document.getElementById('exerciseThreshold_close');
var gray_cover3 = document.getElementById('gray_form_7');

/* pop up for insulin add button*/
threshold_btn3.onclick = function show(){
    show_stuff3.style.display = "block";
    gray_cover3.style.display = "block";
}

threshold_close3.onclick = function close(){
    show_stuff3.style.display = "none";
    gray_cover3.style.display = "none";
}


