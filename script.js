/* -------------------------- Submit Required Data -------------------------- */
function SubmitRequiredData(){
    setTimeout(() => { alert("Submit successfully!"); }, 1500);
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
    event.currentTarget.className += " active";
}

/* -------------------------- Patient Note Content -------------------------- */
var currentDate = new Date();
var date = currentDate.getDate()+'/'+currentDate.getMonth()+"/"
           +currentDate.getFullYear();

var Hours = currentDate.getHours();
var Minutes = currentDate.getMinutes();

if(Hours <10){
    Hours = '0'+Hours;
}

if(Minutes <10){
    Minutes = '0'+Minutes;
}

var time = Hours +':'+ Minutes;
var dateTime = date+' '+time;
document.getElementById("note_message_get_time").innerHTML=dateTime;