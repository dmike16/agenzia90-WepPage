(function () {
    var tmp = UtilityBuild(['dmUtil'],function(obj){
        "use strict";
        //
        // Dependencies
        var cssSelector = obj.doc.querySelector.bind(obj.doc) 
        ,aEventListener = obj.EventUtility.aboutHandler.addListener
        ,if_doc = obj.doc.getElementsByTagName("iframe")[0].contentWindow.document
        ,if_cssSelector = obj.doc.querySelector.bind(if_doc)
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
        ,if_click_to_exapnd = if_cssSelector(".click-to-expand")
        ,if_expandble = if_cssSelector(".expandible")
        ,if_arrow = if_cssSelector(".click-arrow")
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
            case 'click':
                if (!click_on) {
                panell = if_expandble;
                click_on = true;
                obj.ClassList(if_expandble).add("showMe");
                obj.ClassList(if_arrow).add("active");
                obj.animatedFrame.cancel(id);
                subject.startTimeCount();
                subject.timePassed = subject.getStartTime();
                id = obj.animatedFrame.request(subject.animate.bind(subject));
            } else if (click_on) {
                click_on = false;
                obj.ClassList(if_expandble).remove("showMe");
                obj.ClassList(if_arrow).remove("active");
            }
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
        aEventListener(if_click_to_exapnd, 'click', gestureEvent);
        //
        // Clear unuseful Dom Object
        tab1 = null;
        tab2 = null;
        sch = null;
        if_click_to_exapnd = null;
    });
}());

