var dmUtil = dmUtil || {};
dmUtil.global = this;
dmUtil.doc= document;
dmUtil.EventUtil = {

    aboutHandler : (function (){
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
            docE=null;
            return{
                addListener : function(element,eventName,handler){
                    element.attachEvent('on'+eventName,handler);
                },
                removeListener: function(element,eventName,handler){
                    element.deatachEvent('on'+eventName,handler);
                }
            };
        } else {
            docE=null;
            return {
                addListener: function(element,eventName,handler){
                    element['on'+eventName]=handler;
                },
                removeListener: function(element,eventName,handler){
                    element['on'+eventName]=null;
                }
            };
        }
    })(),
    isHostMethod: function(obj,methodName){
        var tp = typeof obj[methodName];
        return ((tp ==='function'||t==='object')&& !!obj[methodName])|| t==='unknown';
    }
};

