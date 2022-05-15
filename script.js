const { text } = require("body-parser");
const { set } = require("express/lib/application");

/* -------------------------- Submit Required Data -------------------------- */
function SubmitRequiredData(){
    setTimeout(() => { alert("Submit successfully!"); }, 1000);
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
function GetDateTime(){
    var currentDate = new Date();
    var date = currentDate.getDate()+'/'+currentDate.getMonth()+"/"
            +currentDate.getFullYear();

    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var sec = currentDate.getSeconds();

    if(hours <10){
        hours = '0'+hours; 
    }

    if(minutes <10){
        minutes = '0'+minutes;
    }
    if(sec < 10){
        sec = '0'+minutes;
    }

    var time = hours +':'+ minutes+":"+sec;
    var dateTime = date+' '+time;

    return dateTime;
}
/* --------------------------- Patient Note Submit -------------------------- */

document.querySelector('#clinician_note_submit').onclick = function(){
    //input can't be none
    if(document.getElementById("clinician_note_input").value.length == 0){
        setTimeout(() => { alert("Note message can't be none"); }, 500);
    }
    else{
        var newNote = document.createElement("li");
        var inputValue = GetDateTime() + " " 
        + document.getElementById("clinician_note_input").value; 
        var text = document.createTextNode(inputValue);

        newNote.classList.add("note_message");

        newNote.appendChild(text);
        newNote.classList.add("single_note_container");
        document.getElementById("notes").appendChild(newNote);

        //clear input
        document.getElementById("clinician_note_input").value = '';
    }
}

document.querySelector('#clinician_message_submit').onclick = function(){
    //input can't be none
    if(document.getElementById("clinician_message_submit").value.length == 0){
        setTimeout(() => { alert("Message can't be none"); }, 500);
    }
    else{
        var newli = document.createElement("li");
        var newMessage = document.createElement("div");
        var dateTime = GetDateTime();
        var inputValue = document.getElementById("clinician_message_input").value;
        var text = document.createTextNode(inputValue);
        var dateText = document.createTextNode(dateTime);

        newMessage.classList.add("single_clinician_message");

        text.classList.add("note_message segoeui_bold_white");
        dateText.classList.add("single_clinician_message_datetime segoeui_bold_white");

        newMessage.appendChild(text);
        newMessage.appendChild(dateText);

        newli.appendChild(newMessage);
        document.getElementsByClassName("clinicianUI_message_content").appendChild(newli);

        //clear input
        document.getElementById("clinician_message_input").value = '';
    }
}
