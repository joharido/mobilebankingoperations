var max_fields = 30;
var wrapper = $(".input_fields_wrap");
var add_button = $(".add_field_button");
var count = 1;
var i = 2;
var x = 1;
var numberOfMembers = 3;

var n = $("#num").val();
var num = document.getElementById("num");


//set the form action
document.querySelector("#form").action = `./createUser`;

//reset button
$(".resetBtn").on("click", function(e){
    $(".new_members").remove();
    $(".memberInfoFields").value = '';
})

//submit button
$("#form").on("submit", (e) => {
   var emails = $(".team_members_emails");
    
   var temp = emails.map(function(){
    return $(this).val();}).get();
    

    var counts = [];
    
    for (var i = 0; i < temp.length; i++){
        if(counts[temp[i]] === undefined){
            counts[temp[i]] = 1;
        } else{
            e.preventDefault();
            emailDuplicate();
        }
    }
})

//add members
$(add_button).on("click", function(e){
    e.preventDefault();
    i+=1;
    // console.log(i);
    if (count < max_fields){
        count++;
        
        $(wrapper).append(`<div class="row new_members"><div class="col-6 "><input class="memberInfoFields team_members_names" type="text" name="user[${i}][user_info]" placeholder= "User info" required/><a href="#" class="remove_field"></a> </div> <div class="col-6"><input class="memberInfoFields team_members_emails" type="email" name="user[${i}][email_info]" placeholder= "User email" required/></div><a href="#" class="remove_field memberInfoFields">Remove</a></div>`); 
        // $(wrapper).append('<div><input type="text" name="mytext[1][" placeholder= "User email"/><a href="#" class="remove_field">Remove</a></div> '); 
    }
    ++ num.value;

     $("#sideDisplay").removeClass("sideDisplay_display");


    //make div element draggable
    dragElement(document.getElementById("sideDisplay"));

    function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
    }
})

$(wrapper).on("click",".remove_field", function(e){ //user click on remove text
    e.preventDefault(); 
    
    if (num.value > 3){
        $(this).parent('div').remove(); x--;
        --num.value;    
    } else{ 
        
        memberRemovalAlert();
    }
    
})
function emailDuplicate(){
    Notiflix.Notify.Init({
        width: '280px',
        position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' && v2.2.0 and the next versions => 'center-top' - 'center-bottom' - 'center-center'
        distance: '10px',
        opacity: 1,
        borderRadius: '5px',
        rtl: false,
        timeout: 3000,
        messageMaxLength: 110,
        backOverlay: false,
        backOverlayColor: 'rgba(0,0,0,0.5)',
        plainText: true,
        showOnlyTheLastOne: false,
        clickToClose: false,
        ID: 'NotiflixNotify',
        className: 'notiflix-notify',
        zindex: 4001,
        useGoogleFont: false, // v2.2.0 and the next versions => has been changed as "false"
        fontFamily: 'Quicksand',
        fontSize: '13px',
        cssAnimation: true,
        cssAnimationDuration: 400,
        cssAnimationStyle: 'fade', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
        closeButton: false,
        useIcon: true,
        useFontAwesome: false,
        fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
        fontAwesomeIconSize: '34px',
        failure: {
            background: '#ff5549',
            textColor: '#fff',
            childClassName: 'failure',
            notiflixIconColor: 'rgba(0,0,0,0.2)',
            fontAwesomeClassName: 'fas fa-times-circle',
            fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
            backOverlayColor: 'rgba(255,85,73,0.2)', // v2.2.0 and the next versions
          }
    })
    Notiflix.Notify.Failure('Form submission error!: no two members can have the same email address');    
}

function memberRemovalAlert(){
    Notiflix.Notify.Init({
        width: '280px',
        position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' && v2.2.0 and the next versions => 'center-top' - 'center-bottom' - 'center-center'
        distance: '10px',
        opacity: 1,
        borderRadius: '5px',
        rtl: false,
        timeout: 3000,
        messageMaxLength: 110,
        backOverlay: false,
        backOverlayColor: 'rgba(0,0,0,0.5)',
        plainText: true,
        showOnlyTheLastOne: false,
        clickToClose: false,
        ID: 'NotiflixNotify',
        className: 'notiflix-notify',
        zindex: 4001,
        useGoogleFont: false, // v2.2.0 and the next versions => has been changed as "false"
        fontFamily: 'Quicksand',
        fontSize: '13px',
        cssAnimation: true,
        cssAnimationDuration: 400,
        cssAnimationStyle: 'fade', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
        closeButton: false,
        useIcon: true,
        useFontAwesome: false,
        fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
        fontAwesomeIconSize: '34px',
        failure: {
            background: '#ff5549',
            textColor: '#fff',
            childClassName: 'failure',
            notiflixIconColor: 'rgba(0,0,0,0.2)',
            fontAwesomeClassName: 'fas fa-times-circle',
            fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
            backOverlayColor: 'rgba(255,85,73,0.2)', // v2.2.0 and the next versions
          }
    })
    Notiflix.Notify.Failure('A minimum of three team members is required!');    
}

$("#home").click(() => {
    window.location.replace(`./mini.html`);
})

//yes / no radio buttons
$("#yes").click(() => {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var name = firstName + ' ' + lastName;
    var em = $("#inputEmail").val();
    document.querySelector("#nameFill").value = name;
    document.querySelector("#emailFill").value = em;
    
    // $("#nameFill").innerHTML = name;
})
$("#no").click(() => {
    document.querySelector("#nameFill").value = '';
    document.querySelector("#emailFill").value = '';
})