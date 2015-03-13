var dmUtil = dmUtil || {};
dmUtil.global = this;
dmUtil.doc= document;
dmUtil.EventUtil = {
    
    getUniqueId  : (function (){
                if(typeof document.documentElement.uniqueID != 'undefined'){
                    return function(element){
                        return element.uniqueID;
                    };
                }
                var uID=0;
                return function(element){
                    return element.__uniqueID || (element.__uniqueID='uniqueID__'+ uID++);
                };
            })(),
    isHostMethod: function(obj,methodName){
            var tp = typeof obj[methodName];
            return ((tp ==='function'||t==='object')&& !!obj[methodName])|| t==='unknown';
        },

    formatEvent: function(evt){
            evt.charCode = (evt.type == "keypress")? evt.keyCode : 0;
            evt.evntPhase = 2;
            evt.isChar =(evt.charCode > 0);
            evt.pageX = evt.clientX + dmUtil.doc.body.scrollLeft;
            evt.pageY = evt.clientY + dmUtil.doc.body.scrollTop;
            evt.preventDefault = function(){
                this.returnvalue = false;
            };
            switch(evt.type){
            case "mouseout":
                evt.relatedTarget = evt.toElement;
                break;
            case "mouseover":
                evt.relatedTarget = evt.fromElement;
                break;
            default:
                break;
            }
            evt.stopPropagation = function(){
                this.cancelBubble = true;
            };
            evt.target=evt.srcElement;
            evt.time = (new Date()).getTime();

            return evt;
        } 
};
dmUtil.EventUtil.aboutHandler = (function (){
        var docE=dmUtil.doc.documentElement;

        if(dmUtil.EventUtil.isHostMethod(docE,'addEventListener') && 
        dmUtil.EventUtil.isHostMethod(docE,'removeEventListener')){
            docE=null;
            return {
                addListener : function(element,eventName,handler,capture){
                    element.addEventListener(eventName,handler,capture);
                },
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
                arr.IndexOf(ele,fromIndex);
            };
        }
        
    })()
};
dmUtil.classList = (function(){
    if(!("classList" in document.createElement("_"))){
           
    } else {}

})();
