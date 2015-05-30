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
        ,tab1 = cssSelector("#horizontal-nav #tab3")
        ,tab2 = cssSelector("#horizontal-nav #tab4")
        ,pan1 = cssSelector("#pannel3")
        ,pan2 = cssSelector("#pannel4")
        ,sch = cssSelector(".header .search")
        ,card_prev = cssSelector(".cardslide-prev")
        ,card_next = null
        ,card_frame = null
        ,presentation_width = 0
        ,card_left = 0
        ,pag_markers = null
        ,pag_markers_len = 0
        ,pag_id = 0
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
                evt.preventDefault();
                if ((obj.ClassList(evt.currentTarget).contains("cardslide-next"))) {
                    card_left -= 940;
                    pag_id += 1;
                    
                    if (card_left <= -presentation_width) {
                        card_left  = 0;
                    }
                    
                    obj.ClassList(pag_markers[pag_id-1]).remove("active");
                    
                    if (pag_id > pag_markers_len-1) {
                        pag_id = 0;
                    }
                    
                    obj.ClassList(pag_markers[pag_id]).add("active");
                    card_frame.style.left =  card_left+"px";
                }
                if ((obj.ClassList(evt.currentTarget).contains("cardslide-prev"))) {
                    if (card_left >= 0) {
                        card_left  = -presentation_width;
                    }
                    card_left += 940;
                    obj.ClassList(pag_markers[pag_id]).remove("active");
                    pag_id -= 1;

                    if (pag_id < 0) {
                        pag_id = pag_markers_len -1;
                    }

                    obj.ClassList(pag_markers[pag_id]).add("active");
                    
                    card_frame.style.left =  card_left+"px";
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
        
        if (card_prev !== null) {
            card_next = cssSelector(".cardslide-next");
            card_frame = cssSelector(".resources-card").getElementsByTagName("ul")[0];
            pag_markers = cssSelector('.pagination').getElementsByTagName("li");
            pag_markers_len = pag_markers.length;
            presentation_width = parseInt(card_frame.style.width);
            aEventListener(card_prev, 'click', gestureEvent);
            aEventListener(card_next, 'click', gestureEvent);
        }

        //
        // Clear unuseful Dom Object
        tab1 = null;
        tab2 = null;
        sch = null;
        card_prev = null;
        card_next = null;
    });
}());

