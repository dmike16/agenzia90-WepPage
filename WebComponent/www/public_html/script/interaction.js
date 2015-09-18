(function () {
     
    var tmp = UtilityBuild(['dmUtil','dmPaper'],function(obj){
        "use strict";
    /*
     * Function call on scroll event.It just stores some values and
     * and call requestTick to check if another animation frame can
     * be request
     */
			    
    function onscroll_() {
     this.previewScroll = this.lastScroll;
     this.lastScroll = window.scrollY || window.pageYOffset;
     this._requestTick();
    }
			    
    /*
     * Same logic of on scroll function
     */
			    
    function onresize_(){
    	var PX = this.px;
    	
    	PX.innerHeight = obj.global.innerHeight;
    	PX.innerWidth = obj.global.innerWidth;
    	PX.calculate();
        this._requestTick();
    }
			    
    /*
     * Check if can be made a new animation request
     */
			    
    function requestTick_() {
        if (!this.ticking) {
	    this.ticking = true;
            obj.animatedFrame.request(this._update);
        }
    }
    /*
     * Call the specific object animation function
     * and set ticking to false so another animation can be request
     */
			    
   function update_(){
       this.update();
       this.ticking = false;
   }
   /*
    * Add the class active to a set of DOM element
    */
			    
   function _setActive(arr) {
       var len = arr.length;
       
       for(var i = 0; i < len; i++) {
           crossClassList(arr[i]).add("active");
       }
   }
			    			    
   /*
    * Set an attribute if TOGGLE=false and Remove it if TOGGLE = TRUE
    */
    function attributeToggle(ele, attr, TOGGLE){
     var contain = (ele.getAttribute(attr) !== null)? true: false;
     var method = contain ? TOGGLE !== true && "removeAttribute":
      TOGGLE !== false && "setAttribute";
     
     if (method) {
      ele[method](attr,"");
      }
     
     if (TOGGLE === true || TOGGLE === false) {
      return TOGGLE;
      } else {
       return !contain;
       }
    }
    /* Temporary function made because in two event listener the actoion
     * to performe are identical
     */
    function activeTour(e){
    	e.preventDefault();
    	e.stopPropagation();
    	
    	crossClassList(obj.doc.documentElement).add("mask-disable-scroll");
    	crossClassList(picFrame).add("hidden");
        crossClassList(photoSphere).add("active");
    }
    function closeTour(e){
    	crossClassList(obj.doc.documentElement).remove("mask-disable-scroll");
    	crossClassList(photoSphere).remove('active');
    	crossClassList(picFrame).remove('hidden');
    }
   //
   // Dependencies
   var cssSelector = obj.doc.querySelector.bind(obj.doc) 
   ,cssSelectorAll = obj.doc.querySelectorAll.bind(obj.doc)
   ,crossClassList = obj.ClassList
   ,aEventListener = obj.EventUtility.aboutHandler.addListener
   ,rEventListener = obj.EventUtility.aboutHandler.removeListener;
   //
   //
   //
   // Dom Element
   var mask_modal = cssSelector("div.mask-modal")
   ,photoCrop = cssSelector(".section-base .photo-crop")
   ,fab_one = cssSelectorAll(".paper-fab")[1]
   ,photoSphere = cssSelector("#PhotoSphere")
   ,picFrame = cssSelector(".picture-frame")
   ,makeATour = null
   ,destroyTour = null;
   //Variables
   //
   var first_click = false;
   //
   //Object For Scrolling Event
   //
   //
   var scrollingArea = {
     /*
      *  Object that contain useful DOM element
      */
		   $:{
			   view: obj.global,
			   body: obj.doc.body,
			   arrowHint: cssSelector(".section-intro .arrow-hint")
		   },
      /*
       * Some Prop of scroll object:
       * i)  lastScroll: store the last scoll quantity
       * ii) previwScroll: cache the precedente scroll
       * iii) _allActive: if true all the section are fully filled
       * iv)  ticking: if false the broswer can request another animation frame
       * v)   firstScroll: if false the page has not been scrolled ever
       * vi)  tirth: if true the first page i scrolled by 1/3
       */
    
       lastScroll: 0,
       previewScroll: 0,
       _allActive: false,
       firstScroll: false,
       ticking: false,
       tirth: false,
	
       /*
	* It's the function that handle the on scroll animation
	*/
       update: function () {
    	   if (this.parallax.state) {	
    		   var lscroll = this.lastScroll
    		   ,ihh = this.px.innerHeight
    		   ,section = this.$.sectionIntro;
    		   if (lscroll > 0) {
    			   if(!this.firstScroll){
    				   this.firstScroll = true;
    				   this.handleDynamicElement();
    			   }
	       
    			   if (lscroll >= ihh && !section.hide){
    				   section.style.display = "none";
    				   section.hide = true;
    				   if (photoCrop !== null) {
    					   this.$.body.dispatchEvent(new Event('scrolledIntroPage'));
    				   }
    			   } else if(lscroll < ihh && section.hide) {
    				   section.style.display = "block";
    				   section.hide = false;
    			   }
    			   if (!this._allActive) {
    				   var lim1 = this.px.pages[0], lim2 = this.px.pages[1];
    				   if(lscroll >= lim1 && !this.$._cacheStatusEle['catalogServices']){
    					   this.activeElementWhenScrolledToLim("catalogServices",lim1,_setActive);
		       
    				   }
    				   if (lscroll >= lim2 && !this.$._cacheStatusEle['location']){
    					   this.activeElementWhenScrolledToLim("location",lim2,_setActive);
    				   }
    			   }
    		   } else {
    			   this.firstScroll = false;
    			   this.handleDynamicElement();
    			   if (section.hide){
    				   section.style.display= "block";
    				   section.hide = false;
    			   }
    		   }
	   
    		   this.parallax.core(7,-lscroll,this.$.sectionPhoto);
    		   this.parallax.core(3,-lscroll,this.$.sectionGridOuter,176);
    	   }
       	},
       	handleDynamicElement: function () {
        var fs = this.firstScroll;
        var ele = this.$
	,bodyClass = crossClassList(ele.body);
	
	if (!bodyClass.contains("mobile")){
	 bodyClass.toggle("scrolling",fs);
	}
        //crossClassList(ele.jellyButton).toggle("active",fs);
        crossClassList(ele.arrowHint).toggle("deactive",fs);
       },
       activeElementWhenScrolledToLim: function (stringEle, lim, callback) {
	 if (this.lastScroll > lim) {
	   var eleDom = this.$[stringEle];
	  
	   callback(eleDom);
	   var status = this.$._cacheStatusEle, p = "";
	   
	   status[stringEle] = true;
	  
	   for (p in status){
	    if (status.hasOwnProperty(p)){
	     if (!status[p]){
	      break;
	      }
	     }
	    }
	  this._allActive = status[p];
	   
	  }
       },
       init: function () {
        this._update = update_.bind(this);
        this._requestTick = requestTick_.bind(this);
        this.scroll = onscroll_.bind(this);
        this.scroll();
    
	   aEventListener(this.$.view, "scroll", this.scroll,false);
        delete(this.init);
       }
   };
   //Object For Resize Event
   //
   //
   var resizeArea = {
       $ : {
           sectionIntro: cssSelector("section"),
           sectionGridOuter: cssSelector(".section-intro .primary-block"),
           sectionPhoto: cssSelector(".section-intro .section-photo"),
           location : [cssSelector("#location .map")],
           _cacheStatusEle : {
    		     'catalogServices': false,
    		    'location' : false
			   	},		
           body: obj.doc.body
       },
       px :{
	 innerHeight: obj.global.innerHeight,
	 innerWidth: obj.global.innerWidth,
	 pages: [],
	 calculate: function pxCalculate(){
	  /*
	   * The first page it's always in full screen
	   */
	  
	     var portion =  0.8;
	  /*
	   * The Other pages have a min-heigh value of 610px;
	   */
	   var currentHeight =  650;
	   this.pages[0] = (this.innerHeight + currentHeight)*portion;
	   this.pages[1] = (this.innerHeight + 2*currentHeight)*0.9;
	  
	  }
       },
       parallax:{
	   state: true,
	   core: function coreParallax(speed,space,ele){
	       var quantity = space / speed;
	       ele.style.transform = "translate3d(0px," + quantity +"px,0px)";
	       if (arguments[3]){
		   var opaQuantity =  1 +  space / arguments[3];
		   ele.style.opacity = opaQuantity + "";
	       }
	   }
       },
       ticking: false,
       desktopResize: function desktopResize() {
    	   var px = this.px;
    	   var height = px.innerHeight
    	   ,sheight = height + "px"
    	   ,width = px.innerWidth
    	   ,domEle = this.$;
    	   domEle.body.style.paddingTop = sheight;
    	   domEle.sectionIntro.style.height = sheight;
	       
    	   if (width <= 781) {
    		   var bodyClass = crossClassList(domEle.body);
		   
    		   if(bodyClass.contains("scrolling")){
    			   bodyClass.remove("scrolling");
    			   this.parallax.core(1,0,this.$.sectionPhoto);
        		   this.parallax.core(1,0,this.$.sectionGridOuter,1);
        		   domEle.sectionIntro.style.display = 'block';
    		   }
    		   bodyClass.add("mobile");
    		   _setActive(domEle.location);
    		   domEle._cacheStatusEle['location'] = true;
    		   this.parallax.state = false;
    		   
    		   makeATour = makeATour || cssSelector("#tourInside");
    		   destroyTour = destroyTour || cssSelector("#closeTour");
    		   aEventListener(makeATour,'click',activeTour);
    		   aEventListener(destroyTour,'click',closeTour)
    		   this.update = this.mobileResize;
		   
	       	   
	       	}
       	},
       	mobileResize: function mobileResize(){
       		console.log("mobile");
       		if(this.px.innerWidth > 781){
       			crossClassList(this.$.body).remove("mobile");
	       		this.parallax.state = true;
	       		rEventListener(makeATour,activeTour);
	       		rEventListener(destroyTour,closeTour);
	       		this.update = this.desktopResize;
       		}
       	},
       	init: function () {
           this._update = update_.bind(this);
           this._requestTick = requestTick_.bind(this);
           this.resize = onresize_.bind(this);
           this.update = this.desktopResize;
           this.resize();
           
           aEventListener(obj.global, "resize", this.resize);
           delete(this.init);
       }
   };
   
   /*
    * dropdown panel in the sidebar for mobile
    */
   var dropdownToggle = cssSelector("#dropdown-toggle")
     ,dropdownPanel = cssSelector(".dropdown-panel");
			    
   dropdownPanel.openPanel = function openPanel() {
    this.setAttribute("open","");
    this.open = "open";
   };
   dropdownToggle && aEventListener(dropdownToggle,"click",function(e){
     dropdownPanel.openPanel();
   });
			    
   /*
    * Extend Scrolling area coping some prop from 
    * ResizeArea
    */
			    
   scrollingArea = obj.Class.extendByCopy(resizeArea,scrollingArea,['$','px','parallax']);
  
   /*
    * Add reference to location section
    */
   var arrayNodeServices = obj.ArrayUtility.collectionToArray(
    cssSelectorAll("#catalog .mobile-is-hidden .service-title-0"));
   
   scrollingArea.$.catalogServices = arrayNodeServices;
			    
   /*
    * AppBar Object
    */
   var appBar = cssSelector("#app-bar");
   appBar.$ = {
    search: cssSelector("#app-bar .search")
   };
   appBar.searchOn = false;
   appBar.toggleSearch = function toggleSearch(e) {
    var id = e.target.getAttribute("id");
       console.log("inside search");
   if ( id !== "search-google" && id !== "reset-button"){
     appBar.searchOn = !appBar.searchOn ? true : false; 
     crossClassList(this).toggle("search-on",appBar.searchOn);
     attributeToggle(this.$.search,"show",appBar.searchOn);
    }
   };
   appBar && aEventListener(appBar.$.search,'click',function(e){
    appBar.toggleSearch(e);
   });
   //
   // Event Callback function
   //
   /*function gestureEvent(evt) {
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
   }*/

        // Add Event Listenrs
   //aEventListener(jb, 'click', gestureEvent);
   //aEventListener(mask_modal, 'click', gestureEvent);
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
   
   aEventListener(fab_one,'click',function(e){
        if(!first_click){
            crossClassList(e.currentTarget).add("pressed");
            crossClassList(picFrame).add("hidden");
            crossClassList(photoSphere).add("active");
            first_click = true;
        } else {
            crossClassList(picFrame).remove("hidden");
            crossClassList(photoSphere).remove("active");
            crossClassList(picFrame).remove("hidden");
            first_click = false;
        }
    });
   
    /* If the panel it's active or the search-bar it's active
     * and you click on the document this function will close them.
     */
   
    aEventListener(obj.doc,"click",function(e){
     if (dropdownPanel.open){
      dropdownPanel.removeAttribute(dropdownPanel.open);
      dropdownPanel.open = null;
     }
     if (appBar.searchOn) {
      appBar.toggleSearch(e);
     }
     
    }, true);
    //
    //
    //Raise nav bar if the page is scrolled
    resizeArea.init();
    scrollingArea.init(); 
    // Clear unuseful Dom Object
    dropdownToggle = null;
    obj.PaperMaker('button',{ element: cssSelectorAll(".paper-fab")[0]});
    obj.PaperMaker.MakePaperLive();
    });
}());

