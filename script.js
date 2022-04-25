/* --------------------------- View Charts Modal --------------------------- */
var viewChartsModal = document.getElementById("paitent_data_chart_modal");
var viewChartsBtn = document.getElementById("data_chart_button");
var closeButn = document.getElementById("modal_return_icon");

viewChartsBtn.onclick = function(){
    viewChartsModal.style.display = "block";
}

closeButn.onclick = function(){
    viewChartsModal.style.display = "none";
}
//close the window when click outside of the window

window.onclick = function(event){
    if(event.target == viewChartsModal){
        viewChartsModal.style.display = "none";
    }
}