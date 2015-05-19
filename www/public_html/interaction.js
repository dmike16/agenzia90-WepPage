(function () {
    var tmp = UtilityBuild(['dmUtil'],function(obj){
        "use strict";
        //
        // Dependencies
        var cssSelector = obj.doc.querySelector.bind(obj.doc) 
        ,aEventListener = obj.EventUtility.aboutHandler.addListener
        //
        // Boolean Variables
        ,mouse_hover = false
        ,click_on = false
        ,id = 0
        //
        // Dom Element
        ,tab1 = cssSelector("#horizontal-nav .horizontal-nav-wrapper nav #tab3")
        ,tab2 = cssSelector("#horizontal-nav .horizontal-nav-wrapper nav #tab4")
        ,pan1 = cssSelector("#pannel3")
        ,pan2 = cssSelector("#pannel4")
        ,sch = cssSelector(".header-wrapper .search")
         //
        // Animations Core function 
        ,opacPan = function opacPan(delta) { panell.style.opacity = 1 * delta + ""; }
        ,endPan = function endPan() { panell.removeAttribute("style"); }
        ,animations = obj.AnimateObject(200,300,'quadratic',opacPan,endPan)
        ,panell = null
        //
        // Event Callback function
        ,gestureEvent = function gestureEvent(evt) {
            var subject = animations
            ,aria_attr = ""; 
            
            switch (evt.type) {
            case 'mouseover':
                if (!mouse_hover) {
                mouse_hover = true;
                obj.animatedFrame.cancel(id);
                evt.currentTarget.setAttribute("aria-expanded", "true");
                aria_attr = evt.currentTarget.getAttribute("aria-controls");
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
                evt.currentTarget.setAttribute("aria-expanded", "false");
                break;
            case 'focus':
                obj.ClassList(evt.currentTarget).add("active");
                break;
            case 'blur':
                obj.ClassList(evt.currentTarget).remove("active");
                break;
            default:
                return;
            }
        };
        //
        // Add Event Listenrs
        aEventListener(tab1, 'mouseover', gestureEvent);
        aEventListener(tab1, 'mouseout', gestureEvent);
        aEventListener(tab2, 'mouseover', gestureEvent);
        aEventListener(tab2, 'mouseout', gestureEvent);
        aEventListener(sch, 'focus', gestureEvent, true);
        aEventListener(sch, 'blur', gestureEvent, true);
        //
        // Clear unuseful Dom Object
        tab1 = null;
        tab2 = null;
        sch = null;
    });
}());

