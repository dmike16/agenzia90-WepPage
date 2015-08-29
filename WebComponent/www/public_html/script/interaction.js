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
       	this.px.innerHeight = obj.global.innerHeight;
	this.px.innerWidth = obj.global.innerWidth;
	this.px.calculate();
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
   ,jb = cssSelector("button.paper-fab")
   ,arrowHint = cssSelector(".section-intro .arrow-hint")
   ,photoCrop = cssSelector(".section-base .photo-crop")
   ,bus = cssSelector("#location .bus p")
   ,car = cssSelector("#location .car p")
   ,middleTarget = cssSelector("#location .middle-target")
   ,fab_one = cssSelectorAll(".paper-fab")[1]
   ,photoSphere = cssSelector("#PhotoSphere")
   ,picFrame = cssSelector(".picture-frame");
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
	 sectionGridOuter: cssSelector(".section-intro .primary-block")
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
	* It's the function tha handle the on scroll animation
	*/
       update: function () {
	var lscroll = this.lastScroll
	,ihh = this.px.innerHeight;
	if (lscroll < ihh || !this.firstScroll) {
         if (lscroll > 0 && !this.firstScroll) {
          this.firstScroll = true;
          this.handleDynamicElement();
	  this.activeElementWhenScrolledToLim("catalogServices",this.px.pages[2],_setActive);
	  this.activeElementWhenScrolledToLim("location",this.px.pages[3],_setActive);
	  
         } else if (lscroll === 0 && this.firstScroll) {
          this.firstScroll = false;
          this.handleDynamicElement();
         }
         
         var section = this.$.sections[0]
	 ,content = this.$.sectionGridOuter;
	 
         if (lscroll >= this.px.pages[0] && !this.tirth) {
          var qhh = -ihh/5;
          section.style.transform="translate3d(0px," + qhh +"px,0px)";
          content.style.opacity="0.01";
          this.tirth = true;
         } else if (lscroll < this.px.pages[0] && this.tirth) {
          section.style.transform="translate3d(0px, 0px,0px)";
          content.style.opacity="1.0";
          this.tirth = false;
         }
	       
         if (photoCrop !== null) {
          if (lscroll >= this.px.pages[1]){
           this.$.body.dispatchEvent(new Event('scrolledIntroPage'));
          }
         }
          } else if (!this._allActive) {
           if(!this.$._cacheStatusEle['catalogServices']){
             this.activeElementWhenScrolledToLim("catalogServices",this.px.pages[2],_setActive);
            
           } else if (!this.$._cacheStatusEle['location']){
             this.activeElementWhenScrolledToLim("location",this.px.pages[3],_setActive);
            }
          }
       },
       handleDynamicElement: function () {
        var fs = this.firstScroll;
        crossClassList(this.$.body).toggle("scrolling",fs);
        crossClassList(jb).toggle("active",fs);
        crossClassList(arrowHint).toggle("deactive",fs);
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
           sections: cssSelectorAll("section"),
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
	  this.pages[0] = this.innerHeight/3;
	  
	  var portion = 0.8;
	  this.pages[1] = this.innerHeight * portion;
	  
	  /*
	   * The Other pages have a min-heigh value of 610px;
	   */
	   var currentHeight =  (this.innerHeight < 610)? 610: this.innerHeight;
	   this.pages[2] = (this.innerHeight + currentHeight)*portion;
	   this.pages[3] = (this.innerHeight + 2*currentHeight)*portion;
	  
	  }
       },
       ticking: false,
       update: function () {
           var height = this.px.innerHeight
           ,sheight = height + "px"
	   ,width = this.px.innerWidth
           ,sections = this.$.sections
           ,fsection = sections[0];
           this.$.body.style.paddingTop = sheight;
           for (var i = 0, len = sections.length; i < len; i++) {
               sections[i].style.height = sheight;
           }
           if (height <= 350) {
               var qheight = -height/4;
               fsection.style.webkitTransform = "translate3d(0px,"+ qheight +"px,0px)";
               fsection.style.transform = "translate3d(0px,"+ qheight +"px,0px)";
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
     console.log("drop");
   });
			    
   /*
    * Extend Scrolling area coping some prop from 
    * ResizeArea
    */
			    
   scrollingArea = obj.Class.extendByCopy(resizeArea,scrollingArea,['$','px']);
   
   /*
    * Add reference to catalog and location section
    */
   var catalog = cssSelector("#catalog");
   var arrayNodeServices = obj.ArrayUtility.collectionToArray(
    cssSelectorAll("#catalog .service-title-0"));
   
   arrayNodeServices.push(catalog);
   scrollingArea.$.catalogServices = arrayNodeServices;
   
   scrollingArea.$.location = cssSelectorAll("#location .map");
   scrollingArea.$._cacheStatusEle = {
     'catalogServices': false,
    'location' : false
   };
			    
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
   if ( id !== "search-google" && id !== "reset-button"){
     appBar.searchOn = appBar.searchOn ? false : true; 
     crossClassList(this).toggle("search-on",appBar.searchOn);
     attributeToggle(this.$.search,"show",appBar.searchOn);
     e.stopPropagation();
    }
   };
   appBar && aEventListener(appBar,'click',function(e){
    appBar.toggleSearch(e);
   });
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
    
    aEventListener(obj.doc,"click",function(e){
     if (dropdownPanel.open){
      dropdownPanel.removeAttribute(dropdownPanel.open);
      dropdownPanel.open = null;
     }
     console.log(e.target);
     if (appBar.searchOn) {
      appBar.toggleSearch(e);
      }
     
    }, true);
    //
    //
    //Raise nav bar if the page is scrolled
    scrollingArea.init();            
    resizeArea.init();
    //
    // Clear unuseful Dom Object
    bus = null;
    car = null;
    dropdownToggle = null;
    obj.PaperMaker('button',{ element: fab_one});
    obj.PaperMaker('button',{ element: cssSelectorAll(".paper-fab")[0]});
    obj.PaperMaker.MakePaperLive();
    });
}());

