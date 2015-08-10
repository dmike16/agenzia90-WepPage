(function () {
    var tmp = UtilityBuild(['dmUtil','dmPaper'],function(obj){
        "use strict";

        function onscroll_() {
            this.previewScroll = this.lastScroll;
            this.lastScroll = window.scrollY || window.pageYOffset;
            this._requestTick();
        }
        function onresize_(){
        	this.domElement.innerHeight = obj.global.innerHeight;
        	this._requestTick();
        }
        function requestTick_() {
                if (!this.ticking) {
                    obj.animatedFrame.request(this._update);
                    this.ticking = true;
                }
        }
        function update_(){
        	this.update();
        	this.ticking = false;
        }
        function _setActive(arr) {
        	var len = arr.length;
        	
        	for(var i = 0; i < len; i++) {
        		crossClassList(arr[i]).add("active");
        	}
        }
        function animateOnHover(e){
        	var ele = middleTarget;
        	var eType = e.type;
        	var mouseOver;
        	
        	switch(eType){
        	case 'mouseover':
        		mouseOver = true;
        		break;
        	case 'mouseout':
        		mouseOver = false;
        		break;
        	default:
        		return;
        	}
        	crossClassList(ele).toggle('animate',mouseOver);
        }
        //
        // Dependencies
        var cssSelector = obj.doc.querySelector.bind(obj.doc) 
        ,cssSelectorAll = obj.doc.querySelectorAll.bind(obj.doc)
        ,crossClassList = obj.ClassList
        ,aEventListener = obj.EventUtility.aboutHandler.addListener
        ,rEventListener = obj.EventUtility.aboutHandler.removeListener
        //
        //
        //
        // Dom Element
        ,sch = cssSelector(".header .search")
        ,mask_modal = cssSelector("div.mask-modal")
        ,jb = cssSelector("button.paper-fab")
        ,arrowHint = cssSelector(".section-intro .arrow-hint")
        ,headLogo = cssSelector(".header .logo")
        ,photoCrop = cssSelector(".section-base .photo-crop")
        ,bus = cssSelector("#location .bus p")
        ,car = cssSelector("#location .car p")
        ,middleTarget = cssSelector("#location .middle-target")
            ,fab_one = cssSelectorAll(".paper-fab")[1]
            ,photoSphere = cssSelector("#PhotoSphere")
            ,picFrame = cssSelector(".picture-frame")
        //Variables
        ,first_click = false
        ,scrollingPaper = {
            view: obj.global,
            body: obj.doc.body,
            lastScroll: 0,
            previewScroll: 0,
            _allActive: false,
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
                        section.style.zIndex = "-1";
                        content.style.opacity="0.01";
                        headLogo.style.opacity = "1.0";
                        this.tirth = true;
                    } else if (lscroll < thh && this.tirth) {
                        section.style.transform="translate3d(0px, 0px,0px)";
                        section.style.zIndex="0";
                        content.style.opacity="1.0";
                        headLogo.style.opacity = "0.0";
                        this.tirth = false;
                    }

                    if (photoCrop !== null) {
                        if (lscroll >= nhh){
                            this.body.dispatchEvent(new Event('scrolledIntroPage'));
                        }
                    }
                } else if (!this._allActive) {
                	var nih,lim;
                	if(!this._catalogActive){
                		nih = 2*ihh;
                    	lim = nih*0.8;
                		if (lscroll > lim) {
                			this._catalogActive = true;
                			_setActive(this.catalogServices);
                			this.catalogServices = null;
                		}
                	} else if (!this._locationActive){
                		nih = 3*ihh;
                		lim = nih*0.8;
                		if (lscroll > lim) {
                			this._locationActive = true;
                			this._allActive = true;
                			_setActive(this.location);
                			this.location = null;
                		}
                	}
                }
            },
            onOffPaper: function () {
                var fs = this.firstScroll;
                crossClassList(this.body).toggle("scrolling",fs);
                crossClassList(jb).toggle("active",fs);
                crossClassList(arrowHint).toggle("deactive",fs);
            },
            tirth: false,
            init: function () {
            	this._update = update_.bind(this);
            	this._requestTick = requestTick_.bind(this);
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
            	this._update = update_.bind(this);
            	this._requestTick = requestTick_.bind(this);
                this.resize = onresize_.bind(this);
                this.resize();
                
                aEventListener(obj.global, "resize", this.resize);
                delete(this.init);
            }
        };
        
        scrollingPaper.pageToScroll = { 
            fromObj : makeFullScreen.domElement,
            contentOpacity : cssSelector(".section-intro .primary-block")
        };
        scrollingPaper.catalogServices = cssSelectorAll("#catalog .service-title-0");
        scrollingPaper._catalogActive = false;
        scrollingPaper.location = cssSelectorAll("#location .map");
        scrollingPaper._locationActive = false;

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
        aEventListener(bus,'mouseover',animateOnHover);
        aEventListener(bus,'mouseout',animateOnHover);
        aEventListener(car,'mouseover',animateOnHover);
        aEventListener(car,'mouseout',animateOnHover);
        aEventListener(fab_one,'click',function(e){

            if(!first_click){
                crossClassList(e.currentTarget).add("pressed");
                crossClassList(picFrame).add("hidden");
                crossClassList(photoSphere).add("active");
                first_click = true;
            } else {
                crossClassList(picFrame).remove("hidden");
                crossClassList(photoSphere).remove("active");
                crossClassList(e.currentTarget).remove("pressed");
                first_click = false;
            }
        });

        //
        //
        //Raise nav bar if the page is scrolled
        scrollingPaper.init();            
        makeFullScreen.init();
        //
        // Clear unuseful Dom Object
        sch = null;
        bus = null;
        car = null;
        obj.PaperMaker('button',{ element: fab_one});
        obj.PaperMaker('button',{ element: cssSelectorAll(".paper-fab")[0]});
        obj.PaperMaker.MakePaperLive();
        console && console.log("%c90 s r l s\n%cPratiche Auto\nTel 06 01905227","font-size:1.5em;color:#1945D5;", "color:#14BD4C;font-size:1em;");

        });
}());

