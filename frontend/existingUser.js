console.log("js is connected!");
var decrypt;


var file = document.querySelector(".custom-file-input");
$(".validate").click(() => {
    // var new_cookie = JSON.parse($.cookie("body").slice(2));
    if ($("textarea").val().length !== 0) {
        console.log("no its not empty");
        var val = $.trim($("textarea").val())
        $.post({
            data: {"key": val},
            // contentType: 'application/json',
            url: `./decrypt`,
            success: function (dataString) {
                console.log(dataString)
                if (isJson(dataString)) {
                    data = JSON.parse(dataString)
                    if (data.hasOwnProperty('firstName') && data.hasOwnProperty('lastName') && data.hasOwnProperty('email') && data.hasOwnProperty('user')) {
                        $.cookie("body", 'j=' + JSON.stringify(data), { path: '/' });
                        $.cookie('authenticated', true, { path: '/' });
                        success()
                        $("#va").addClass("hidden");
                        $("#continue").removeClass("hidden");
                        $("#continue").click(() => {
                            // console.log($.cookie("body"));
                            window.location.replace("./landingPage.html");
                            // return false;
                        })
        
                        console.log("done");
                    } else {
                        // console.log("tf!! its not valid!");
                        notValid()
                    }
                } else {
                    //  console.log("this is not a json file");
                    notValid()
                }
            }
        });
    } else {
        console.log("its empty");
        emptyInputAlert();
    }
    // window.location.replace("http://localhost:8887/frontend/landingPage.html")
})

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        console.log(e)
        return false;
    }
    return true;
}
function success() {
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
        success: {
            background: '#32c682',
            textColor: '#fff',
            childClassName: 'success',
            notiflixIconColor: 'rgba(0,0,0,0.2)',
            fontAwesomeClassName: 'fas fa-check-circle',
            fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
            backOverlayColor: 'rgba(50,198,130,0.2)', // v2.2.0 and the next versions
        }
    })
    Notiflix.Notify.Success('form key is valid! click on continue to proceed');
}

function emptyInputAlert() {
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
    Notiflix.Notify.Failure(' Please enter your form key!');
}
function notValid() {
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
    Notiflix.Notify.Failure(' Please enter a valid form key!');
}
