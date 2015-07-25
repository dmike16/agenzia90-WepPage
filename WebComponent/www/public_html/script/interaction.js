(function () {
    var tmp = UtilityBuild(['dmUtil','dmPaper'],function(obj){
        "use strict";

        function onscroll_() {
            this.previewScroll = this.lastScroll;
            this.lastScroll = window.scrollY || window.pageYOffset;
            requestTick.bind(this)();
        }
        function requestTick() {
                if (!this.ticking) {
                    obj.animatedFrame.request(this.update.bind(this));
                    this.ticking = true;
                }
        }
        //
        // Dependencies
        var cssSelector = obj.doc.querySelector.bind(obj.doc) 
        ,cssSelectorAll = obj.doc.querySelectorAll.bind(obj.doc)
        ,crossClassList = obj.ClassList
        ,aEventListener = obj.EventUtility.aboutHandler.addListener
        ,rEventListener = obj.EventUtility.aboutHandler.removeListener
        //
        // Boolean Variables
        ,click_on = false
        ,id_p = 0
        //
        // Dom Element
        ,pan1 = cssSelector("#pannel3")
        ,pan2 = cssSelector("#pannel4")
        ,sch = cssSelector(".header .search")
        ,fa_cog_icon = cssSelectorAll("i.fa-cog")
        ,mask_modal = cssSelector("div.mask-modal")
        ,jb = cssSelector("button.paper-fab")
        ,arrowHint = cssSelector(".section-intro .arrow-hint")
        ,headLogo = cssSelector(".header .logo")
        ,photoCrop = cssSelector(".section-base .photo-crop")
        //Variables
        //
        ,visibility = 'hidden'
        ,o_date = null
        ,appBar = {}
        ,scrollingPaper = {
            view: obj.global,
            body: obj.doc.body,
            lastScroll: 0,
            previewScroll: 0,
            firstScroll: false,
            ticking: false,
            update: function () {
                var lscroll = this.lastScroll, ihh = this.pageToScroll.fromObj.innerHeight;
                if (lscroll < ihh || !this.firstScroll) {
                     if (lscroll > 0 && !this.firstScroll) {
                        this.firstScroll = true;
                        this.onOffPaper();
                    } else if (lscroll === 0 && this.firstScroll) {
                        this.firstScroll = false;
                        this.onOffPaper();
                    }
                    
                    var ptsfo = this.pageToScroll.fromObj;
                    var section = ptsfo.sections[0], content = this.pageToScroll.contentOpacity;
                    var thh = ihh/3, nhh= ihh*0.8;

                    if (lscroll >= thh && !this.tirth) {
                        var qhh = -ihh/5;
                        section.style.transform="translate3d(0px," + qhh +"px,0px)";
                        content.style.opacity="0.01";
                        headLogo.style.opacity = "1.0";
                        this.tirth = true;
                    } else if (lscroll < thh && this.tirth) {
                        section.style.transform="translate3d(0px, 0px,0px)";
                        content.style.opacity="1.0";
                        headLogo.style.opacity = "0.0";
                        this.tirth = false;
                    }

                    if (photoCrop !== null) {
                        if (lscroll >= nhh){
                            this.body.dispatchEvent(new Event('scrolledIntroPage'));
                        }
                    }
                }
                this.ticking = false;
            },
            onOffPaper: function () {
                var fs = this.firstScroll;
                crossClassList(this.body).toggle("scrolling",fs);
                crossClassList(jb).toggle("active",fs);
                crossClassList(arrowHint).toggle("deactive",fs);
            },
            tirth: false,
            init: function () {
                this.scroll = onscroll_.bind(this);
                this.scroll();
                
                aEventListener(this.view, "scroll", this.scroll,false);
                delete(this.init);
            }
        }
        ,makeFullScreen = {
            domElement : {
                            sections: cssSelectorAll("section"),
                            innerHeight: obj.global.innerHeight,
                            body: obj.doc.body
                        },
            ticking: false,
            update: function () {
                this.fit();
                this.ticking = false;    
            },
            requestTick: function () {
                if (!this.ticking) {
                    obj.animatedFrame.request(this.update.bind(this));
                    this.ticking = true;
                }
            },
            fit: function () {
                var domEle = this.domElement
                ,hh = domEle.innerHeight
                ,shh = hh + "px"
                ,sections = domEle.sections
                ,fsection = sections[0];
                domEle.body.style.paddingTop = shh;
                for (var i = 0, len = sections.length; i < len; i++) {
                		sections[i].style.height = shh;
                }
                if (hh <= 350) {
                    var qhh = -hh/4;
                    fsection.style.webkitTransform = "translate3d(0px,"+ qhh +"px,0px)";
                    fsection.style.transform = "translate3d(0px,"+ qhh +"px,0px)";
                } else {
                    fsection.style.webkitTransform = null;
                    fsection.style.transform = null;
                }
            },
            init: function () {
                var _that = this;
                _that.fit();
                aEventListener(obj.global, "resize", function (){
                    _that.domElement.innerHeight = obj.global.innerHeight;
                    _that.requestTick.call(_that,null);
                });
                delete(this.init);
            }
        };
        
        scrollingPaper.pageToScroll = { 
            fromObj : makeFullScreen.domElement,
            contentOpacity : cssSelector(".section-intro .primary-block")
        };

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
            default:
                return;
            }
        }

        // Add Event Listenrs
        aEventListener(jb, 'click', gestureEvent);
        aEventListener(mask_modal, 'click', gestureEvent);
//        aEventListener(obj.global, "scroll", gestureEvent);
        aEventListener(obj.doc.body, 'scrolledIntroPage', function (e){
                aEventListener(photoCrop,'transitionend',function dmp(e){
                    var paperDinamyc = e.currentTarget.querySelector(".paper-fab[dynamic]");
                    crossClassList(paperDinamyc).add("active");
                    rEventListener(e.currentTarget,'transitionend',dmp,false);
                });
                crossClassList(photoCrop).add("come-in");
                photoCrop = null;
            e.stopPropagation();
        });
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
        /*Set the animation of the time icon on the specific hour and day
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
        }*/
        //
        //
        //Raise nav bar if the page is scrolled
        scrollingPaper.init();            
        makeFullScreen.init();
        //
        // Clear unuseful Dom Object
        fa_cog_icon = null;
        sch = null;
        pan1=null;
        pan2=null;
        obj.PaperMaker('button',{ element: cssSelectorAll(".paper-fab")[1]});
        obj.PaperMaker('button',{ element: cssSelectorAll(".paper-fab")[0]});
        obj.PaperMaker.MakePaperLive();
        console && console.log("%c90 s r l s\n%cPratiche Auto\nTel 06 01905227","font-size:1.5em;color:#1945D5;", "color:#14BD4C;font-size:1em;");

        });
}());

