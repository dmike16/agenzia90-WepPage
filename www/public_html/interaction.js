(function () {
    var tmp = UtilityBuild(['dmUtil'],function(obj){
        "use strict";
        //
        // Dependencies
        var cssSelector = obj.doc.querySelector.bind(obj.doc) 
        ,cssSelectorAll = obj.doc.querySelectorAll.bind(obj.doc)
        ,crossClassList = obj.ClassList
        ,aEventListener = obj.EventUtility.aboutHandler.addListener
        ,hidden
        ,visibilityChange
        //
        // Boolean Variables
        ,mouse_hover = false
        ,click_on = false
        ,id = 0
        ,id_s= 0
        ,id_f = 0
        ,ticking = false
        ,jb_on = false
        ,scroll_flag = false
        //
        // Dom Element
        ,tab1 = cssSelector("#horizontal-nav #tab3")
        ,tab2 = cssSelector("#horizontal-nav #tab4")
        ,pan1 = cssSelector("#pannel3")
        ,pan2 = cssSelector("#pannel4")
        ,sch = cssSelector(".header .search")
        ,card_prev = cssSelector(".cardslide-prev")
        ,fa_cog_icon = cssSelectorAll("i.fa-cog")
        ,mask_modal = cssSelector("div.mask-modal")
        ,jb_wrapper = cssSelector("div.area-round-button")
        ,jb = cssSelector("button.paper-fab")
        ,intro_full_screen = cssSelector("section.section-full-screen")
        ,photo_intro = cssSelector(".section-full-screen .section-photo-intro")
        ,card_next = null
        ,card_frame = null
        ,r_ele = cssSelector("header")
        //Variables 
        ,presentation_width = 0
        ,card_left = 0
        ,pag_markers = null
        ,pag_markers_len = 0
        ,pag_id = 0
        ,o_date = null
        ,jb_limit_enable = 0
        ,jb_padding_b = parseInt(getComputedStyle(jb_wrapper,null).paddingBottom)
        ,pre_scroll = obj.global.scrollY
        ,wind_inner_h = obj.global.innerHeight
        // Animations Core function 
        ,opacPan = function opacPan(delta) { panell.style.opacity = 1 * delta + ""; }
        ,endPan = function endPan() { panell.removeAttribute("style"); }
        ,forwardSlideCard = function forwardSlideCard() {
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
            card_frame.style.transform =   "matrix(1,0,0,1,"+card_left+",0)";}
        ,backwardCard = function backwardCard() {
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
                 
            card_frame.style.transform =  "matrix(1,0,0,1,"+card_left+",0)";}
        ,animations = obj.AnimateObject(200,300,'quadratic',opacPan,endPan)
        ,panell = null
        ,requestTick = function requestTick() {
            if (!ticking) {
                if (jb_limit_enable > wind_inner_h) {
                    if(!jb_on) {
                        obj.animatedFrame.request(helloJellyButton);
                        ticking = true;
                    }
                }
                else if (jb_limit_enable <= wind_inner_h) {
                    if(jb_on) {
                        obj.animatedFrame.request(byeJellyButton);
                        ticking = true;
                    }
                }
                if (!scroll_flag && pre_scroll !== 0) {
                    scroll_flag = true;
                    obj.animatedFrame.request(barShadowElement);
                    ticking = true;
                } else if (scroll_flag && pre_scroll === 0){
                    scroll_flag = false;
                    obj.animatedFrame.request(barShadowElement);
                    ticking = true;
                }
            }
        }
        ,byeJellyButton = function byeJellyButton () {
            crossClassList(jb).remove("active");
            jb_on = false;
            ticking = false;
        }
        ,helloJellyButton = function helloJellyButton() {
            crossClassList(jb).add("active");
            jb_on = true;
            ticking = false;
        }
        ,barShadowElement = function barShadowElement() {
            crossClassList(r_ele).toggle("bs-zLevel-1",scroll_flag);
            ticking = false;
        }
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
                if (evt.currentTarget.tagName === "BUTTON" || evt.currentTarget.tagName === "button") {
                        crossClassList(mask_modal).add("active"); 
                        crossClassList(obj.doc.documentElement).add("mask-disable-scroll"); 
                } else if (evt.currentTarget.tagName === "DIV" || evt.currentTarget.tagName === "div") {
                    if((crossClassList(evt.currentTarget).contains("mask-modal","active"))) {
                        crossClassList(mask_modal).remove("active");
                        crossClassList(obj.doc.documentElement).remove("mask-disable-scroll");
                    }
                } else if (evt.currentTarget.tagName === "A" || evt.currentTarget.tagName === "a") {
                    if ((crossClassList(evt.currentTarget).contains("cardslide-next"))) {
                        forwardSlideCard();
                    } else if ((crossClassList(evt.currentTarget).contains("cardslide-prev"))) {
                        backwardCard();
                    }
                }
                break;
            case visibilityChange:
                if(obj.doc[hidden]) {
                    obj.animatedFrame.cancel(id_f);
                    obj.global.clearInterval(id_s);
            } else {
                id_s = obj.global.setInterval(function animateSlideCard(){
                    id_f = obj.animatedFrame.request(forwardSlideCard);
                },11000);
            }
            break;
            case 'scroll':
                jb_limit_enable = jb_limit_enable + (obj.global.scrollY -pre_scroll);
                pre_scroll = obj.global.scrollY;
                requestTick();
                break;
            default:
                return;
            }
        };
        //
        //CrossBroswer visibilityChange
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.mozHidden !== "undefined") {
            hidden = "mozHidden";
            visibilityChange = "mozvisibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }

        // Add Event Listenrs
        aEventListener(tab1, 'mouseover', gestureEvent);
        aEventListener(tab1, 'mouseout', gestureEvent);
        aEventListener(tab2, 'mouseover', gestureEvent);
        aEventListener(tab2, 'mouseout', gestureEvent);
        aEventListener(sch, 'focus', gestureEvent, true);
        aEventListener(sch, 'blur', gestureEvent, true);
        aEventListener(jb, 'click', gestureEvent);
        aEventListener(mask_modal, 'click', gestureEvent);
        aEventListener(obj.global, 'scroll', gestureEvent);
        
        if (card_prev !== null) {
            card_next = cssSelector(".cardslide-next");
            card_frame = cssSelector(".resources-card").getElementsByTagName("ul")[0];
            pag_markers = cssSelector('.pagination').getElementsByTagName("li");
            pag_markers_len = pag_markers.length;
            presentation_width = parseInt(card_frame.style.width);
            aEventListener(card_prev, 'click', gestureEvent);
            aEventListener(card_next, 'click', gestureEvent);
            aEventListener(obj.doc, visibilityChange, gestureEvent, false);
            id_s = obj.global.setInterval(function animateSlideCard(){
                id_f = obj.animatedFrame.request(forwardSlideCard);
            },11000);
        }
        //Set the animation of the time icon on the specific hour and day
        o_date = new Date();
        switch(o_date.getDay()){
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            var o_hour = o_date.getHours(), o_min = o_date.getMinutes()
            ,morning = 13, afternoon = 15, evening = 19;
            if ((9 <= o_hour  && o_hour < morning) || (o_hour === 13 && o_min >= 0 && o_min <= 30)) {
                crossClassList(fa_cog_icon[0]).add("fa-spin");
            } else if((afternoon < o_hour && o_hour < evening) || 
            (o_hour === afternoon && o_min >= 30 && o_min < 60) || 
            (o_hour === evening && o_min >=0 && o_min <= 30)) {
                crossClassList(fa_cog_icon[1]).add("fa-spin");
            }
            break;
        case 6:
            var o_hour = o_date.getHours(),morning = 13;
            if (9 <= o_hour  && o_hour < morning) {
                crossClassList(fa_cog_icon[2]).add("fa-spin");
            }
            break;
        default:
        break;
        }
        //Calculate the visible limit of jb Button
        intro_full_screen.style.height = wind_inner_h + "px";
        photo_intro.style.height = wind_inner_h + "px";
        jb_limit_enable = wind_inner_h + pre_scroll - jb_padding_b;
        //
        //
        //Raise nav bar if the page is scrolled
        if (pre_scroll !== 0) {
            scroll_flag = true;
            obj.animatedFrame.request(barShadowElement);
            ticking = true;
        }
        //
        // Clear unuseful Dom Object
        fa_cog_icon = null;
        tab1 = null;
        tab2 = null;
        sch = null;
        card_prev = null;
        card_next = null;
        jb_wrapper = null;
        });
}());

