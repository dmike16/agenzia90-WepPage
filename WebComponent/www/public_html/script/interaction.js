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
   ,photoSphere = cssSelector("#PhotoSphere")
   ,picFrame = cssSelector(".picture-frame")
   ,makeATour = null
   ,destroyTour = null
   ,slide = null;
   
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
        catalogServices: collectionToArray(
          cssSelectorAll("#catalog .mobile-is-hidden .service-title-0")),
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
  var ele = this.$,bodyClass = crossClassList(ele.body);
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
  aEventListener(destroyTour,'click',closeTour);
  this.update = this.mobileResize;
}
},
mobileResize: function mobileResize(){
  var px = this.px;
  var width = px.innerWidth;
  var sh = px.innerHeight + "px";
  var domEle = this.$;

  domEle.body.style.paddingTop = sh;
  domEle.sectionIntro.style.height = sh;

  if(width > 781){
    crossClassList(this.$.body).remove("mobile");
    this.parallax.state = true;
    rEventListener(makeATour,activeTour);
    rEventListener(destroyTour,closeTour);
    makeATour = null;
    destroyTour = null;
    slide.deactive();
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
       var input = this.$.search.querySelector('#search-google');
       if (appBar.searchOn){
         input.focus();
       } else {
         input.blur();
       }
     }
   };
   appBar && aEventListener(appBar.$.search,'click',function(e){
    appBar.toggleSearch(e);
  });
   /*
   *  Button To Go inside
   */
   var fab_one = cssSelectorAll(".paper-fab")[1];

   fab_one.clicked = false;
   aEventListener(fab_one,'click',function(e){
     var btt = e.currentTarget;
     if(!btt.clicked){
      crossClassList(btt).add("pressed");
      crossClassList(picFrame).add("hidden");
      crossClassList(photoSphere).add("active");
      btt.clicked = true;
    } else {
      crossClassList(btt).remove("pressed");
      crossClassList(photoSphere).remove("active");
      crossClassList(picFrame).remove("hidden");
      btt.clicked = false;
    }
  });
   fab_one = null;
   //
   // Slide-control
   //
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
    events: obj.EventUtility.touchEvent,
    active: function active(){
     var link = this.$.a;
     var slideControl = this.$.slideControl;
     this._currentPos = 0;
     this._click = this.click.bind(this);
     this._gestureStart = this.gestureStart.bind(this);
     this._gestureEnd = this.gestureEnd.bind(this);
     this._gestureMove = this.gestureMove.bind(this);

     for (var i = link.length -1; i >= 0 ;i--){
       aEventListener(link[i],'click',this._click);
     }
     aEventListener(slideControl,this.events.start,this._gestureStart);
     aEventListener(slideControl,this.events.move,this._gestureMove);
     aEventListener(slideControl,this.events.end,this._gestureEnd);
     aEventListener(slideControl,this.events.cancel,this._gestureEnd);
   },
   deactive: function deactive(){
     var link = this.$.a;
     var slideControl = this.$.slideControl;

     for(var i = link.length -1; i >=0; i--){
       rEventListener(link[i],'click',this._click);
     }
     rEventListener(slideControl,this.events.start,this._gestureStart);
     rEventListener(slideControl,this.events.move,this._gestureMove);
     rEventListener(slideControl,this.events.end,this._gestureEnd);
     rEventListener(slideControl,this.events.cancel,this._gestureEnd);

     this._click = null;
     this._gestureStart = null;
     this._gestureMove = null;
     this._gestureEnd = null;
     this._currentPos = null;

     delete this._click;
     delete this._gestureStart;
     delete this._gestureMove;
     delete this._gestureEnd;
     delete this._currentPos;
   },
   click: function click(e){
     e.preventDefault();
     var clicked = e.target;
     var dataItem = parseInt(clicked.getAttribute('data-item'));

     this.updatePosition(dataItem);
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
   },
   gestureStart: function gestureStart(e){

    if (e.touches && e.touches.length > 1){
      return;
    }

    if (!this._initialPos){
      this._initialPos = this.getPointFromEvent(e);
    }

    if (!this._onMovingAnim){
      this._onMovingAnim = this.onMovingAnim.bind(this);
    }

    console.log("start");
  },
  gestureEnd: function gestureEnd(e){

    if (e.touches && e.touches.length > 0){
      return;
    }


    this.updatePosition();

    this._initialPos = null;
    this._onMovingAnim = null;
    this._lastPos = null;
    this._isAnimating = false;

    console.log("end");
  },
  gestureMove: function gestureMove(e){

    this._lastPos = this.getPointFromEvent(e);

    if (this._isAnimating){
      return;
    }

    this._isAnimating = true;

    obj.animatedFrame.request(this._onMovingAnim);

    console.log("move");
  },
  getPointFromEvent: function getPointFromEvent(e){
    var point = {};

    if (e.targetTouches) {
      point.x = e.targetTouches[0].clientX;
      point.y = e.targetTouches[0].clientY;
    } else {
      point.x = e.clientX;
      point.y = e.clientY;
    }

    return point;
  },
  onMovingAnim: function onMovingAnim(){
    if(!this._isAnimating){
      return;
    }

    var diff = this._initialPos.x - this._lastPos.x;
    var transformX = (this._currentPos - diff);
    var matriX = "matrix(1,0,0,1," + transformX + ",0)";

    _apply(this.$.slideControl, "transform", matriX, ['webkit']);

    this._isAnimating = false;
  },
  updatePosition: function updatePosition(){
    var active = this._id['active'];
    var fit = this._id['fit'];
    var items = this.items;
    var pagination = this.pagination;
    var step = (this._initialPos.x - this._lastPos.x);
    var direction = step / Math.abs(step);

    if (direction === 0) {
      return;
    }
    
    obj.animatedFrame.cancel(this.frame.id);
    this.frame.step.a = 980*direction;
    this.frame.startAnimate();

    items.slideOFF(active);
    pagination.slideOFF(active);

    active += direction;
    active = this.checkBoundary(active);

    if (active === fit){
      items.slideON(active);
    } else {
     items.fitPlusSlide(active);
     items.fitSlideOff(fit); 
   }
   pagination.slideON(active);

   fit = active + 1;
   fit = this.checkBoundary(fit);
   items.fitSlide(fit,980);

   this._id['active'] = active;
   this._id['fit'] = fit;

 },
 checkBoundary: function checkBoundary(fx){
  if (fx >= this.items.$.length){
    fx = 0;
  } else if (fx < 0 ){
    fx = this.items.$.length -1;
  }

  return fx;
}
};
   //End SlideControl Constructor

        // Add Event Listenrs
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
