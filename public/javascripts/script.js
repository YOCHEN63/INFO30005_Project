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
function GetDateTime(){
    var currentDate = new Date();
    var date = currentDate.getDate()+'/'+currentDate.getMonth()+"/"
            +currentDate.getFullYear();

    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();

    if(hours <10){
        hours = '0'+hours;
    }

    if(minutes <10){
        minutes = '0'+minutes;
    }

    var time = hours +':'+ minutes;
    var dateTime = date+' '+time;

    return dateTime;
}
/* --------------------------- Patient Note Submit -------------------------- */
/*
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
*/
/* --------------------------- New Paitent Modal -------------------------- */
var newPatientBtn = document.getElementById("new_patient");

var newPatientModal = document.getElementById("new_patient_modal");

var newPatientModalClose = document.getElementById("modal_content_close");

newPatientBtn.onclick = function(){
    newPatientModal.style.display = "block";
}

newPatientModalClose = document.getElementById("modal_content_close");

newPatientModalClose.onclick = function(){
    newPatientModal.style.display = "none";
}

var newPatientFormSubmit = document.getElementById("new_patient_form_submit");

newPatientFormSubmit.onclick() = function(){
    setTimeout(() => { alert("Submit successfully!"); }, 500);

    newPatientModal.style.display = "none";
}