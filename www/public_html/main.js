/**
 * This my application SandBox constructor
 * @class UtilityBuild
 * @constructor
 */
var UtilityBuild;
/**
 * This contains the modules on which is based my lib
 * @property modules
 * @type object
 */
UtilityBuild.modules = {};
/**
 * This module rappresent my personal utility, that i use to develop
 * my web sites
 *
 * @module dmUtil
 */
UtilityBuild.modules.dmUtil = function (_self) {
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
        }
        var uID = 0;
        getUniqueId = function getUniqueId(element) {
            return element.__uniqueID || (element.__uniqueID = 'uniqueID__' + uID++);
        };

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
        * @param {Object} event Object 
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
        * The object that handles the cross Broswer add and remove envent listeners
        *
        * 
        * @property aboutHandler
        * @type ClasObject
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
        aboutHandler : aboutHandler
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
    _self.ArrayUtilty = (function buildArrayUtilities() {
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
        return {
            indexOf : indexOf,
            isArray : isArray
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

} ;

// Define SandBox constructor
function UtilityBuild() {
    var args = Array.prototype.slice.call(arguments)
    //Last argument is callback function
    ,callback = args.pop()
    ,modules = (args[0] && typeof arg[0] === "string") ? args : args[0]
    ,i;
    // Make sure it's call like a constructor
    if (!(this instanceof UtilityBuild)) {
        return new UtilityBuild(modules, callback);
    }
    /**
    * Rappresent the globl object. In broswer enviroment is the window object
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

    //Add modules
    if (!modules || modules === '*') {
        modules = [];
        for (i in UtilityBuild.modules) {
            if (UtilityBuild.modules.hasOwnProperty(i)) {
                modules.push(i);
            }
        }
    }

    //Initialize the modules
    for (i = modules.length; i--;) {
        UtilityBuild.modules[modules[i]](this);
    }

    callback(this);
}

/*
dmUtil.animation={
    Frame: (function(){
        var lastTime=0;
        var vendors=['webkit','moz'];
        var testExistence = dmUtil.global.requestAnimationFrame;
        for(var x=vendors.length;--x && !testExistence;){
            testExistence=dmUtil.global[vendors[x]+'RequestAnimationFrame'];
        }
        
    })()
};*/
