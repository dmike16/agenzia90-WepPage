/**
 * This module rappresent my personal utility, that i use to develop
 * my web sites
 *
 * @module dmUtil
 */
var dmUtil = dmUtil || {};
/**
 * Rappresent the globl object. In broswer enviroment is the window object
 *
 * @class global
 * @static
 *
 */
dmUtil.global = this;
/**
 * Rappresent the docuemnt DOM object
 *
 * @class doc
 * @static
 *
 */
dmUtil.doc = document;
/**
 * It's a collection of events utilities
 *
 * @class EventUtil
 * @static
 *
 */
dmUtil.EventUtil = {
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
    getUniqueId  : (function () {
        "use strict";
        if (typeof document.documentElement.uniqueID !== 'undefined') {
            return function (element) {
                return element.uniqueID;
            };
        }
        var uID = 0;
        return function (element) {
            return element.__uniqueID || (element.__uniqueID = 'uniqueID__' + uID++);
        };
    }()),
    /**
     * Check if the object has the specific method
     *
     *  @method isHostMethod
     *  @param {Object} obj An object
     *  @param {String} The name of the method we wanto to check
     *  @return {Boolean} True if the object has the method, false otherwise
     */
    isHostMethod: function (obj, methodName) {
        "use strict";
        var tp = typeof obj[methodName];
        return ((tp === 'function' || tp === 'object') && !!obj[methodName]) || tp === 'unknown';
    },
    /**
     * This method is used to format  
     * the envent object so it's proprities are almost the same in all broswer.
     *
     * @method formatEvent
     * @param {Object} event Object 
     * @return {Object} The event object 
     *
    */
    formatEvent: function (evt) {
        "use strict";
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
    }
};
/**
 * The object that handles the cross Broswer add and remove envent listeners
 *
 * @namespace EventUtil
 * @class aboutHandler
 * @static
 *
 */
dmUtil.EventUtil.aboutHandler = (function (){
        var docE=dmUtil.doc.documentElement;

        if(dmUtil.EventUtil.isHostMethod(docE,'addEventListener') && 
        dmUtil.EventUtil.isHostMethod(docE,'removeEventListener')){
            docE=null;
            return {
                /**
                 * This method add the event listener to a DOM object
                 *
                 * @method addListener
                 * @param {Object} element DOM element that handles the event
                 * @param {String} eventName The name of the event
                 * @param {String}[capture=false] If it's supported rappresent 
                 * the bubbling fase.True=(down to up).False=(up to down).
                 * @return {Void}
                 */
                addListener : function(element,eventName,handler,capture){
                    element.addEventListener(eventName,handler,capture);
                },
                /**
                 * This method remove the event listener from a DOM object
                 *
                 * @method removeListener
                 * @param {Object} element DOM element that handles the event
                 * @param {String} eventName The name of the event
                 * @param {String}[capture=false] If it's supported rappresent 
                 * the bubbling fase.True=(down to up).False=(up to down).
                 *  This value must be the same of that used in addListener.
                 * @return {Void}
                 */
                removeListener: function(element,eventName,handler,capture){
                    element.removeEventListener(eventName,handler,capture);
                }
            };
        } else if(dmUtil.EventUtil.isHostMethod(docE,'attachEvent')&&
        dmUtil.EventUtil.isHostMethod(docE,'deatachEvent')){
 
            var eventListeners={},elements={},
            getElement = function(uid){
                return elements[uid];
            },
            setElement=function(uid,element){
                elements[uid]=element;
            },
            createListener=function(uid,handler){
                return {
                    handler: handler,
                    wrapperHandeler: wrapper(uid,handler)
                };
            },
            wrapper = function(uid,handler){
                if(handler.handlerEvent){
                    return function(e){
                        handler.handlerEvent(e);
                    };
                } else {
                    return function(e){
                        handler.call(getElement(uid),
                        dmUtil.formatEvent(e || dmUtil.global.event));
                    };
                }
            };
            docE=null;
            return{
                addListener : function(element,eventName,handler){
                    var uid = dmUtil.EventUtil.getUniqueId(element);
                    setElement(uid,element);
                    if(!eventListeners[uid]){
                        eventListeners[uid]={};
                    }
                    if(!eventListeners[uid][eventName]){
                        eventListeners[uid][eventName]=[];
                    }
                    var listener=createListener(uid,handler);
                    eventListeners[uid][eventName].push(listener);
                    element.attachEvent('on'+eventName,listener.wrapperHandeler);
                },
                removeListener: function(element,eventName,handler){
                    var uid =getUniqueId(element),listener;
                    if(eventListeners[uid] && eventListeners[uid][eventName]){
                        var i=eventListeners[uid][eventName].length -1;
                        do{
                            listener=eventListeners[uid][eventName][i];
                            if(listener && listener.handler ===handler){
                                element.deatachEvent('on'+eventName,listener.wrapperHandeler);
                                eventListeners[uid][eventName][i]=null;
                            }
                        } while(i--);
                    }
                }            
            };
        } else {
            docE=null;
            var createDispatcher=function(uid,eventName){
                return function(e){
                    if(handlers[uid]&&handlers[uid][eventName]){
                        var handlersForEvent =handlers[uid][eventName];
                        for(var i=0,len=handlersForEvent.length; i<len;i++){
                            handlersForEvent[i].call(this, e || dmUtil.global.event);
                        }
                    }
                };
            };
            var handlers ={};
            return {
                addListener: function(element,eventName,handler){
                    var uid=dmUtil.EventUtil.getUniqueId(element);
                    if(!handlers[uid]){
                        handlers[uid]={};
                    }
                    if(!handler[uid][eventName]){
                        handlers[uid][eventName]=[];
                        var existingHandler=element['on'+eventName];
                        if(existingHandler){
                            handlers[uid][eventName].push(existingHandler);
                        }
                        element['on'+eventName]=createDispatcher(uid,eventName);
                    }
                    handlers[uid][eventName].push(handler);
                },
                removeListener: function(element,eventName,handler){
                    var uid=dmUtil.EventUtil.getUniqueId(element);
                    if(handlers[uid]&&handlers[uid][eventName]){
                        var handlersForEvent=handlerEvent[uid][eventName];
                        var i=handlersForEvent.length-1;
                        do{
                            if(handlerEvent[i]===handler){
                                handlersForEvent.splice(i,1);
                            }
                        } while(i--);
                    }
                }
            };
        }
})();
dmUtil.stringUtil ={
    trim : (function(){
        var reTrimTop=/^\s+/,reTrimBottom=/\s\s*$/;
        return function(str){
            return str.replace(reTrimTop,"").replace(reTrimBottom,"");
        };
    })(),
    stripHtml :(function(){
        var stripReg = /<(?=((?:.|\s)*?>))\1/g;
        return function(str){
            return str.replace(stripReg,"");
        };
    })()
};
dmUtil.arrayUtil={
    IndexOf: (function(){
        if(!Array.prototype.indexOf){
            return function(arr,ele,fromIndex){
                if(arr === null){
                    return -1;
                }
                var k,O=Object(arr);
                var len= O.length >>> 0;

                if(len === 0){
                    return -1;
                }
                var n=+fromIndex || 0;
                if(n >= len){
                    return -1;
                }
                k = Math.max(n>=0? n: len + n,0);
                do{
                    if(k in O && O[k] === ele){
                        return  k;
                    }
                    k++;
                } while(k<len);
                
                return -1;
            };
        } else {
            return function(arr,ele,fromIndex){
                return arr.indexOf(ele,fromIndex);
            };
        }
        
    })()
};
dmUtil.classList = (function(){
    if(!("classList" in document.createElement("_"))){
        var checkTokenAndGetIndex=function(classList,token){
            if(token ===""){
                return -2;
            }
            if(/s/.test(token)){
                return -3;
            }
            return dmUtil.arrayUtil.IndexOf(classList,token);
        }
        ,classList =function(elem){
            var trimmedClasses = dmUtil.stringUtil.trim(elem.getAttribute("class")|| "")
            ,classes = trimmedClasses?trimmedClasses.split(/s+/): []
            ,i=0
            ,len =classes.length;
            for(;i<len;i++){
                this.push(classes[i]);
            }
            this._updateClassName = function(){
                elem.setAttribute("class",this.toString());
            };
        }
        ,classListProto=classList.prototype = [];
        classListProto.item = function(i){
            return this[i] || null;
        };
        classListProto.contains = function(token){
            token += "";
            return checkTokenAndGetIndex(this,token) !== -1;
        };
        classListProto.add = function(){
            var tokens = arguments
            ,i=0
            ,l=tokens.length
            ,token
            ,update = false;
            do{
                token= tokens[i]+ "";
                if(checkTokenAndGetIndex(this,token)===-1){
                    this.push(token);
                    update=true;
                }
            }while(i++<l);
            if(update){
                this._updateClassName();
            }
        };
        classListProto.remove=function(){
            var tokens=arguments
            ,i=0
            ,l=tokens.length
            ,token
            ,update=false
            ,index;
            do{
                token =tokens[i]+ "";
                index=checkTokenAndGetIndex(this,token);
                while(index!==-1){
                    this.split(index,1);
                    update=true;
                    index=checkTokenAndGetIndex(this,token);
                }
            }while(++i<l);
            if(update){
                this._updateClassName();
            }
        };
        classListProto.toggle=function(token,force){
            token += "";
            var result = this.contains(token)
            ,method = result?
                force !== true && "remove"
            :
                force !==false && "add";
            if(method){
                this[method](token);
            }
            if(force===true || force ===false){
                return force;
            } else {
                return !result;
            }
        };
        classListProto.toString=function(){
            return this.join(" ");
        };
        return function(ele){
            return new classList(ele);
        };
    } else {
        var testElement = dmUtil.doc.createElement("_");
        testElement.classList.add("c1","c2");
        if(!testElement.classList.contains("c2")){
            var createMethod=function(method){
                var original=DOMTokenList.prototype[method];
                DOMTokenList.prototype[method]=function(token){
                    var i,len=arguments.length;
                    for(i=0;i<len;i++){
                        token=arguments[i];
                        original.call(this,token);
                    }
                };
            };
            createElement("add");
            createElement("remove");
        }
        testElement.classList.toggle("c3",false);
        if(testElement.classList.contains("c3")){
            var _toggle=DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle=function(token,force){
                if(1 in arguments && !this.contains(token)=== !force){
                    return force;
                }else{
                    return _toggle.call(this,token);
                }
            };
        }
        testElement =null;

        return function(ele){
            return ele.classList;
        };
    }
})();
dmUtil.animation={
    Frame: (function(){
        var lastTime=0;
        var vendors=['webkit','moz'];
        var testExistence = dmUtil.global.requestAnimationFrame;
        for(var x=vendors.length;--x && !testExistence;){
            testExistence=dmUtil.global[vendors[x]+'RequestAnimationFrame'];
        }
        
    })()
};
