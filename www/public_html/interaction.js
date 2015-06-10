(function () {
    var tmp = UtilityBuild(['dmUtil'],function(obj){
        "use strict";
        //
        // Dependencies
        var cssSelector = obj.doc.querySelector.bind(obj.doc) 
        ,cssSelectorAll = obj.doc.querySelectorAll.bind(obj.doc)
        ,crossClassList = obj.ClassList
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
        ,o_date = null
        ,fa_cog_icon = cssSelectorAll("i.fa-cog")
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
                crossClassList(evt.currentTarget).add("active");
                break;
            case 'blur':
                crossClassList(evt.currentTarget).remove("active");
                break;
            case 'click':
                evt.preventDefault();
                if ((crossClassList(evt.currentTarget).contains("cardslide-next"))) {
                    card_left -= 940;
                    pag_id += 1;
                    
                    if (card_left <= -presentation_width) {
                        card_left  = 0;
                    }
                    
                    crossClassList(pag_markers[pag_id-1]).remove("active");
                    
                    if (pag_id > pag_markers_len-1) {
                        pag_id = 0;
                    }
                    crossClassList(pag_markers[pag_id]).add("active");
                    card_frame.style.transform =   "matrix(1,0,0,1,"+card_left+",0)";
                }
                if ((crossClassList(evt.currentTarget).contains("cardslide-prev"))) {
                    if (card_left >= 0) {
                        card_left  = -presentation_width;
                    }
                    card_left += 940;
                    crossClassList(pag_markers[pag_id]).remove("active");
                    pag_id -= 1;

                    if (pag_id < 0) {
                        pag_id = pag_markers_len -1;
                    }

                    crossClassList(pag_markers[pag_id]).add("active");
                    
                    card_frame.style.transform =  "matrix(1,0,0,1,"+card_left+",0)";
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
        //Set the animation of the time icon on the specific hour and day
        o_date = new Date();
        switch(o_date.getDay()){
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            var o_hour = o_date.getHours(), o_min = o_date.getMinutes
            ,morning = 13, afternoon = 15, evening = 19;
            if ((9 <= o_hour  && o_hour < morning) || (o_hour === 13 && o_min >= 0 && o_min <= 30)) {
                crossClassList(fa_cog_icon[0]).add("fa-spin");
            } else if((afternoon < o_hour && o_hour < evening) || 
            (o_hour === afternoon && o_min >= 30 && o_min < 60) || 
            (o_hour === evening && o_min >=0 && o_min <= 30)) {
                crossClassList(fa_cog_icon[1]).add("fa-spin");
            }
            break;
        default:
        break;
        }
        //
        // Clear unuseful Dom Object
        fa_cog_icon = null;
        tab1 = null;
        tab2 = null;
        sch = null;
        card_prev = null;
        card_next = null;
    });
}());

