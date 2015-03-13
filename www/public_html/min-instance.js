function inserMainScript(url,callback){
    var script = document.createElement("script");
    script.async =" ";script.type="text/javascript";
    if(script.readyState){
        script.onreadystatechange = function(){
            if(script.readyState == "loaded"||script.readyState =="complete")
            {
                script.onreadystatechange = null;
                callback();
            }
        };
        } else {
            script.onload = function(){
                callback();
            };
        }
        script.src=url;
        document.getElementsByTagName("head")[0].appendChild(script);
        script=null;
}

inserMainScript("main.js",function(){
    alert("scipt loaded");
});
