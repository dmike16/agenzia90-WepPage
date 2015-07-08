(function () {
    var tmp = UtilityBuild(['dmUtil','dmPaper'],function(obj){
        "use strict";
        //
        // Dependencies
        var cssSelector = obj.doc.querySelector.bind(obj.doc) 
        ,cssSelectorAll = obj.doc.querySelectorAll.bind(obj.doc)
        ,crossClassList = obj.ClassList
        ,aEventListener = obj.EventUtility.aboutHandler.addListener
        ,hidden = ""
        ,visibilityChange = ""
        //
        // Boolean Variables
        ,mouse_hover = false
        ,click_on = false
        ,id_s= 0
        ,id_f = 0
        ,id_p = 0
        ,ticking = false
        ,jb_on = false
        ,scroll_flag = false
        //
        // Dom Element
        ,pan1 = cssSelector("#pannel3")
        ,pan2 = cssSelector("#pannel4")
        ,sch = cssSelector(".header .search")
        ,card_prev = cssSelector(".cardslide-prev")
        ,fa_cog_icon = cssSelectorAll("i.fa-cog")
        ,mask_modal = cssSelector("div.mask-modal")
        ,jb_wrapper = cssSelector("div.area-round-button")
        ,jb = cssSelector("button.paper-fab")
        ,card_next = null
        ,card_frame = null
        ,r_ele = obj.doc.body
        //Variables 
        ,presentation_width = 0
        ,card_left = 0
        ,pag_markers = null
        ,pag_markers_len = 0
        ,pag_id = 0
        ,o_date = null
        ,pre_scroll = obj.global.scrollY
        ,appBar = {}
        ,paper_buttons = []
        ,rp = null
        ,ele_a
        ,to = 0.06
        ,rp2
        ,rp_id = 0;

        function step (d) {
            ele_a.style.opacity = to*d + "";
        }
        function ending () {}
        rp = obj.AnimateConfig();
       rp.setDuration(280);
        rp.setTiming('cubicBezier(0.2,1.0,0.1,0.6)');
        rp.setCore(step);
        rp.setEnding(ending);
        rp = obj.AnimateObject(rp);
        rp2 = obj.AnimateConfig();
        rp2.setDuration(450);
        rp2.setCore(function(){});
        rp2.setEnding(function(){ele_a.setAttribute('style','ocapity:0');});
        rp2 = obj.AnimateObject(rp2);
        // Structure app bar
        appBar.main = cssSelector(".bar");
        appBar.search = sch;
        appBar.id = 0;
        appBar.pannel_on = false;
        appBar.search_on = false;
        appBar.pannel_active = "";
        appBar.pannel3 = pan1;
        appBar.pannel4 = pan2;

        appBar.pannel3.scroller = {};
        appBar.pannel3.scroller.ele = pan1.querySelector(".scroller");
        appBar.pannel3.ripple = pan1.querySelector(".ripple");
        appBar.pannel3.background = pan1.querySelector(".background");
        appBar.pannel3.scroller.css_style = "width:193px;height:140px;max-width:1459px;max-height:443px;";

        appBar.pannel4.scroller = {};
        appBar.pannel4.scroller.ele = pan2.querySelector(".scroller");
        appBar.pannel4.scroller.css_style = "width:160px;height:135px;max-width:1459px;max-height:443px;";
        appBar.pannel4.ripple = pan2.querySelector(".ripple");
        appBar.pannel4.background = pan2.querySelector(".background");

        
        appBar.openPannel = function openPannel(str) {
            var scroller = appBar[str].scroller
            ,ripple = appBar[str].ripple
            ,background = appBar[str].background;

            appBar.pannel_on = true;
            appBar.pannel_active = str;
            scroller.ele.setAttribute("style",scroller.css_style);
            appBar[str].setAttribute("style","outline:none;z-index:12;right:0px;top:0px;");
            obj.animatedFrame.cancel(id_p);
            id_p = obj.animatedFrame.request(function(){
                crossClassList(appBar[appBar.pannel_active]).add("active");
            });
        };
        appBar.closePannel = function closePannel(str) {
            var scroller = appBar[str].scroller;

            appBar.pannel_on = false;
            appBar.pannel_active = " ";
            appBar[str].setAttribute("style","outline:none;display:none;");
            scroller.ele.removeAttribute("style");
            crossClassList(appBar[str]).remove("active");
        };
        appBar.handlerEvent = function handlerEvent(str) {
            if (appBar.pannel_on) {
                appBar.closePannel(appBar.pannel_active);
                if (!appBar.pannel_active.match(str)) {
                    appBar.openPannel(str);
                }
            } else {
                    appBar.openPannel(str);
            }
        };
        appBar.showSearch = function showSearch() {
            if(!appBar.search_on) {
                crossClassList(appBar.main).add('search-on');
                crossClassList(appBar.search).add('active');
                appBar.search_on = true;
            }
        };
        appBar.closeSearch = function closeSearch() {
                crossClassList(appBar.main).remove('search-on');
                crossClassList(appBar.search).remove('active');
                appBar.search_on = false;
        };
        //Paper Buttons
        paper_buttons[0] = ({
            main: cssSelectorAll(".paper-button")[0],
            init: function () {
                this.bg = this.main.querySelector(".bg");
                this.shadow_level = this.main.querySelector(".shadow");
                this.waves = this.main.querySelector(".waves");
                delete(this.init);
                return this;
            }  
        }.init());
      /*  aEventListener(paper_buttons[0].main,'mousedown',function(e) {
            var tmp = crossClassList(paper_buttons[0].shadow_level);
            tmp.remove("bs-zLevel-1");
            tmp.add("bs-zLevel-2");
            e.currentTarget.setAttribute('pressed','');
            e.currentTarget.setAttribute('active','');
            paper_buttons[0].bg.setAttribute('style','opacity:0;background-color:rgb(0,0,0);');
            ele_a = paper_buttons[0].bg;
            obj.animatedFrame.cancel(rp_id);
            rp.startTimeCount();
            rp_id = obj.animatedFrame.request(rp.animate.bind(rp));
        });*/
        /*aEventListener(paper_buttons[0].main,'mouseup',function(e) {
            var tmp = crossClassList(paper_buttons[0].shadow_level);
            tmp.remove("bs-zLevel-2");
            tmp.add("bs-zLevel-1");
            e.currentTarget.removeAttribute('pressed');
            e.currentTarget.removeAttribute('active');
            rp2.startTimeCount();
            obj.animatedFrame.request(rp2.animate.bind(rp2));
           // obj.animatedFrame.cancel(rp_id);
           // paper_buttons[0].bg.setAttribute('style','opacity:0;');
        });*/
        aEventListener(paper_buttons[0].main,'contextmenu',function(e){
            crossClassList(paper_buttons[0].shadow_level).add("bs-zLevel-1");
            crossClassList(paper_buttons[0].shadow_level).remove("bs-zLevel-2");
        });
        // Animations Core function
        //
 /*       
        function forwardSlideCard() {
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
        
        function backwardCard() {
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
*/        
        function requestTick() {
            if (!ticking) {
                if (!scroll_flag && pre_scroll !== 0) {
                    scroll_flag = true;
                    jb_on = true;
                    obj.animatedFrame.request(barShadowElement);
                    ticking = true;
                } else if (scroll_flag && pre_scroll === 0){
                    scroll_flag = false;
                    jb_on = false;
                    obj.animatedFrame.request(barShadowElement);
                    ticking = true;
                }
            }
        }

        function barShadowElement() {
            crossClassList(r_ele).toggle("scrolling",scroll_flag);
            crossClassList(jb).toggle("active",jb_on);
            ticking = false;
        }
        //
        // Event Callback function
        //
        function gestureEvent(evt) {
            
            switch (evt.type) {
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
                }
                break;
            case visibilityChange:
                if(obj.doc[hidden]) {
                    obj.animatedFrame.cancel(id_f);
                    obj.global.clearInterval(id_s);
            } else {
                id_s = obj.global.setInterval(animateSlideCard,11000);
            }
            break;
            case 'scroll':
                pre_scroll = obj.global.scrollY;
                requestTick();
                break;
            default:
                return;
            }
        }

        // Add Event Listenrs
        aEventListener(jb, 'click', gestureEvent);
        aEventListener(mask_modal, 'click', gestureEvent);
        aEventListener(obj.global, "scroll", gestureEvent);

        //Event Gesture app-bar
        //-*- Open pannel in main nav bar
        //-*- Open serch form in app bar
        aEventListener(appBar.pannel3.parentElement,'mouseup',function(e) {
            var tmp_id = appBar.id;    
            obj.animatedFrame.cancel(tmp_id);
            function wrappH () {
                appBar.handlerEvent('pannel3');
            }
            tmp_id = obj.animatedFrame.request(wrappH);
            e.currentTarget.removeAttribute("pressed");
            e.currentTarget.removeAttribute('active');
/*if(target.getAttribute('aria-label') === 'search') {
                if(appBar.pannel_on) {
                    appBar.closePannel(appBar.pannel_active);
                }
                appBar.showSearch();
                e.preventDefault();
                e.stopPropagation();
            } else if(appBar.search_on) {
                if(target.nodeName !== 'FORM') {
                    appBar.closeSearch();
                }
                e.stopPropagation();
            } else if(appBar.pannel_on) {
                appBar.closePannel(appBar.pannel_active);
                e.stopPropagation();
            }  else {
                return;
            }*/
        });
        aEventListener(appBar.pannel3.parentElement,'mousedown',function(e) {
            e.currentTarget.setAttribute('pressed','');
            e.currentTarget.setAttribute('active','');
        });
        aEventListener(appBar.pannel3,'mouseup',function(e){
            e.stopPropagation();
        });
        aEventListener(obj.doc,'click', function(e) {
            if(appBar.pannel_on) { 
                appBar.closePannel(appBar.pannel_active);
            } else if (appBar.search_on) {
                appBar.closeSearch();
            }
        });
        /*if (card_prev !== null) {
            card_next = cssSelector(".cardslide-next");
            card_frame = cssSelector(".resources-card").getElementsByTagName("ul")[0];
            pag_markers = cssSelector('.pagination').getElementsByTagName("li");
            pag_markers_len = pag_markers.length;
            presentation_width = parseInt(card_frame.style.width);
            aEventListener(card_prev, 'click', gestureEvent);
            aEventListener(card_next, 'click', gestureEvent);
        }*/
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
        //
        //
        //Raise nav bar if the page is scrolled
        if (pre_scroll !== 0) {
            scroll_flag = true;
            jb_on = true;
            obj.animatedFrame.request(barShadowElement);
            ticking = true;
        }
        //
        // Clear unuseful Dom Object
        fa_cog_icon = null;
        sch = null;
        card_prev = null;
        card_next = null;
        jb_wrapper = null;
        pan1=null;
        pan2=null;
        obj.PaperMaker('button',cssSelectorAll(".paper-button")[0]);
        obj.PaperMaker.MakePaperLive();
        console && console.log("%c90 s r l s\n%cPratiche Auto\nTel 06 01905227","font-size:1.5em;color:#1945D5;", "color:#14BD4C;font-size:1em;");

        });
}());

