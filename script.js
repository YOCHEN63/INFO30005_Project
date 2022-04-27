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

    return dateTime;
}
/* --------------------------- Patient Note Submit -------------------------- */
var numberOfNote = 0;

document.querySelector('#clinician_note_submit').onclick = function(numberOfNote){
    //input can't be none
    if(document.getElementById("clinician_note_input").value.length == 0){
        setTimeout(() => { alert("Note message can't be none"); }, 1000);
    }
    else{
        numberOfNote++;
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

    if(numberOfNote >=4)
    {
        
    }
}