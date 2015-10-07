/**
 * This my application SandBox constructor
 * @class UtilityBuild
 * @constructor
 */
var UtilityBuild = (function () {
/**
 * This contains the modules on which is based my lib
 * @property modules
 * @type object
 */
    var modules = {}
    ,_UtilityBuild;
/**
 * This module rappresent my personal utility, that i use to develop
 * my web sites
 *
 * @module dmUtil
 */
    modules.dmUtil = function (_self) {
	//Pollify Bind Func
	(function crossFuncUtilities() {
     	"use strict";
	    if (typeof Function.prototype.bind === "undefined") {
	    Function.prototype.bind = function bind(this_arg) {
            var f_to_bind = this
	        ,slice = Array.prototype.slice
	    	,args = slice.call(arguments, 1)
            ,fbound = function () {
            if (this instanceof fbound) {
                f_to_bind.apply(this, args.concat(slice.call(arguments)));
            } else {
    	        return f_to_bind.apply(this_arg,args.concat(slice.call(arguments)));
            }
            };
            fbound.prototype = Object.create(f_to_bind.prototype);
            return fbound;
		};
	}
    }());
    //Merge Sort Algoritm in iterative form
        (function mergeSort(){
            "use strict";
            if(typeof Array.prototype.mergeSort === "undefined"){
                Array.prototype.mergeSort = function _mergeSort(){

                };
            }
        }());
        // Emalutaing Class Functionalities like Interface and SubClass
        _self.Class = function () {
            /*
            Implements Interface For JavaScript from book "ProJavaScriptPattern"
             */
            var _Interface = function Interface(name, methods) {
                if (arguments.length != 2) {
                    throw new Error("Interface constructor called with " + arguments.length +
                        "arguments, but expected exaclty 2");
                }
                if(!(this instanceof Interface)){
                    return new Interface(name,methods);
                }

                this.name = name;
                this.methods = [];
                for (var i = 0, len = methods.length; i < len; i++) {
                    if (typeof methods[i] !== 'string') {
                        throw new Error("Interface constructor expects method names to be string");
                    }
                    this.methods.push(methods[i]);
                }
            };
            _Interface.ensureImplements = function ensureImplements(object) {
                if (arguments.length < 2) {
                    throw new Error("Function Interface,ensureImplements called with" +
                        arguments.length + " arguments, but expected at least 2");
                }

                for (var i = 1, len = arguments.length; i < len; i++) {
                    var interface = arguments[i];
                    if (interface.constructor !== Interface) {
                        throw new Error("Function expects arguments to be istances of Interface");
                    }

                    for (var j = 0, mLen = interface.methods.length; j < mLen; j++) {
                        var method = interface.methods[j];
                        if (!object[method] || typeof object[method] !== 'function') {
                            throw new Error("function: object does not implement the" + interface.name
                                + "interface Method" + method + "was not found");
                        }
                    }
                }
            };
            /*
            Implements The SubClass Inheritance from book "ProJavaScriptPattern"
             */
            var _extend = function extend(subClass, superClass) {
                var F = function () {
                };
                F.prototype = superClass.prototype;
                subClass.prototype = new F();
                subClass.prototype.constructor = subClass;

                subClass.superclass = superClass.prototype;
                if (superClass.prototype.constructor == Object.prototype.constructor) {
                    superClass.prototype.constructor = superClass;
                }
            };
            /*
            Implements Mixin Class
             */
            var _augment = function augment(recivingClass, givingClass){
                if (arguments[2]){
                    //Recive only certains methods
                    for(var i = 2,len = arguments.length; i < len ; i++){
                        recivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
                    }
                }
                else {
                    //All Methods
                    for(var methodName in givingClass.prototype){
                        if(!recivingClass.prototype[methodName]){
                            recivingClass.prototype[methodName] = givingClass.prototype[methodName];
                        }
                    }
                }
            };
            /*
            Implements Prototypal Inheritance
             */
            var _clone = function clone(object){
                function F(){}
                F.prototype = object;
                return new F();
            };

	    /*
	     * Clone Proprieties
	     */

	      /*
	       * Helper function to iterate the method when the
	       * prop is in child and it's an object
	       */

	     function _ff(givingProp, recivingProp, callback){
	      if((typeof givingProp !== "object") ||
		  (typeof recivingProp !== "object")){
	       console.log(givingProp);
	       return;
	       }

	      var _unsupportedObject =/^\[object (?=((?:HTML|global)[^"\r\n]*\]))\1/;

	      var toStr = Object.prototype.toString;
	      var gNotSupportedObject = _unsupportedObject.test(toStr.call(givingProp));
	      var rNotSupportedObject = gNotSupportedObject ||
	       _unsupportedObject.test(toStr.call(recivingProp));

	      if (gNotSupportedObject || rNotSupportedObject){
	       return;
	       }
	      callback(givingProp, recivingProp);
	     }

	     var _extendByCopy = function extendByCopy(parent, child) {

	      /* WARNING
	       ********* It's a shallow copy
	       * WARnING
	       */

	      var p;
	      child = child || {};

	      /*
	       * Check if the 3 argument it's defined. It rapresents an array
	       * of string that contains the parent's prop you would
	       *  copy in child.
	       */

	      if (arguments[2]) {
	       var propNames = arguments[2];
	       var astr = "[object Array]"
	       ,toStr = Object.prototype.toString;

	       /*
		* Check if the 3 argument it's an array
		*/

	       if (toStr.call(propNames) !== astr){
		throw new Error('function copyExtend: error in tirth argument type. It must be an array');
		}

	       /*
		* Iterate through the array of coping prop
		*/

	       for(var i = propNames.length -1; i >= 0; i = i - 1){
		p = propNames[i];

		/*
		 * Check if the single prop it's a string and it's in
		 * the parent object
		 */

		if(typeof p === 'string' && parent.hasOwnProperty(p)){
		 if (child.hasOwnProperty(p)){
		  _ff(parent[p],child[p],extendByCopy);
		 } else {
		   child[p] = parent[p];
		 }
		}
	       }
	      } else {

	       /*
		* Copy all parent prop
		*/

	       for (p in parent){
		if(parent.hasOwnProperty(p)){
		 if (child.hasOwnProperty(p)){
		  _ff(parent[p],child[p],extendByCopy);
		 } else {
		   child[p] = parent[p];
		 }
		}
	       }
	      }
	      return child;
	     };

            return {
                Interface: _Interface,
                extend: _extend,
                augment: _augment,
                clone: _clone,
		            extendByCopy: _extendByCopy
            };

        }();
    /**
    * It's a collection of events utilities
    *
    * @class EventUtility
    * @static
    *
    */
    _self.EventUtility = (function crossBroswerEventMethod() {
        "use strict";

        /**
        * This method is used in the addListener to create a specific id to
        * the envent. It's only an internal method
        *
        * @method getUniqueId
        * @private
        * @param {Object} element DOM element
        * @return {Integer} unique ID  of the element
        *
        */
        var getUniqueId;
        if (typeof document.documentElement.uniqueID !== 'undefined') {
            getUniqueId = function getUniqueId(element) {
                return element.uniqueID;
            };
        } else {
            var uID = 0;
            getUniqueId = function getUniqueId(element) {
                return element.__uniqueID || (element.__uniqueID = 'uniqueID__' + uID++);
            };
        }

        /**
        * Check if the object has the specific method
        *
        *  @method isHostMethod
        *  @param {Object} obj An object
        *  @param {String} method The name of the method we wanto to check
        *  @return {Boolean} True if the object has the method, false otherwise
        */
        var isHostMethod = function isHostMethod(obj,methodName) {
            var tp = typeof obj[methodName];
            return ((tp === 'function' || tp === 'object') && !!obj[methodName]) || tp === 'unknown';
        }
        /**
        * This method is used to format
        * the envent object so it's proprities are almost the same in all broswer.
        *
        * @method formatEvent
        * @private
        * @param {Object} evt Object
        * @return {Object} The event object
        *
        */
        ,formatEvent = function formatEvent(evt) {
            evt.charCode = (evt.type === "keypress") ? evt.keyCode : 0;
            evt.evntPhase = 2;
            evt.isChar = (evt.charCode > 0);
            evt.pageX = evt.clientX + dmUtil.doc.body.scrollLeft;
            evt.pageY = evt.clientY + dmUtil.doc.body.scrollTop;
            evt.preventDefault = function () {
                this.returnvalue = false;
            };
            switch (evt.type) {
            case "mouseout":
                evt.relatedTarget = evt.toElement;
                break;
            case "mouseover":
                evt.relatedTarget = evt.fromElement;
                break;
            default:
                break;
            }
            evt.stopPropagation = function () {
                this.cancelBubble = true;
            };
            evt.target = evt.srcElement;
            evt.time = (new Date()).getTime();

            return evt;

        };
        /**
        * Check the device implementation of touch event
        *
        * @method touchEventSupport
        * @return {Object}
        *
        */
        var _touch = (function touchEventSupport(){
          var result = {};
          var events = ['touchstart','touchend','touchmove','touchcancel'];
          var prop = ['start','end','move','cancel'];

          if (_self.global.PointerEvent){
            events = ['pointerdown','pointerup','pointerMove','pointercancel'];
          } else if (_self.global.navigator.msPointerEnabled){
            events = ['MSpointerDown','MSpointerUp','MSpointerMove','MSpointerCancel'];
          }

          for (var i = 0, len = prop.length; i < len; i++){
            result[prop[i]] = events[i];
          }
          var ptTouch = _self.global.navigator.maxTouchPoints;
          if (ptTouch){
            result.touchSupport = true;
            result.multiTouchSupport = (ptTouch > 1)? true : false;
          } else {
            result.touchSupport = false;
          }
          return result;
        }());
        /**
        * The object that handles the cross Broswer add and remove envent listeners
        *
        *
        * @property aboutHandler
        * @type ClassObject
        *
        *
        */

        /**
        * The object that handles the cross Broswer add and remove envent listeners
        *
        *
        * @class aboutHandler
        * @static
        *
        *
        */
        var aboutHandler = {},docE = _self.doc.documentElement;
        if (isHostMethod(docE, 'addEventListener') && isHostMethod(docE, 'removeEventListener')){
            docE = null;
            /**
            * This method add the event listener to a DOM object
            *
            * @method addListener
            * @param {Object} element DOM element that handles the event
            * @param {String} eventName The name of the event
            * @param {Boolean}[capture=false] If it's supported rappresent
            * the bubbling fase.True=(down to up).False=(up to down).
            * @return {Void}
            */
            aboutHandler.addListener = function addListener(element, eventName, handler, capture) {
                element.addEventListener(eventName, handler, capture);
            };
            /**
            * This method remove the event listener from a DOM object
            *
            *
            * @method removeListener
            * @param {Object} element DOM element that handles the event
            * @param {String} eventName The name of the event
            * @param {Boolean}[capture=false] If it's supported rappresent
            * the bubbling fase.True=(down to up).False=(up to down).
            *  This value must be the same of that used in addListener.
            * @return {Void}
            *
            *
            */
            aboutHandler.removeListener = function removeListener(element, eventName, handler, capture) {
                element.removeEventListener(eventName, handler, capture);
            };
    } else if (isHostMethod(docE, 'attachEvent') && isHostMethod(docE, 'deatachEvent')) {

        var eventListeners = {}
        ,elements = {}
        ,getElement = function (uid) {
            return elements[uid];
        }
        ,setElement = function (uid, element) {
            elements[uid] = element;
        }
        ,wrapper = function (uid, handler) {
            if (handler.handlerEvent) {
                return function (e) {
                    handler.handlerEvent(e);
                };
            } else {
                return function (e) {
                    handler.call(getElement(uid), formatEvent(e || _self.global.event));
                };
            }
        }
        ,createListener = function (uid, handler) {
            return {
                handler: handler,
                wrapperHandeler: wrapper(uid, handler)
            };
        };
        docE = null;
        aboutHandler.addListener = function addListener(element, eventName, handler) {
                var uid = getUniqueId(element);
                setElement(uid, element);
                if (!eventListeners[uid]) {
                    eventListeners[uid] = {};
                }
                if (!eventListeners[uid][eventName]) {
                    eventListeners[uid][eventName] = [];
                }
                var listener = createListener(uid, handler);
                eventListeners[uid][eventName].push(listener);
                element.attachEvent('on' + eventName, listener.wrapperHandeler);
        };
        aboutHandler.removeListener = function removeListener(element, eventName, handler) {
                var uid = getUniqueId(element), listener;
                if (eventListeners[uid] && eventListeners[uid][eventName]) {
                    var i = eventListeners[uid][eventName].length - 1;
                    do {
                        listener = eventListeners[uid][eventName][i];
                        if (listener && listener.handler === handler) {
                            element.deatachEvent('on' + eventName, listener.wrapperHandeler);
                            eventListeners[uid][eventName][i] = null;
                        }
                    } while (i--);
                }
        };
    } else {
        docE = null;
        var handlers = {};
        var createDispatcher = function (uid, eventName) {
            return function (e) {
                if (handlers[uid] && handlers[uid][eventName]) {
                    var handlersForEvent = handlers[uid][eventName];
                    var i, len;
                    for (i = 0, len = handlersForEvent.length; i < len; i++) {
                        handlersForEvent[i].call(this, e || _self.global.event);
                    }
                }
            };
        };
        aboutHandler.addListener = function addListener(element, eventName, handler) {
                var uid = getUniqueId(element);
                if (!handlers[uid]) {
                    handlers[uid] = {};
                }
                if (!handler[uid][eventName]) {
                    handlers[uid][eventName] = [];
                    var existingHandler = element['on' + eventName];
                    if (existingHandler) {
                        handlers[uid][eventName].push(existingHandler);
                    }
                    element['on' + eventName] = createDispatcher(uid, eventName);
                }
                handlers[uid][eventName].push(handler);
        };
        aboutHandler.removeListener = function removeListener(element, eventName, handler) {
                var uid = getUniqueId(element);
                if (handlers[uid] && handlers[uid][eventName]) {
                    var handlersForEvent = handlerEvent[uid][eventName];
                    var i = handlersForEvent.length - 1;
                    do {
                        if (handlersForEvent[i] === handler) {
                            handlersForEvent.splice(i, 1);
                        }
                    } while (i--);
                }
        };
    }
    return {
        isHostMethod : isHostMethod,
        aboutHandler : aboutHandler,
        touchEvent: _touch
    };
    }());

    /**
    * It's a collection of string utilities
    *
    *
    * @class StringUtil
    * @static
    *
    */
    _self.StringUtility = (function buildStringUtilities() {
        "use strict";
        var reTrimTop = /^\s+/
        ,reTrimBottom = /\s\s*$/
        ,stripReg = /<(?=((?:.|\s)*?>))\1/g
        /**
        * The trim(str) function removes whitespace from both sides of a string
        *
        *  @method trim
        *  @param {String} str A string
        *  @return {String} String without top and bottom white space
        */
        ,trim = function trim(str) {
            return str.replace(reTrimTop, "").replace(reTrimBottom, "");
        }
        /**
        * The stripHtml(str) function strip html tags
        *
        *  @method stripHtml
        *  @param {String} str A string
        *  @return {String}
        */
        ,stripHtml = function stripHtml(str) {
            return str.replace(stripReg, "");
        };
        return {
            trim : trim,
            stripHtml : stripHtml
        };
    }());

    /**
    * It's a collection of array utilities
    *
    *
    * @class ArrayUtil
    * @static
    *
    */
    _self.ArrayUtility = (function buildArrayUtilities() {
        "use strict";
        var indexOf, isArray;
        /**
        * The IndexOf(arr,ele,fromIndex) function return the index of the element in the array.
        *
        *  @method IndexOf
        *  @param {Array} arr An array
        *  @param{Object} obj The element of the Array
        *  @param{Integer} index The index from with begin the count
        *  @return {Integer} The index of the element in the array
        */
        if (!Array.prototype.indexOf) {
            indexOf = function indexOf(arr, ele, fromIndex) {
                if(arr === null){
                    return -1;
                }
                var k , O = Object.create(arr);
                var len = (O.length >>> 0);

                if (len === 0) {
                    return - 1;
                }
                var n =+ fromIndex || 0;
                if (n >= len) {
                    return - 1;
                }
                k = Math.max(n >= 0 ? n : len + n, 0);
                do {
                    if (O.hasOwnProperty(k) && O[k] === ele) {
                        return  k;
                    }
                    k++;
                } while(k < len);

                return - 1;
            };
        } else {
            indexOf = function(arr, ele, fromIndex){
                return arr.indexOf(ele, fromIndex);
            };
        }

        /**
        * The isArray(obj) check if an object is an array.
        *
        *  @method isArray
        *  @param {Object} obj An Object
        *  @return {Boolean} True if the Object is an Array false if not.
        */

        if(typeof Array.isArray === 'undefined') {
            isArray = function isArray (arg) {
                return Object.prototype.toString.call(arg) === "[Object Array]";
            };
        } else {
            isArray = Array.isArray;
        }

	 /*
	  * Transform a HTML collection or a NodeList collection
	  * in an array
	  */
	  var _collectionToArray = function collectionToArray(collection) {
	   try{
	    return Array.prototype.slice.call(collection);
	   } catch (ex) {
	     var i = 0
	    ,len = collection.length
	    ,result = Array(len);

	    while (i < len){
	     result[i] = collection[i];
	     i++;
	     }

	    return result;
	   }
	  };

        return {
            indexOf : indexOf,
            isArray : isArray,
	    collectionToArray: _collectionToArray
        };
    }());

    /**
    * It's a cross broswer compatible class List function. You don't need to use new in the
    * constructor, simple call the function and you'll have a cass list object.
    *
    *
    * @class classList
    * @constructor
    * @parem{Element} ele Rappresent the DOM element of which create the class list
    *
    */
    _self.ClassList = (function(){
    "use strict";
    if (!("classList" in _self.doc.createElement("_"))) {
        var checkTokenAndGetIndex=function (classList, token) {
            if(token === ""){
                return -2;
            }
            if(/s/.test(token)){
                return -3;
            }
            return _self.ArrayUtilty.indexOf(classList, token);
        }
        ,ClassList =function (elem) {
            var trimmedClasses = _self.StringUtility.trim(elem.getAttribute("class") || "")
            ,classes = trimmedClasses ? trimmedClasses.split(/s+/): []
            ,i = 0
            ,len = classes.length;
            for(; i < len; i++){
                this.push(classes[i]);
            }
            this._updateClassName = function () {
                elem.setAttribute("class",this.toString());
            };
        }
        ,classListProto=ClassList.prototype = [];
        classListProto.item = function (i) {
            return this[i] || null;
        };
        /**
        * Checks if an element's list of classes contains a specific class
        *
        *  @method contains
        *  @param {String} token The name of a class
        *  @return {Boolean} True if the class is in the list false otherwise
        */
        classListProto.contains = function (token) {
            token += "";
            return checkTokenAndGetIndex(this,token) !== -1;
        };
        /**
        * Adds a class to an element's list of classes.
        * If class already exists in the element's list of classes,
        * it will not add the class again
        *
        *  @method add
        *  @param {String} token The name of  a class. The param can be more than one
        *  @return {Void}
        */
        classListProto.add = function () {
            var tokens = arguments
            ,i = 0
            ,l = tokens.length
            ,token
            ,update = false;
            do {
                token = tokens[i] + "";
                if (checkTokenAndGetIndex(this,token) === -1) {
                    this.push(token);
                    update = true;
                }
            } while(i++ < l);
            if(update){
                this._updateClassName();
            }
        };
         /**
        *  Removes a class from an element's list of classes.
        *  If class does not exist in the element's list of classes,
        *  it will not throw an error or exception
        *
        *  @method remove
        *  @param {String} token The name of  a class. The param can be more than one
        *  @return {Void}
        */
        classListProto.remove=function(){
            var tokens = arguments
            ,i = 0
            ,l = tokens.length
            ,token
            ,update = false
            ,index;
            do{
                token = tokens[i] + "";
                index=checkTokenAndGetIndex(this, token);
                while (index !== -1) {
                    this.split(index, 1);
                    update = true;
                    index = checkTokenAndGetIndex(this,token);
                }
            } while(++i < l);
            if (update) {
                this._updateClassName();
            }
        };
         /**
        * Toggles the existence of a class in an element's list of classes.
        * The second argument will force the class name to be added or removed based
        * on the truthiness of the second argument:
        *   true  -> add
        *   false -> remove
        *
        *  @method toggle
        *  @param {String} token The name of  a class. The param can be more than one
        *  @param {Boolean} force True add the class, false remove the class
        *  @return {Boolean} return second argument
        */
        classListProto.toggle=function(token, force){
            token += "";
            var result = this.contains(token)
            ,method = result ?
                force !== true && "remove"
            :
                force !== false && "add";
            if(method){
                this[method](token);
            }
            if(force === true || force ===false){
                return force;
            } else {
                return !result;
            }
        };
        classListProto.toString=function(){
            return this.join(" ");
        };
        return function (ele){
            return new ClassList(ele);
        };
    } else {
        var testElement = _self.doc.createElement("_");
        testElement.classList.add("c1","c2");
        if (!testElement.classList.contains("c2")) {
            var createMethod = function(method){
                var original = DOMTokenList.prototype[method];
                DOMTokenList.prototype[method] = function (token) {
                    var i,len = arguments.length;
                    for(i=0;i<len;i++){
                        token = arguments[i];
                        original.call(this,token);
                    }
                };
            };
            createElement("add");
            createElement("remove");
        }
        testElement.classList.toggle("c3", false);
        if(testElement.classList.contains("c3")){
            var _toggle = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(token, force){
                if (1 in arguments && !this.contains(token) === !force) {
                    return force;
                } else {
                    return _toggle.call(this,token);
                }
            };
        }
        testElement =null;

        return function(ele){
            return ele.classList;
        };
    }
    }());
	/**
    * It's a cross broswer compatible request animated Frame  function.
    *
    *
    * @class animatedFrame
    * @static
    *
    *
    */
	_self.animatedFrame = (function () {
		"use strict";
		var lastTime = 0
		,vendor = ['ms', 'moz', 'webkit', 'o']
		,x = vendor.length
		,rqAF = window.requestAnimationFrame
		,cnAF = window.cancelAnimationFrame;

		for(;x-- && !rqAF;){
			rqAF = window[vendor[x] + 'RequestAnimationFrame'];
			cnAF = window[vendor[x] + 'CancelAnimationFrame'] || window[vendor[x] + 'CancelAnimationFrame'];
		}
		if (!rqAF) {
			return {
				/**
				*This method is used in the addListener to create a specific id to
				* the envent. It's only an internal method
				*
				* @method aminatedFramiRequest
				* @param {Object} element DOM element
				* @param {function} the callback Method which is passed one element that represent
				*	the current time when callbacks queued by requestAnimationFrame begin to fire.
				* @return {Integer} unique ID  of the element
				*
				*/
				request: function request(callback) {
					var curr_time = performance.now()
					,time_to_call = Math.max(0, 16 - (curr_time -lastTime))
					,id = window.setTimeout(function () {
					callback(curr_time + time_to_call);}, time_to_call);
					lastTime = curr_time + time_to_call;
					return id;
				},
				cancel : function cancel(id) {
					window.clearTimeout(id);
				}
			};
		}
		return {
            request: rqAF.bind(window),
            cancel:  cnAF.bind(window)
		};
	}());
  	/**
    * It's a class that define the confgi animation object.
    * Simple call the function and you'll have an  object to pass to AnimateObject constructor.
    *
    *
    * @class AnimateConfig(Singleton)
    * @constructor
    * @param{Integer} Rappresent the delay of the aniamtion
    * @param{Integer} Rappresent the duration
    * @param{String|Function} Rappresent the built-in progression function. if it's a function object will be used as
    * timing function
    * @param{Function} Rappresent the function that handles the animation
    * @param{Function} Rappresent the ending function optional
    *
    */
    _self.AnimateConfig = (function (){
        var singleton;
        function AnimateConfig() { //Implements Frames Interace
            if (singleton) {
                return singleton;
            }
            if (!(this instanceof AnimateConfig)) {
                return new AnimateConfig();
            }
            var _delay = 0
            ,_duration = 150
            ,_timing = 'linear'
            ,_core = function () {}
            ,_ending = function () {};

            singleton = this;

            singleton.getDelay = function getDelay(){
                return _delay;
            };
            singleton.setDelay = function setDelay(value) {
                if (typeof value !== 'number'){
                    throw 'Delay Must Be a Number';
                }
                _delay = value;
            };
            singleton.getDuration = function getDuration() {
                return _duration;
            };
            singleton.setDuration = function setDuration(value) {
                if (typeof value !== 'number'){
                    throw 'Duration Must Be a Number';
                }
                _duration = value;
            };
            singleton.getTiming = function getTiming () {
                return _timing;
            };
            singleton.setTiming = function setTiming(str) {
                if (typeof str !== 'string'){
                    throw 'Timing Must Be a string';
                }
                _timing = str;
            };
            singleton.getCore = function setCore() {
                return _core;
            };
            singleton.setCore = function setCore(func) {
                if (typeof func !== 'function'){
                    throw 'Core Must Be a Function';
                }
                _core = func;
            };
            singleton.getEnding = function getEnding() {
                return _ending;
            };
            singleton.setEnding = function setEnding(func) {
                if (typeof func !== 'function'){
                    throw 'Ending Must Be a Function';
                }
                _ending = func;
            };
        }
        return AnimateConfig;
    }());
	/**
    * It's a class that define the animation object.
    * Simple call the function and you'll have an animation object.
    *
    *
    * @class AnimateObject
    * @constructor
    * @param{Object} A configuration object with all the required data for the animation
    *
    */
	_self.AnimateObject = (function () {
    // Define Frame interface
    var Frames = new _self.Class.Interface("Frames",['getDelay','setDelay',
  'getDuration','setDuration','getTiming','setTiming','getCore','setCore',
'getEnding','setEnding']);

		var _linear = function linear(p) {
			return p;
		}
		,_quadratic = function quadratic(p) {
			return Math.pow(p,2);
		}
		,_cubic = function cubic(p) {
			return Math.pow(p,3);
		}
        ,a,b,c,d
        ,_cubicBezier = function cubicBezier(p) {
            return (Math.pow(p,3)*a + Math.pow(p,2)*b + c*p + d -d)/(a + b + c);
        }
		,_circ = function circ(p) {
			return 1-Math.sin(Math.acos(p));
		}
		,_back = function back(p,x) {
			return Math.pow(p,2)*((x+1)*p-x);
		}
		,AnimateObject = function AnimateObject(config) {
      if (!(this instanceof AnimateObject)) {
				return new AnimateObject(config);
			}
      if (typeof config != 'undefined'){
        _self.Class.Interface.ensureImplements(config,Frames);
      } else {
        config = _self.AnimateConfig();
      }

      var _config = config;
			var start = 0;
            /** It's the delay of the animation
             *
             * @property delay
             * @type Integer
             */
            this.delay = _config.getDelay();
            /** It's the duration of the animation
             *
             * @property duration
             * @type Integer
             */
            this.duration = _config.getDuration();
            /** It's the progression method of the animation
             *
             * @property timing
             * @type String|Function
             */
            if (typeof _config.getTiming() === "string"){
                var splitArray = _config.getTiming().split('(');
				switch (splitArray[0]) {
					case 'linear':
						this.timing = _linear;
						break;
					case 'quadratic':
						this.timing = _quadratic;
						break;
					case 'cubic':
						this.timing = _cubic;
						break;
                    case 'cubicBezier':
                        if (splitArray[1]){
                            var point_value = splitArray[1].split(','),p = [];
                            for(var i = 0, len = point_value.length; i < len ; i++) {
                                p[i] = parseFloat(point_value[i]);
                            }
                            d = p[0];
                            c = 3.0 * (p[1]-d);
                            b= 3.0 * (p[2]-p[1]) - c;
                            a= p[3] - d - b - c;
                            this.timing = _cubicBezier;
                        } else {
                            console.log('Few arguments for cubicBezier');
                            this.timing = _linear;
                        }
                        break;
					case 'circ':
						this.timing =_circ;
						break;
					case 'back':
						this.timing = _back;
						break;
					default:
						this.timing = _linear;
						break;
					}
			} else {
                this.timing = _config.geTiming();
			}
            /** It's the function thas handles the animation
             *
             * @property step
             * @type Function
             */
            this.step = _config.getCore();
            this.ending = _config.getEnding();
            /** It's the time passed
             *
             * @property timePassed
             * @type Number
             * @default 0
             */
            this.timePassed = 0;
            /** It's the progress value of the animation
             *
             * @property progress
             * @type Float
             * @default 0
             */
            this.progress = 0;
            this.id = 0;
            this.startTimeCount = function () {
                start = performance.now() ? performance.now() : Date.now();
            };
            this.getStartTime = function () {
                return start;
            };
		}
        , AnimateObjectProto = AnimateObject.prototype;
        AnimateObjectProto.animate = function animate(time_stamp) {
            if (arguments.length !== 1) {
                throw "Error can't pass argument to this function";
            }
            this.timePassed = time_stamp - this.getStartTime();
            this.progress = this.timePassed / this.duration;
            if (this.progress > 1) {
                this.progress = 1;
            }
            var timing = this.timing(this.progress);
            this.step(timing);
            if (this.progress === 1) {
                this.progress  = 0;
                this.ending();
                if (this._loop){
                  this._loop = null;
                }
                _self.animatedFrame.cancel(this.id);
            } else {
                this.id = _self.animatedFrame.request(this._loop);
            }
        };
        AnimateObjectProto.startAnimate = function startAnimate(){
          this.startTimeCount();
          if (!this._loop){
            this._loop = this.animate.bind(this);
          }
          this.id =_self.animatedFrame.request(this._loop);
        };

		return AnimateObject;
	}());
} ;
/**
 * This module rappresent all the function to gesture my widgets.
 *
 * @module dmPaper
 */
modules.dmPaper = function dmPaper(_self) {
    _self.PaperMaker = (function(){

       //
       // global private static variables
       var now = Date.now;
       if(_self.global.performance && performance.now) {
            now = performance.now.bind(performance);
       }
        var PaperElemets = {
            button: [],
            buttonEvents : ['mousedown','mouseup','contextmenu'],
        }
        ,papersActive = 0
        , gestureEvent = {
            buttonEvent: function handlerEvent(e){
                switch(e.type){
                case 'mousedown':
                    e.currentTarget.setAttribute('pressed','');
                    e.currentTarget.setAttribute('active','');
                    downAction.call(this, e);
                    break;
                case 'mouseup':
                    e.currentTarget.removeAttribute('pressed');
                    e.currentTarget.removeAttribute('active');
                    upAction.call(this);
                    break;
                case 'contextmenu':
                    upAction.call(this, e);
                    break;
                default:
                    return;
                }
                _self.animatedFrame.cancel(this.anID);
                this.anID = _self.animatedFrame.request(this.update.bind(this));
            },
            buttonUpdate : function () {
                var tmp = _self.ClassList(this.chd.shadow_level);

                if (this.waves[0].isMouseDown) {

                    tmp.remove("bs-zLevel-1");
                    tmp.add("bs-zLevel-2");

                    this.waves[0].bg.style.backgroundColor= this.waves[0].bColor;


                } else if (!this.waves[0].isMouseDown) {
                    tmp.remove("bs-zLevel-2");
                    tmp.add("bs-zLevel-1");
                }
            },
            addHandler : function addHandler(evt_name,i) {
                var type = this.type;
                _self.EventUtility.aboutHandler.addListener(this.paper_ele,evt_name,function (e){
                    getPaperElement(type,i).handlerEvent.call(getPaperElement(type,i),e);
                });
            },
        };
        //Retrive the PaperElemet
        //
        function getPaperElement(str,index) {
            return PaperElemets[str][index] || null;
        }
        // Copyright (c) 2014 The Polymer Authors. All rights reserved.
        //
        // Redistribution and use in source and binary forms, with or without
        // modification, are permitted provided that the following conditions are
        // met:
        //
        //    * Redistributions of source code must retain the above copyright
        // notice, this list of conditions and the following disclaimer.
        //    * Redistributions in binary form must reproduce the above
        // copyright notice, this list of conditions and the following disclaimer
        // in the documentation and/or other materials provided with the
        // distribution.
        //    * Neither the name of Google Inc. nor the names of its
        // contributors may be used to endorse or promote products derived from
        // this software without specific prior written permission.
        //
        // THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
        // "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
        // LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
        // A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
        // OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
        // SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
        // LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
        // DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
        // THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        // (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
        // OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

        var waveMaxRadius = 150;
        //
        // Claculate the radius
        //
        function waveRadius(td, tup, anim) {
            var touchDown = td / 1000
            , touchUp = tup / 1000
            ,totalElapsed = touchDown + touchUp
            ,ww = anim.width, hh = anim.height
            ,wave_radius = Math.min(Math.sqrt(ww*ww + hh*hh),waveMaxRadius)*1.1 + 5
            ,duration = 1.1 - 0.2*(wave_radius/waveMaxRadius)
            ,tt = (totalElapsed/duration)
            ,size = wave_radius * (1 - Math.pow(80, -tt));

            return Math.abs(size);
        }
        //
        // calculate opacity of div[class = wave]
        //
        function waveInnerOpacity(td, tu, anim){
            var touchDown = td / 1000
            ,touchUp =  tu / 1000;

            if (tu <= 0) {
                return anim.initial_opacity;
            }

            return Math.max(0,anim.initial_opacity - touchUp * anim.opacity_dacay_vel);
        }
        //
        // calculate opacity of div[class = bg]
        //
        function waveOuterOpacity(td, tu, anim) {
            var touchDown = td / 1000
            ,touchUp =  tu / 1000
            ,outer_opacity = touchDown * 0.3
            ,wave_opacity = waveInnerOpacity(td, tu, anim);

            return Math.max(0, Math.min(outer_opacity, wave_opacity));
        }
        //
        //Draw Ripple Class
        //
        function drawRipple(ctx, x, y, radius, inner_alpha, outer_alpha) {
            if (outer_alpha !== undefined) {
                ctx.bg.style.opacity = outer_alpha;
            }
            ctx.wave.style.opacity = inner_alpha;

            var s = radius / (ctx.containerSize/2)
            ,x_tilde = x - (ctx.containerWidth/2)
            ,y_tilde = y - (ctx.containerHeight/2);

            var tmp_str = 'translate3d(' + x_tilde + 'px,' + y_tilde + 'px,0px)';


            ctx.wc.style.transform =  tmp_str;
            ctx.wc.style.webkitTransform = tmp_str;


            ctx.wave.style.webkitTransform = 'scale(' + s + ',' + s + ')';
            ctx.wave.style.transform = 'scale3d(' + s + ',' + s + ',1)';
        }
        //
        // Determines when the wave should be removed
        //
        function waveDidFinish(wave, radius, anim) {
            var wave_opacity = waveInnerOpacity(wave.td, wave.tu, anim);

            return wave_opacity < 0.01 && radius >= Math.min(wave.max_radius, waveMaxRadius);
        }
        function waveAtMaximun(wave, radius, anim) {
            var wave_opacity = waveInnerOpacity(wave.td, wave.tu, anim);

            return wave_opacity  >= anim.initial_opacity && radius >= Math.min(wave.max_radius,waveMaxRadius);
        }
        //
        // Create the wave
        //
        function createWave(ele) {
            var ele_style = window.getComputedStyle(ele.paper_ele)
            ,fg_color = ele_style.color
            ,doc = _self.doc
            ,inner = doc.createElement('div')
            ,outer = doc.createElement('div');

            inner.style.backgroundColor = fg_color;
            _self.ClassList(inner).add('wave');
            _self.ClassList(outer).add('wave-wrapper');

            outer.appendChild(inner);


            var wave = {
                bg: ele.chd.bg,
                container : ele.chd.waves,
                wc: outer,
                wave: inner,
                bColor: fg_color,
                isMouseDown: false,
                mouseDownS: 0.0,
                mouseUpS: 0.0,
                td: 0.0,
                tu: 0.0
            };

            return wave;

        }
        //
        //Remuve wave
        //
        function removeWave(ele, wave) {
            if (ele.waves) {
                var pos = ele.waves.indexOf(wave);
                ele.waves.splice(pos, 1);
                wave.wc.remove();
            }
        }
        //
        // Function distance
        //
        function dist(p1, p2) {
            return Math.sqrt(Math.pow(p1.x - p2.x,2) + Math.pow(p1.y - p2.y,2));
        }
        function distFromCornerPoint(p, size) {
            var d_11 = dist(p, {x:0,y:0})
            ,d_21 = dist(p, {x:size.w, y:0})
            ,d_12 = dist(p, {x:0, y:size.h})
            ,d_22 = dist(p, {x:size.w, y:size.h});

            return Math.max(d_11,d_21,d_12,d_22);
        }
        //
        //Moouse Down Action
        //
        function downAction(e) {
            var wave = createWave(this);

            wave.isMouseDown = true;
            wave.td = 0.0;
            wave.tu = 0.0;
            wave.mouseUpS = 0.0;
            wave.mouseDownS = now();

            var rect = this.paper_ele.getBoundingClientRect()
            ,width = rect.width
            ,height = rect.height
            ,touchX = e.clientX - rect.left
            ,touchY = e.clientY - rect.top;

            wave.origin = {x:touchX, y:touchY};

            if (this.chd.bg.classList.contains("recenteringTouch")){
                wave.endPosition = {x:width/2, y:height/2};
            }

            wave.containerSize = Math.max(width,height);
            wave.containerWidth = width;
            wave.containerHeight = height;

            wave.wc.style.top = (wave.containerHeight - wave.containerSize)/2 + 'px';
            wave.wc.style.left = (wave.containerWidth - wave.containerSize)/2 + 'px';
            wave.wc.style.width = wave.containerSize + 'px';
            wave.wc.style.height = wave.containerSize + 'px';
            wave.max_radius = distFromCornerPoint(wave.origin, {w: width,h: height});

            this.waves.push(wave);

            wave.container.appendChild(wave.wc);

            this.chd.bg.style.backgroundColor = wave.bColor;

            if(!this.loop) {
                this.loop = this.animate.bind(this,{
                        width: width,
                        height: height
                });
                _self.animatedFrame.request(this.loop);
            }

        }

        function upAction() {
            for(var i = 0,len = this.waves.length; i < len ; i++){
                var wave = this.waves[i];

                if (wave.isMouseDown) {
                    wave.isMouseDown = false;
                    wave.mouseUpS = now();
                    wave.mouseDownS = 0.0;
                    wave.tu = 0.0;
                    break;
                }
            }
            this.loop && _self.animatedFrame.request(this.loop);
        }

        function animate(ctx){
            var nextFrame = false
            ,deleteTheseWaves = []
            ,longTouchDownDuration = 0
            ,longTouchUpDuration = 0
            ,anim = {
                initial_opacity: this.initial_opacity,
                opacity_dacay_vel: this.opacity_dacay_vel,
                height: ctx.height,
                width: ctx.width
            };
            for (var i = 0,len = this.waves.length; i < len; i++){
                var wave = this.waves[i];

                if (wave.mouseDownS > 0) {
                    wave.td = now() - wave.mouseDownS;
                }

                if (wave.mouseUpS > 0) {
                    wave.tu = now() - wave.mouseUpS;
                }

                var tup = wave.tu, tDown = wave.td;
                longTouchDownDuration = Math.max(longTouchDownDuration,tDown);
                longTouchUpDuration = Math.max(longTouchUpDuration,tup);


                var radius = waveRadius(tDown, tup, anim)
                ,wave_alpha = waveInnerOpacity(tDown, tup, anim)
                ,x = wave.origin.x
                ,y = wave.origin.y
                ,bgAplha = waveOuterOpacity(tDown, tup, anim);

                if (wave.endPosition){

                    var translateFraction = Math.min(1,radius / wave.containerSize * 2 / Math.sqrt(2));

                    x += translateFraction * (wave.endPosition.x - wave.origin.x);
                    y += translateFraction * (wave.endPosition.y - wave.origin.y);
                }

                drawRipple(wave, x, y, radius, wave_alpha, bgAplha);

                var maxWave = waveAtMaximun(wave, radius, anim)
                ,waveDissipated = waveDidFinish(wave, radius, anim)
                ,shouldKeepWave = !waveDissipated || maxWave;
                shouldRenderWaveAgain = wave.mouseUpS ? !waveDissipated : !maxWave;
                nextFrame = nextFrame || shouldRenderWaveAgain;
                if(!shouldKeepWave) {
                    deleteTheseWaves.push(wave);
                }

            }

            if (nextFrame) {
                _self.animatedFrame.request(this.loop);
            }

            for (var i = 0,len = deleteTheseWaves.length; i < len; i++) {
                var wave = deleteTheseWaves[i];
                removeWave(this, wave);
            }


            if (!this.waves.length && this.loop) {
                this.chd.bg.style.backgroundColor = null;
                this.loop = null;
            }
        }
        /**
         *
         *  This rappresent the parent constructor  of the factory pattern
         *  @class PaperMaker
         *  @static
         *
         */
        function PaperMaker() {}


        PaperMaker.version = '0.5';

        PaperMaker.prototype.paperVersion = function (){
            return PaperMaker.version;
        };

        PaperMaker.prototype.initbutton = function initbutton(args) {
            if (args.length === 0) {
                    throw  "Need the top Paper Element";
                }

                this.paper_ele = args.element;
                this.chd.shadow_level = this.paper_ele.querySelector(".shadow");
                this.chd.bg = this.paper_ele.querySelector(".bg");
                this.chd.waves = this.paper_ele.querySelector(".waves");
                this.waves = [];
                this.animate = animate;
            };

        /**
         *
         * This is the public static method used to create all type od paper Elements supported
         * @class factory
         * @static
         * @param {String} Type Rappresent the type of paper elemnt
         * @param [...ARGS] Other args to pass to the specific constructor
         */
        PaperMaker.factory = function factory() {
            if((this instanceof factory)) {
                throw "It's not a constructor";
            }
            var args  = Array.prototype.slice.call(arguments)
            ,constr = args.shift()
            ,init_func = 'init' + constr
            ,newPaper;

            if (typeof PaperMaker[constr] !== 'function') {
                throw {
                    name: "Error",
                    message: constr + "doesn't exist"
                };
            }

           if (typeof PaperMaker[constr].prototype.paperVersion !== 'function') {
               PaperMaker[constr].prototype = Object.create(PaperMaker.prototype);
               PaperMaker[constr].prototype.type = constr;
               PaperMaker[constr].prototype.handlerEvent = gestureEvent[constr+'Event'];
               PaperMaker[constr].prototype.update = gestureEvent[constr+'Update'];
               PaperMaker[constr].prototype.addHandler = gestureEvent.addHandler;
               gestureEvent = null;
            }

            newPaper = new PaperMaker[constr]();
            newPaper[init_func](args[0]);
            PaperElemets[constr].push(newPaper);
            newPaper = null;
        };
        /**
         * Add the event handle to the PaperElemets that you have created
         * @method MakePaperLive
         *
         */
        PaperMaker.factory.MakePaperLive = function () {
            var buttons = PaperElemets.button
            ,buttonEvents = PaperElemets.buttonEvents
            ,b_lenght = buttons.length
            ,i = b_lenght-1;

            for(;i >= papersActive ; i--) {
                buttons[i].addHandler(buttonEvents[0],i);
                buttons[i].addHandler(buttonEvents[1],i);
                buttons[i].addHandler(buttonEvents[2],i);
            }

            papersActive = b_lenght;

        };
        /**
         * A private class that define a button paper object
         * @class button
         * @constructor
         *
         */
        PaperMaker.button = function () {
            this.paper_ele= null;
            this.chd = {};
            this.anID = 0;
            this.initial_opacity = 0.25;
            this.opacity_dacay_vel = 0.8;
    };

        return PaperMaker.factory;
    }());
};

// Define SandBox constructor
    _UtilityBuild = function _UtilityBuild() {
        var args = Array.prototype.slice.call(arguments)
        //Last argument is callback function
        ,callback = args.pop()
        ,modules_set = (args[0] && typeof args[0] === "string") ? args : args[0]
        ,i;
        // Make sure it's call like a constructor
        if (!(this instanceof _UtilityBuild)) {
            return new _UtilityBuild(modules_set, callback);
        }
        /**
        *  Rappresent the globl object. In broswer enviroment is the window object
        *
        *
        * @property global
        * @for UtilityBuild
        * @type DOMObject
        *
        */
        this.global =  window;

    /**
    * Rappresent the docuemnt DOM object
    *
    * @property doc
    * @for UtilityBuild
    * @type DOMObject
    *
    */
        this.doc = document;

        this.now = Date.now;
        if(window.performance && performance.now) {
            this.now = performance.now.bind(performance);
        }


    //Add modules
        if (!modules_set || modules_set === '*') {
            modules_set = [];
            for (i in modules) {
                if (modules.hasOwnProperty(i)) {
                    modules_set.push(i);
                }
            }
        }

    //Initialize the modules
        for (i = modules_set.length; i--;) {
            modules[modules_set[i]](this);
        }

        callback(this);
    };

    return _UtilityBuild;
}());
