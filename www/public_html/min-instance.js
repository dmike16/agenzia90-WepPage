//function to insert the script async to prevent the page block
function inserMainScript(url, callback, sID) {
    "use strict";
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (sID) {
        script.id = sID;
    }
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    script.async = true;
    document.getElementsByTagName("head")[0].appendChild(script);
    script = null;
}

(function () {
    "use strict";
    //Insert the plusone button
    window.___gcfg = {
        lang: 'it',
        parsetags: 'explicit'
    };
    inserMainScript("https://apis.google.com/js/platform.js", function () {
        gapi.plusone.render("pOne-16", {"href": "https://plus.google.com/112281711139690699166", "size": "medium", "rel":"publisher"});
        gapi.follow.render("follwOne-16",{"class":"g-follow", "href":"https://plus.google.com/112281711139690699166", "height": "20", "rel":"publisher"});
    });

    //insert the facebook like button
    var fbInit = function () {
        FB.init({
            appId   : '1404574083193147',
            xfbml   : true,
            version : 'v2.3'
        });
    };
    inserMainScript("https://connect.facebook.net/it_IT/sdk.js", fbInit, "facebook-jssdk");
    
    //Insert the twitter share button
    inserMainScript("interaction.js", function(){return;});

}());
