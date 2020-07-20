$(document).ready(function(){   
    if(typeof $.cookie('authenticated') === 'undefined'){
        $(location).attr('href','./404page.html');
        
    } else{
        if ($.cookie('authenticated')){
            console.log("authenticated cookie exists!", $.cookie('authenticated'));
        } else{
            $(location).attr('href','./404page.html');
        }
    }
});