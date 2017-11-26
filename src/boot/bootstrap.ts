//function to insert the script async to prevent the page block
export function bootstrap(exports: any) {
  let noope: () => void = () => { };

  function inserMainScript(url: string, callback: () => void, sID?: string) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    if (sID) {
      script.id = sID;
    }

    script.onload = function() {
      callback();
    };

    script.src = url;
    script.defer = true;
    document.getElementsByTagName("head")[0].appendChild(script);
    script = null;
  }

  document.addEventListener('DOMContentLoaded', function(e: Event) {
    inserMainScript("assets/script/material.min.js", noope);
    inserMainScript("assets/script/app.js", noope);
  });
}
