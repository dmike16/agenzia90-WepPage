var fnClick = function (){
    //alert(arguments[0].type);
    
    var doc = document, oHTML = doc.documentElement
    ,oSideNav = doc.getElementById("side-nav")
    ,oMask = doc.getElementsByClassName("mask-modal")[0];

    oHTML.setAttribute("style","overflow:hidden;");
    oSideNav.setAttribute("style","transform:translateX(0px);visibility:visible");
    oMask.setAttribute("style","visibility:visible;opacity:1.0;transition-delay:0;overflow:hidden;");
    oMask.addEventListener("wheel",fnDisable,false);
    oMask = null;oSideNav=null;oHTML=null;
};
var fnClick1 = function (oEvent){
    oEvent.preventDefault();
    var doc=document,oSideNav = doc.getElementById("side-nav")
    ,oMask = doc.getElementsByClassName("mask-modal")[0]
    ,oHTML=doc.documentElement;

    oHTML.removeAttribute("style");
    oSideNav.removeAttribute("style");
    oMask.removeAttribute("style");
    oMask.removeEventListener("wheel",fnDisable,false);
    oMask = null;oSideNav = null;oHTML=null;

};

var fnDisable = function (oEvent){
    oEvent.preventDefault();
};

var flag=1;
var iOutHeight = this.outerHeight;
var iLowBoundary = Math.floor((iOutHeight/100)*12)
,iUpBoundary = Math.floor((iOutHeight/100)*15);
var doc=document;
var oHeaderTitleg = doc.getElementsByClassName("header-title")[0];
var aHeaderg = doc.getElementsByTagName("header");
var oHeaderg = aHeaderg[0]; oHeader2g=aHeaderg[1];
var oHeaderWrapg = oHeaderg.firstElementChild;
var oHeaderWrap1g= oHeader2g.firstElementChild;
aHeaderg=null;

var fnHeaderTransition = function (bLB,aUPB,mB,fON,sON,tON){
    
        var oHeader=oHeaderg,oHeader2=oHeader2g
        ,oHeaderWrap=oHeaderWrapg,oHeaderWrap1=oHeaderWrap1g
        ,oHeaderTitle=oHeaderTitleg;

        if(mB && fON){
            flag <<= 1;
            oHeaderWrap.style.cssText="height:64px;left:72px;right:72px;top:0px;z-index:2;position:fixed;";
            oHeaderTitle.style.cssText="font-size:24px;line-height:64px;width:100%;";
            oHeaderWrap1.style.cssText="display:block;";
        } else if(aUPB){
            if(fON){
                flag <<=2;
                oHeader.style.display ="none";
                oHeaderWrap.style.cssText="height:64px;left:72px;right:72px;top:0px;z-index:2;position:fixed;";
                oHeaderTitle.style.cssText="font-size:24px;line-height:64px;width:100%;";
                oHeaderWrap1.style.display="block";
                oHeader2.style.display="block";
                oHeader.style.cssText="box-shadow:0px 2px 5px rgba(0,0,0,0.26);left:0px;right:0px;top:-192px;z-index:1;position:fixed;";
            } else  if (sON){
                flag <<=1;
                oHeader2.style.display="block";
                oHeader.style.cssText="box-shadow:0px 2px 5px rgba(0,0,0,0.26);left:0px;right:0px;top:-192px;z-index:1;position:fixed;";
    }   
    } else if(mB && tON){
            flag >>=1;
            oHeader.style.cssText="";
            oHeader2.style.cssText="";
    } else if (bLB){
        if(tON){
            flag>>=2;
            oHeader.style.display="none";
            oHeaderWrap.style.cssText="";
            oHeaderTitle.style.cssText="";
            oHeader.style.cssText="";
            oHeader2.style.cssText="";
            } else if(sON){
                flag>>=1;
            oHeaderWrap.style.cssText="";
            oHeaderTitle.style.cssText="";
        }
    }
};
var fnScroll = function(evt){
    var iScrollY = window.scrollY;
    var iLb = iLowBoundary,iUb = iUpBoundary;
    var bLb = iScrollY <= iLb, bUb = iScrollY > iUpBoundary
    ,bInM = (!bLb && !bUb);
    var fByteON = flag & 1, sByteON = flag & 2,tByteON = flag & 4;
    if((tByteON && bUb) || (fByteON && bLb) || (sByteON && bInM)){
        return;
    }
    else {
        fnHeaderTransition(bLb,bUb,bInM,fByteON,sByteON,tByteON);
    }
};
function AppInit(){
    var oButton = document.getElementsByClassName("clubSandwich-button")[0];
    var oMask = document.getElementsByClassName("mask-modal")[0];
    var win=window;

    oButton.addEventListener("click",fnClick,false);
    oMask.addEventListener("click",fnClick1,false);
    oMask.addEventListener("touchstart",fnClick1,false);
    oMask =null;oButton=null;

    win.addEventListener("scroll",fnScroll,false);
    win.onload=fnScroll;
    win = null;
}
/*var My_app = My_app || {};
My_app.module=(function(){
        var c = 5;
        return{
            getC: function (){
                return c;
            },
        setC: function (nc){
            c=nc;
        }
        };
})();
My_app.module.setC(34);*/