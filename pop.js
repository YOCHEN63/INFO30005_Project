var btn = document.getElementById('add_button');
var showItem = document.getElementById('myForm');
var closeBtn = document.getElementById('close_button');
btn.onclick = function show(){
    showItem.style.display = "block";
}

closeBtn.onclick = function close(){
    showItem.style.display = "none";
}