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

/* -------------------------- Patient Data Content -------------------------- */
function OpenTable(event, tableName){
    var i, tabsContent, tabs;
    tabsContent = document.getElementsByClassName("patient_data_tabs_content");

    for(i = 0; i < tabsContent.length;i++)
    {
        tabsContent[i].style.display = "none";
    }

    tabs = document.getElementsByClassName("patient_data_tabs");

    for(i = 0; i < tabs.length; i++)
    {
        tabs[i].className = tabs[i].className.replace(" active","");
    }

    document.getElementById(tableName).style.display = "block";
    evt.currentTarget.className += " active";
}