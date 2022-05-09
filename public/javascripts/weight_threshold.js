var threshold_btn = document.getElementById('set_threshold');
var show_stuff = document.getElementById('threshold_form');
var threshold_close = document.getElementById('exerciseThreshold_close');
var gray_cover = document.getElementById('gray_form_4');
/* pop up for insulin add button*/
threshold_btn.onclick = function show(){
    show_stuff.style.display = "block";
    gray_cover.style.display = "block";
}

threshold_close.onclick = function close(){
    show_stuff.style.display = "none";
    gray_cover.style.display = "none";
}

