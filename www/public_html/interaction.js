(function () {
    var tmp = UtilityBuild(['dmUtil'],function(obj){
        "use strict";
        var opacPan = function opacPan(delta) { panell.style.opacity = 1 * delta + ""; }
        ,endPan = function endPan() { panell.removeAttribute("style"); }
        ,animations = obj.AnimateObject(200,300,'quadratic',opacPan,endPan)
        ,panell = null
        ,id = 0
        ,mouse_hover = false
        ,cssSelector = obj.doc.querySelector.bind(obj.doc)
        ,tab1 = cssSelector("#horizontal-nav .horizontal-nav-wrapper nav #tab3")
        ,tab2 = cssSelector("#horizontal-nav .horizontal-nav-wrapper nav #tab4")
        ,pan1 = cssSelector("#pannel3")
        ,pan2 = cssSelector("#pannel4")
        ,navInteract = function navInteract(evt) {
            var subject = animations
            ,aria_attr = ""; 
            
            switch (evt.type) {
            case 'mouseover':
                if (!mouse_hover) {
                mouse_hover = true;
                obj.animatedFrame.cancel(id);
                aria_attr = evt.target.getAttribute("aria-controls");
                if (aria_attr === 'pannel3') {
                    panell = pan1;
                } else if (aria_attr === 'pannel4') {
                    panell = pan2;
                }
                subject.startTimeCount();
                subject.timePassed = subject.getStartTime();
                id = obj.animatedFrame.request(subject.animate.bind(subject));
                }
                break;
            case 'mouseout':
                mouse_hover = false;
                break;
            default:
                return;
            }
        };
        obj.EventUtility.aboutHandler.addListener(tab1, 'mouseover', navInteract);
        obj.EventUtility.aboutHandler.addListener(tab1, 'mouseout',navInteract);
        obj.EventUtility.aboutHandler.addListener(tab2, 'mouseover', navInteract);
        obj.EventUtility.aboutHandler.addListener(tab2, 'mouseout',navInteract);
        tab1 = null;
        tab2 = null;
    });
}());

