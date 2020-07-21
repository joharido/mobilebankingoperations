var auth = $.cookie('authenticated')
if (typeof auth === 'undefined') {
    // console.log('hello')
    $(location).attr('href', './404page.html');
} else {
    // console.log($.cookie('authenticated'))
    if (auth) {
        // console.log("authenticated cookie exists!", $.cookie('authenticated'));
    } else {
        $(location).attr('href', './404page.html');
    }
}


// variables
var firstName = $(".firstName");
var lastName = $(".lastName");
var email = $(".email");
var teamName = $(".teamName");
var memberTable = $("#memberTable tr:last");
var table = document.querySelector("#memberTable");
var rows = table.rows;
var team_members_data = new Array();
var newCookieObj = {};
var table_Data = $('.td');
var value = JSON.parse($.cookie("body").slice(2));
var encrypt;
var hostName = "http://localhost:3000/"

// 404 redirect
$(document).ready(function () {
    
    //adding values from the cookie
    firstName.append(value.firstName);
    lastName.append(value.lastName);
    email.append(value.email);
    teamName.append(value.teamName);
    var team_members_names = new Array();


    //Adding team member names
    for (var i = 0; i < value.user.length; i++) {
        team_members_names.push(value.user[i].user_info);
    }

    var team_members_emails = new Array();
    
    for (var i = 0; i < value.user.length; i++) {
        // console.log(value.user[i].user_info);
        team_members_emails.push(value.user[i].email_info);
    }
    // console.log("emails", team_members_emails);

    // var team_membersLabel = $('label[for="names"]').text();

    // var team_members_data = '<strong>' + "members" + '</strong>\n';

    for (i = team_members_names.length - 1; i >= 0; i--) {
        //   team_members_data.push('\n' + `Member ${i + 1}: `  + team_members_names[i] + ' , ' + team_members_emails[i] + ',  Assigned to:  ' +   value.user[value.user[i].assigned_to].user_info + '\n');
        memberTable.after('<tr><td class="td">' + team_members_names[i] + '</td><td class="td">' + team_members_emails[i])
        // + '</td><td>' + value.user[value.user[i].assigned_to].user_info + '</td></tr>'
    }

});

// continue and return buttons
$("#sendEmail").click(() => {
    window.location.replace("./emailCompose.html");
})

//home button
$("#home").click(() => {
    window.location.replace("./mini.html");
    // console.log("hello");
})

$("#edit").on("click", () => {
    $("#edit").toggle(".hidden");
    $("#saveChanges").toggle(".hidden");
    addAttr();
    

})
$("#saveChanges").on("click", () => {
    $("#edit").toggle(".hidden");
    $("#saveChanges").toggle(".hidden");
    removeAttr();
    //adding values to the new JSON cookie object 
    newCookieObj.firstName = firstName.text();
    newCookieObj.lastName = lastName.text();
    newCookieObj.email = email.text();
    newCookieObj.teamName = teamName.text();
    tempArr = new Array();

    //rows
    for (var i = 0; i < value.user.length; i++) {
        // console.log(i)
        tempArr.push({ "user_info": table.rows[i + 1].cells[0].innerHTML, "email_info": table.rows[i + 1].cells[1].innerHTML});
        //, "assigned_to": value.user[i].assigned_to, "assignee": value.user[i].assignee 
    }

    newCookieObj.user = tempArr;
    // console.log("new cookie", newCookieObj.user);

    // set the cookie pls

    $.cookie("body", 'j=' + JSON.stringify(newCookieObj), { path: '/' })
    // console.log(newCookieObj)
})

function hello(){
    
}


$(".encrypt").click(() => {
    $.post({
        data: ($.cookie("body")),
        // contentType: 'application/json',
        url: `./encrypt`,
        success: function (data) {
            this.encrypt = data;
            Notiflix.Confirm.Init({
                className: 'notiflix-confirm',
                width: '500px',
                zindex: 4003,
                position: 'center', // 'center' - 'center-top' -  'right-top' - 'right-bottom' - 'left-top' - 'left-bottom'
                distance: '10px',
                backgroundColor: '#f8f8f8',
                borderRadius: '25px',
                backOverlay: true,
                backOverlayColor: 'rgba(0,0,0,0.5)',
                rtl: false,
                useGoogleFont: false, // v2.2.0 and the next versions => has been changed as "false"
                fontFamily: 'Quicksand',
                cssAnimation: true,
                cssAnimationStyle: 'fade', // 'zoom' - 'fade'
                cssAnimationDuration: 300,
                plainText: true,
                titleColor: '#32c682',
                titleFontSize: '16px',
                titleMaxLength: 34,
                messageColor: '#1e1e1e',
                messageFontSize: '14px',
                messageMaxLength: data.length,
                buttonsFontSize: '15px',
                buttonsMaxLength: 34,
                okButtonColor: '#f8f8f8',
                okButtonBackground: '#32c682',
                cancelButtonColor: '#f8f8f8',
                cancelButtonBackground: '#a9a9a9',
            });

            // or
            Notiflix.Confirm.Show('Form Key', data, 'close');

            // with callbacks
            Notiflix.Confirm.Show(
                'Confirm Title',
                'Confirm Message',
                'Ok Button Text',
                'Cancel Button Text',
                function () {
                    // yes callback
                },
                function () {
                    // no
                }
            );
        }
    });
   
})
// window.addEventListener("hashchange", function(e) {
//     window.location.replace("./mini.html")
//   })

function addAttr() {
    firstName.attr('contenteditable', true);
    lastName.attr('contenteditable', true)
    email.attr('contenteditable', true)
    teamName.attr('contenteditable', true)
    $('.td').attr('contenteditable', true);
}
function removeAttr() {
    firstName.removeAttr('contenteditable');
    lastName.removeAttr('contenteditable');
    email.removeAttr('contenteditable');
    teamName.removeAttr('contenteditable');
    memberTable.removeAttr('contenteditable');

    $('.td').removeAttr('contenteditable');
}
