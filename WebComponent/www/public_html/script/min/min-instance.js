//function to insert the script async to prevent the page block
(function (exports) {
    "use strict";
   var noope = function (){};

   function inserMainScript(url, callback, sID) {
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

   document.addEventListener('DOMContentLoaded',function(e){
     inserMainScript("bower_components/material-design-lite/material.min.js",noope);
     //inserMainScript("script/min/interaction.min.js", function(){
     //});
   });

   window.addEventListener('load', function(e){
       window.applicationCache.addEventListener('updateready',function reload(e){
	   if(window.applicationCache.status == window.applicationCache.UPDATEREADY) {
	       if(confirm('A new version of this site is available. Load it?')){
		   window.location.reload();
	       }
	   }
       }, false);
   },false);
  console.log("%c90 s r l s\n%cPratiche Auto\nTel 06 01905227","font-size:1.5em;color:#1945D5;", "color:#14BD4C;font-size:1em;");
}(window));
