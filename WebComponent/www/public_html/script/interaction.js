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
    /*
    * Apply function used to set a inline style to a DOM object
    * Argument: domObj, css Prop , css Style, array prefix['webkit',...]
    */
    function _apply(ele, prop, style, prefix){
      var domEle = ele;

      if(prefix){
        if(!obj.ArrayUtility.isArray(prefix)){
          throw new Error("The 4th parameter must be an Array of string:['webkit',moz,...]");
        }
        var broswerStyle ='';
        var Prop = prop.replace(/^[a-z]/,function javaNameStyle(match){
          return match.toUpperCase();
        });


        for(var j = 0,len = prefix.length; j < len; j++){
          if (typeof prefix[j] !== 'string'){
            continue;
          }
          broswerStyle = prefix[j]+Prop;
          domEle.style[broswerStyle] = style;
        }
      }
      domEle.style[prop] = style;
    }
   //
   // Dependencies
   var cssSelector = obj.doc.querySelector.bind(obj.doc)
   ,cssSelectorAll = obj.doc.querySelectorAll.bind(obj.doc)
   ,crossClassList = obj.ClassList
   ,aEventListener = obj.EventUtility.aboutHandler.addListener
   ,rEventListener = obj.EventUtility.aboutHandler.removeListener
   ,Interface  = obj.Class.Interface
   ,collectionToArray = obj.ArrayUtility.collectionToArray;
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
   ,destroyTour = null
   ,slide = null;
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
<<<<<<< HEAD
	,bodyClass = crossClassList(ele.body);

=======
	       ,bodyClass = crossClassList(ele.body);

>>>>>>> 556cf1d... ADD THE Clikck event on pagiantion link to slide the service in the mobile
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
           slide = slide || new SlideControl(cssSelector('#catalog .tab-list'));
           slide.active();
    		   aEventListener(makeATour,'click',activeTour);
    		   aEventListener(destroyTour,'click',closeTour)
    		   this.update = this.mobileResize;


	       	}
       	},
       	mobileResize: function mobileResize(){

       		if(this.px.innerWidth > 781){
       			crossClassList(this.$.body).remove("mobile");
	       		this.parallax.state = true;
	       		rEventListener(makeATour,activeTour);
	       		rEventListener(destroyTour,closeTour);
	       		this.update = this.desktopResize;
            slide.deactive();
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
   var arrayNodeServices = collectionToArray(
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
   // Slide-control
   //
<<<<<<< HEAD
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
=======
   //Interface implement by slide item and link pagination
   var Slides = new Interface("Slides",['slideON','slideOFF','fitSlide',
                              'fitSlideOff','fitPlusSlide']);
   /*
   * Slide Items Object
   */
   function SlideItem(items){ //Implement Slides
     if (!(this instanceof SlideItem)){
       return new SlideItem(items);
     }
     this.$ = collectionToArray(items);
   }
   SlideItem.prototype = {
     slideON: function slideON(id_on){
       var items = this.$;
       var matrix = 'matrix(1,0,0,1,0,0)';
       var z_index = '10';

       items[id_on].style.zIndex = z_index;
       items[id_on].style.webkitTransform = matrix;
       items[id_on].style.transform = matrix;

     },
     slideOFF: function slideOFF(id_off){
       var items = this.$;
       var opacity = '0';
       var z_index = '0';

       items[id_off].style.opacity = opacity;
       items[id_off].style.zIndex = z_index;
     },
     fitSlide: function fitSlide(id_fit,xOffSet){
       var items = this.$;
       var opacity = '1';
       var matrix = 'matrix(1,0,0,1,'+ xOffSet +',0)';

       items[id_fit].style.opacity = opacity;
       items[id_fit].style.webkitTransform = matrix;
       items[id_fit].style.transform = matrix;
     },
     fitSlideOff: function fitSlideOff(id_fit_off){
       var items = this.$;
       var opacity = '0';
       var matrix = 'matrix(1,0,0,1,0,0)';

       items[id_fit_off].style.opacity = opacity;
       items[id_fit_off].style.webkitTransform = matrix;
     },
     fitPlusSlide: function(id){
       this.fitSlide(id);
       this.slideON(id);
     }
   };
   /*
    * Link Pagination Object
    */
    function Pagination(li){ //Implement slides
      if (!(this instanceof Pagination)){
        return new Pagination(items);
      }
      this.$ = collectionToArray(li);
    }
    Pagination.prototype = {
      slideON: function slideON(id_on){
        crossClassList(this.$[id_on]).add('active');
      },
      slideOFF: function slideOFF(id_off){
        crossClassList(this.$[id_off]).remove('active');
      },
      fitSlide: function fitSlide(id){
        return;
      },
      fitSlideOff: function fitSlideOff(id){
        return;
      },
      fitPlusSlide: function fitPlusSlide(id){
        return;
      }
    };
   function SlideControl(container){
     if (!(this instanceof SlideControl) ){
       return new SlideControl(ele);
     }
     this.$ = {
       slideControl: container.querySelector(".slide-control"),
       a: collectionToArray(container.querySelectorAll('ul li .slides-pagination-link'))
     };
     this.items = new SlideItem(container.querySelectorAll('.slide-control .slides-item'));
     this.pagination = new Pagination(container.querySelectorAll('ul li'));
     this.items.fitSlide(1,980);
     this._id = {
       'active': 0,
       'fit': 1
     };
     
     this.frame = obj.AnimateObject();
     this.frame.step = function step(p){
       var v = step.a*(1-p);
       var ele = step.ele;

       ele.style.webkitTransform = 'matrix(1,0,0,1,'+v+',0)';
       ele.style.transform = 'matrix(1,0,0,1,'+v+',0)';
     };
     this.frame.step.a = -980;
     this.frame.step.ele = this.$.slideControl;
     this.frame.id = 0;

   }
   SlideControl.prototype = {
     active: function active(){
       var link = this.$.a;
       this.click = this.click.bind(this);

       for (var i = link.length -1; i >= 0 ;i--){
         aEventListener(link[i],'click',this.click);
       }
     },
     deactive: function deactive(){
       var link = this.$.a;
       for(var i = link.length -1; i >=0; i--){
         rEventListener(link[i],'click',this.click);
       }
     },
     click: function click(e){
       e.preventDefault();
       var clicked = e.target;
       var dataItem = parseInt(clicked.getAttribute('data-item'));
       var id_active = this._id['active'];
       var id_fit = this._id['fit'];
       var style = " ";
       var v = 0,i = 0;
       var nextFit = (dataItem < this.items.$.length-1)? dataItem+1:0;


       if (dataItem === id_active){
         return;
       } else {
         this.items.slideOFF(id_active);
         this.pagination.slideOFF(id_active);
         this.pagination.slideON(dataItem);
         obj.animatedFrame.cancel(this.frame.id);
         this.frame.step.a = 980*(id_active-dataItem)/Math.abs(dataItem-id_active);

         this.frame.startAnimate();

         if (dataItem === id_fit){
           this.items.slideON(dataItem);
         } else {
           this.items.fitPlusSlide(dataItem);
           this.items.fitSlideOff(id_fit);
         }
         this.items.fitSlide(nextFit,980);
         this._id['fit'] = nextFit;
         this._id['active'] = dataItem;
       }
     }
   };
   //End SlideControl Constructor

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
            crossClassList(e.currentTarget).remove("pressed");
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
        /*
         * Canvas Test
         */
        var canvas = {
            $: document.getElementById("tutorial"),
            planet:{
              'sun': new Image(),
              'moon': new Image(),
              'earth': new Image()
            },
            roundRect: function roundRect(ctx, x, y, width, height, radius){
                ctx.beginPath();
                ctx.moveTo(x,y+radius);
                ctx.lineTo(x,y+height-radius);
                ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
                ctx.lineTo(x+width-radius, y+height);
                ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
                ctx.lineTo(x+width,y+radius);
                ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
                ctx.lineTo(x+radius,y);
                ctx.quadraticCurveTo(x,y,x,y+radius);
                ctx.stroke();
            },
            drawStar: function(ctx,r){
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(r,0);
              for (var i = 0; i < 9; i++){
                ctx.rotate(Math.PI/5);
                if (i%2 === 0){
                  ctx.lineTo((r/0.525731)*0.200811,0);
                } else{
                  ctx.lineTo(r,0);
                }
              }
              ctx.closePath();
              ctx.fill();
              ctx.restore();
            },
            draw: function(){
                if (this.$.getContext){
                    var ctx = this.$.getContext('2d');

                    //ctx.fillStyle = "rgb(200,0,0)";
                    //ctx.fillRect(10, 10, 55, 50);

                    //ctx.fillStyle="rgba(0, 0, 200, 0.5)";
                    //ctx.clearRect(30, 30, 55, 50);
                    //ctx.strokeRect(45, 45, 55, 50);

                    // Triangle
                    //var path = new Path2D();
                    //path.moveTo(75,50);
                    //path.lineTo(100,75);
                    //path.lineTo(100,25);
                    //ctx.fill(path);

                    //Smile Face
                    //var path = new Path2D();
                    //path.arc(75,75,50,0,Math.PI*2,true); // Outer circle
                    //path.moveTo(110,75);
                    //path.arc(75,75,35,0,Math.PI,false);  // Mouth (clockwise)
                    //path.moveTo(65,65);
                    //path.arc(60,65,5,0,Math.PI*2,true);  // Left eye
                    //path.moveTo(95,65);
                    //path.arc(90,65,5,0,Math.PI*2,true);  // Right eye
                    //ctx.stroke(path);

                    //12 arc
                    /*for(var i = 0; i < 4; i++){
                        for(var j = 0;j < 3; j++){
                            var path = new Path2D()
                            ,x = 25 + j*50
                            ,y = 25 + i*50
                            ,radius = 20
                            ,startAngle = 0
                            ,endAngle = Math.PI + (Math.PI*j)/2
                            ,anticlockwise = i%2 === 0 ? false: true;

                            path.arc(x, y, radius, startAngle, endAngle, anticlockwise);

                            if (i > 1){
                                ctx.fill(path);
                            } else {
                                ctx.stroke(path);
                            }

                        }
                    }*/
                    //QuadraticCurve
                    /*var path = new Path2D();
                    path.moveTo(75,25);
                    path.quadraticCurveTo(25,25,25,62.5);
                    path.quadraticCurveTo(25,100,50,100);
                    path.quadraticCurveTo(50,120,30,125);
                    path.quadraticCurveTo(60,120,65,100);
                    path.quadraticCurveTo(125,100,125,62.5);
                    path.quadraticCurveTo(125,25,75,25);
                    ctx.stroke(path);*/

                    //BeizerCurve
                    /*var path = new Path2D();
                    path.moveTo(75,40);
                    path.bezierCurveTo(75,37,70,25,50,25);
                    path.bezierCurveTo(20,25,20,62.5,20,62.5);
                    path.bezierCurveTo(20,80,40,102,75,120);
                    path.bezierCurveTo(110,102,130,80,130,62.5);
                    path.bezierCurveTo(130,62.5,130,25,100,25);
                    path.bezierCurveTo(85,25,75,37,75,40);
                    ctx.fill(path);*/

                    //Pacman Table
                    /*this.roundRect(ctx, 12, 12, 150, 150, 15);
                    this.roundRect(ctx,19,19,150,150,9);
                    this.roundRect(ctx,53,53,49,33,10);
                    this.roundRect(ctx,53,119,49,16,6);
                    this.roundRect(ctx,135,53,49,33,10);
                    this.roundRect(ctx,135,119,25,49,10);

                    ctx.beginPath();
                    ctx.arc(37,37,13,Math.PI/7,-Math.PI/7,false);
                    ctx.lineTo(31,37);
                    ctx.fill();

                    for(var i=0;i<8;i++){
                        ctx.fillRect(51+i*16,35,4,4);
                    }

                    for(i=0;i<6;i++){
                        ctx.fillRect(115,51+i*16,4,4);
                    }

                    for(i=0;i<8;i++){
                        ctx.fillRect(51+i*16,99,4,4);
                    }

                    ctx.beginPath();
                    ctx.moveTo(83,116);
                    ctx.lineTo(83,102);
                    ctx.bezierCurveTo(83,94,89,88,97,88);
                    ctx.bezierCurveTo(105,88,111,94,111,102);
                    ctx.lineTo(111,116);
                    ctx.lineTo(106.333,111.333);
                    ctx.lineTo(101.666,116);
                    ctx.lineTo(97,111.333);
                    ctx.lineTo(92.333,116);
                    ctx.lineTo(87.666,111.333);
                    ctx.lineTo(83,116);
                    ctx.fill();

                    ctx.fillStyle = "white";
                    ctx.beginPath();
                    ctx.moveTo(91,96);
                    ctx.bezierCurveTo(88,96,87,99,87,101);
                    ctx.bezierCurveTo(87,103,88,106,91,106);
                    ctx.bezierCurveTo(94,106,95,103,95,101);
                    ctx.bezierCurveTo(95,99,94,96,91,96);
                    ctx.moveTo(103,96);
                    ctx.bezierCurveTo(100,96,99,99,99,101);
                    ctx.bezierCurveTo(99,103,100,106,103,106);
                    ctx.bezierCurveTo(106,106,107,103,107,101);
                    ctx.bezierCurveTo(107,99,106,96,103,96);
                    ctx.fill();

                    ctx.fillStyle = "black";
                    ctx.beginPath();
                    ctx.arc(101,102,2,0,Math.PI*2,true);
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(89,102,2,0,Math.PI*2,true);
                    ctx.fill();*/

                    //Linear Gradient
                    /*var linGrad = ctx.createLinearGradient(0,0,0,150);
                    linGrad.addColorStop(0,'#00ABEB');
                    linGrad.addColorStop(0.5,'#fff');
                    linGrad.addColorStop(0.5,'#26C000');
                    linGrad.addColorStop(1,'#fff');

                    var lingrad2 = ctx.createLinearGradient(0,50,0,95);
                    lingrad2.addColorStop(0.5, '#000');
                    lingrad2.addColorStop(1, 'rgba(0,0,0,0)');

                    ctx.fillStyle = linGrad;
                    ctx.strokeStyle = lingrad2;

                    ctx.fillRect(10,10,130,130);
                    ctx.strokeRect(50,50,50,50);
                    */

                    //Text
                    /*ctx.font = "48px serif";
                    ctx.fillStyle="rgb(23,13,250)";
                    ctx.shadowOffsetX = 2;
                    ctx.shadowOffsetY = 2;
                    ctx.shadowBlur = 2;
                    ctx.shadowColor = "rgba(0,0,0,0.35)";
                    ctx.fillText("Hello World", 10, 50);
                    ctx.strokeText("Hello World",10,100);
                    */

                    //Image
                    /*var img = new Image();
                    img.onload = function(){
                      ctx.drawImage(img,0,0,100,100);
                      ctx.beginPath();
                      ctx.moveTo(30,96);
                      ctx.lineTo(70,66);
                      ctx.lineTo(103,76);
                      ctx.stroke();
                    };
                    img.src = "images/entryA90.svg";*/

                    //Transformtion
                    /*for (var i=0; i < 3; i++){
                      for(var j=0;j<3;j++){
                        ctx.save();
                        ctx.fillStyle = 'rgb('+(51*i)+','+(255-51*i)+',255)';
                        ctx.translate(10+j*50,10+i*50);
                        ctx.fillRect(0,0,25,25);
                        ctx.restore();
                      }
                    }
                    ctx.save();
                    ctx.scale(10,3);
                    ctx.fillRect(1,0,10,10);
                    ctx.restore();

                    ctx.scale(-1,1);
                    ctx.font = "48px serif";
                    ctx.fillText("MDN", -135,120);*/

                    //Clip path
                    /*ctx.fillRect(0,0,150,150);
                    ctx.translate(75,75);
                    ctx.beginPath();
                    ctx.arc(0,0,60,0,Math.PI*2,true);
                    ctx.clip();

                    var linGrad = ctx.createLinearGradient(0,-75,0,75);
                    linGrad.addColorStop(0, '#232256');
                    linGrad.addColorStop(1, '#143778');
                    ctx.fillStyle = linGrad;
                    ctx.fillRect(-75,-75,150,150);

                    for (var i = 0; i < 50 ; i++){
                      ctx.save();
                      ctx.fillStyle = '#fff';
                      ctx.translate(75-Math.floor(Math.random()*150),
                                    75-Math.floor(Math.random()*150));
                      this.drawStar(ctx,Math.floor(Math.random()*4)+2);
                      ctx.restore();

                    }*/
                    // Animation In Canvas
                    /*ctx.globalCompositeOperation = 'destination-over';
                    ctx.clearRect(0,0,300,150);
                    ctx.fillStyle = 'rgba(0,0,0,0.4)';
                    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
                    ctx.save();
                    ctx.translate(150,75);

                    var time = new Date();
                    ctx.rotate((2*Math.PI/60)* time.getSeconds() +
                              (2*Math.PI/60000)*time.getMilliseconds());
                    ctx.translate(105,0);
                    ctx.fillRect(0,-12,50,24);
                    ctx.drawImage(this.planet['earth'],-12,-12);

                    ctx.save();
                    ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() +
                              ((2*Math.PI)/6000)*time.getMilliseconds() );
                    ctx.translate(0,28.5);
                    ctx.drawImage(this.planet['moon'],-3.5,-3.5);
                    ctx.restore();
                    ctx.restore();

                    ctx.beginPath();
                    ctx.arc(150,75,105,0,Math.PI*2,false);
                    ctx.stroke();
                    ctx.drawImage(this.planet['sun'],0,0,300,150);*/

                    var now = new Date();
                    ctx.save();
                    ctx.clearRect(0,0,150,150);
                    ctx.translate(75,75);
                    ctx.scale(0.4,0.4);
                    ctx.rotate(-Math.PI/2);
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = "white";
                    ctx.lineWidth = 8;
                    ctx.lineCap = "round";

                    ctx.save();
                    for (var i = 0; i<12 ;i++){
                      ctx.beginPath();
                      ctx.rotate(Math.PI/6);
                      ctx.moveTo(100,0);
                      ctx.lineTo(120,0);
                      ctx.stroke();
                    }
                    ctx.restore();

                    ctx.save();
                    ctx.lineWidth = 5;
                    for( var j = 0; j<60; j++){
                      if(j%5 !== 0){
                        ctx.beginPath();
                        ctx.moveTo(117,0);
                        ctx.lineTo(120,0);
                        ctx.stroke();
                      }
                      ctx.rotate(Math.PI/30);
                    }
                    ctx.restore();

                    var sec = now.getSeconds();
                    var min = now.getMinutes();
                    var hr = now.getHours();

                    hr = hr >= 12 ? hr-12 : hr;

                    ctx.fillStyle = "black";

                    ctx.save();
                    ctx.rotate(hr*(Math.PI/6)+(Math.PI/360)*min +
                              (Math.PI/21600)*sec);
                    ctx.lineWidth = 14;
                    ctx.beginPath();
                    ctx.moveTo(-20,0);
                    ctx.lineTo(80,0);
                    ctx.stroke();
                    ctx.restore();

                    ctx.save();
                    ctx.rotate(min*(Math.PI/30)+(Math.PI/1800)*sec);
                    ctx.lineWidth = 10;
                    ctx.beginPath();
                    ctx.moveTo(-28,0);
                    ctx.lineTo(112,0);
                    ctx.stroke();
                    ctx.restore();

                    ctx.save();
                    ctx.rotate(sec * Math.PI/30);
                    ctx.strokeStyle = "#D40000";
                    ctx.fillStyle = "#D40000";
                    ctx.lineWidth = 6;
                    ctx.beginPath();
                    ctx.moveTo(-30,0);
                    ctx.lineTo(83,0);
                    ctx.stroke();
                    ctx.restore();
                    ctx.restore();


                    obj.animatedFrame.request(this._draw);



                }
            },
            init: function(){
              /*this.planet['sun'].src = 'images/Canvas_sun.png';
              this.planet['moon'].src = 'images/Canvas_moon.png';
              this.planet['earth'].src = 'images/Canvas_earth.png';*/
              this._draw = this._draw || this.draw.bind(this);

              obj.animatedFrame.request(this._draw);
            }
        };
    //
    //
    //Raise nav bar if the page is scrolled
    resizeArea.init();
    scrollingArea.init();
        canvas.init();
        
    // Clear unuseful Dom Object
    dropdownToggle = null;
    obj.PaperMaker('button',{ element: cssSelectorAll(".paper-fab")[0]});
    obj.PaperMaker.MakePaperLive();
    });
}());
