/* JavaScript Learning*/
/* Class Example
function Polygon(iSides){
    this.sides=iSides;
    if(typeof Polygon._initialized == "undefined"){
        Polygon.prototype.getArea=function(){
            return 0;
        };
    }
    Polygon._initialized = true;
}

function Triangle(iBase,iHeight){
    Polygon.call(this,3);
    this.base = iBase;
    this.height = iHeight;
    if(typeof Triangle._initialized == "undefined"){
        Triangle.prototype.getArea = function(){
            return 0.5*this.base*this.height;
        };
    }
    Triangle._initialized = true;
}
Triangle.prototype = Object.create(Polygon);

function Rectangle(iLenght,iWidth){
    Polygon.call(this,4);
    this.lenght = iLenght;
    this.width = iWidth;
    if(typeof Rectangle._initialized == "undefined"){
        Rectangle.prototype.getArea =function(){
            return this.lenght*this.width;
        };
    }
}
Rectangle.prototype = new Polygon();

var tri = new Triangle(12,4);
var rec = new Rectangle(22,11);
alert(tri.sides);
alert(tri.getArea());

alert(rec.sides);
alert(rec.getArea());
*/

/*
 * Popup window
var oNewWin=window.open("license.html","_blank","height=150,width=300i,resizable=yes");
oNewWin.moveTo(0,0);
oNewWin.resizeTo(300,500);*/


/*
 * Confirm Popup
 if(confirm("Are you sure")){
    alert("I'm so glad you're sure");
}else{
    alert("i'm sorry !!!!!");
}*/

/* prompt
var sResult = prompt("What's your name",",");
if(sResult != null){
    alert("welcom, " + sResult);
}*/


/* Status bar
window.status="You ar createa";
*/
/* Timeout and Interval
//var iTimeoutId = setTimeout(function(){alert("Hello ZIO"); },2000);
//clearTimeout(iTimeoutId);
var iNum = 0;
var iMax = 10;
var iIntervalID;

function incNum(){
    iNum++;
    
    if(iNum == iMax){
        clearInterval(iIntervalID);
    }
    alert("Bella zio");
}
iIntervalID = setInterval(incNum, 1000);
*/

/* History
alert(window.history.lenght);
*/

/* Open and Write on
var oNewWin = window.open("about::blank", "newwindow","height=150,width=300,top=10,left=10,resizable=yes");

oNewWin.document.open();
oNewWin.document.write("<html><head><title>New Window</title></head>");
oNewWin.document.write("<body>This is a Nea Window</body></html>");
oNewWin.document.close();
*/

/*Location Object*/
//location.href="license.html";
//alert(location.href);

//Navigator Object
//alert(navigator.cookieEnabled);

//Screen Object
//alert(screen.availWidth);
//
//DOM Object
//var oHTML = document.documentElement;
//alert(oHTML);
//var oBody = document.body;
//alert(oBody.parentNode == oHTML);
//var oHead = document.head;
//alert(document.nodeType);
//alert(oHTML.nodeType);
//var sxmln = oHTML.attributes.getNamedItem("xmlns").nodeValue;
//var sxmlns = oHTML.getAttribute("xmlns");
//alert(sxmln);
//alert(sxmlns + " BEòòa d");
//var oDiv = document.getElementsByTagName("div");
//alert(oDiv[0].getAttribute("class"));
//var oDiv1 = document.getElementById("side-nav");
//alert(oDiv1.getAttribute("id"));
//
/*function createMessage(){
    var oP=document.createElement("p");
    var oText = document.createTextNode("!Bella! ");
    oP.appendChild(oText);
    var oHeader = document.getElementsByTagName("header");
    var oDivHeader = oHeader[0].getElementsByTagName("div");
    oDivHeader[1].appendChild(oP);
}
function replaceMessage(){
    var oP=document.createElement("span");
    var oText = document.createTextNode("!Bella! ");
    oP.appendChild(oText);
    var oHeader = document.getElementsByTagName("header")[0];
    var oDivHeader = oHeader.getElementsByTagName("div")[1];
    var oOld = oDivHeader.getElementsByTagName("span")[0];
    oOld.parentNode.replaceChild(oP,oOld);

}
var oObj = {};
oObj.acceptNode = function (oNode){
    return (oNode.tagName == "HTML") ? NodeFilter.FILTER_REJECT :
    NodeFilter.FILTER_ACCEPT;
};
var iter = document.createNodeIterator(document,NodeFilter.SHOW_ALL,oObj,false);
var node1 = iter.nextNode();
var node2 = iter.nextNode();
var node3= iter.nextNode();
alert(node3.tagName);
*/

//alert(document.implementation.hasFeature("Core","3.0"));
//
//Regular Expression
//var sToMatch ="cat cot cat io at bat at huat";
//var reCat = /at/g;
//var arrM = reCat.exec(sToMatch);
//alert(sToMatch.search(reCat));
//
/*var sToChange ="The sky is blue";
var reRed = new RegExp("blue");
//alert(sToChange.replace(reRed,"red"));
alert(sToChange.replace(reRed,function(sMatch){
    return "red";
}));*/
/*var sColor ="r,g,b,l,k";
//var reCo=/\,/;
//var arr = sColor.split(reCo);
//alert(arr.join());
var reRGB=/[rgb]/gi;
alert(sColor.match(reRGB));
var reLK = /[^rgb\,]/gi;
alert(sColor.match(reLK));
var reGL=/[g-l]/gi;
alert(sColor.match(reGL));*/
/*
String.prototype.trim = function (){
    var reExtraSpace = /^\s+(.*?)\s+$/;
    return  this.replace(reExtraSpace, "$1");
};
var sTest = "   this a test trim    ";
alert("["+sTest+"]");
alert("["+sTest.trim()+"]");
alert(RegExp.$1);
*/
/*
var reBadWord = /vaffanculo|ciuccia/gi;
var sUser = "A chicche vaffanculo e ciuccia";
alert(sUser.replace(reBadWord,function(sMatch){
    return sMatch.replace(/./g,"*");
}));
*/
/*
String.prototype.stripHTML = function (){
    var reTag = /<(?:.|\s)*?>/g;
    return this.replace(reTag,"");
};
var sTest = "<b>Bella zio </b>";
alert(sTest.stripHTML());
*/
/*
var sToM = "one two\nthree fours\nfive six";
alert(sToM);
//var reWords = /\b(\S+?)\b/g;
var reWords =/(?:\w+)$/gm;
alert(sToM.match(reWords));
*/
/*
var sToMatch = "bbq is short for barbecue";
var reB = /b/g;
alert(reB.exec(sToMatch));
alert(reB.lastIndex);
reB.lastIndex = 0;
alert(reB.exec(sToMatch));
alert(reB.lastIndex);
*/
/*
function isValidDate(sText){
    var reDate =/(?:[1-9]|[12][0-9]|3[01])\/(?:[1-9]|1[0-2])\/(?:19|20\d{2})/;
    return reDate.test(sText);
}
alert(isValidDate("5/3/2040"));
alert(isValidDate("10/12/2009"));
alert(isValidDate("10/15/2009"));
*/
/*
function isValidEmail(sText){
    var reEmail = /^(?:\w+\.?)*\w+@(?:\w+\.?)*\.\w+$/;
    return reEmail.test(sText);
}
alert(isValidEmail("cipmiky@gmail.com"));
alert(isValidEmail("capitanjack87@hotmail.it"));
alert(isValidEmail("genio_eugenio@libeit"));
alert(isValidEmail("michele.cipolla_4444@libero.it"));
*/

/* Browser Detection 
var sUserAgent= navigator.userAgent;
var fAppVers = parseFloat(navigator.appVersion);
function compareVersion(sVer1,sVer2){
    var aVers1 = sVer1.split(".");
    var aVers2 = sVer2.split(".");

    if(aVers1.length > aVers2.length){
        for(var i =0; i<aVers1.length; i++){
            aVers2.push("0");
        }
    }else if(aVers1.length < aVers2.length){
         for(var i =0; i<aVers2.length; i++){
            aVers1.push("0");
        }
    }

    for(var i=0; i< aVers1.length; i++){

        if(aVers1[i]<aVers2[i]){
            return -1;
        } else if (aVers1[i]>aVers2[i]){
            return 1;
    }
}
return 0;
}
    

//alert(sUserAgent);
//alert(fAppVers);
//alert(compareVersion("0.4.3","0.4.2"));
//
//Opera
var isOpera = sUserAgent.indexOf("Opera")>-1;
if(isOpera){
    var fOperaVers;
    if(navigator.appName=="Opera"){
        fOperaVers = fAppVers;
}
}
// Safari and webkit browser
var isKHTML = sUserAgent.indexOf("KHTML")>-1 || sUserAgent.indexOf("Konqueror")>-1 || sUserAgent.indexOf("AppleWebKit")> -1;
if(isKHTML){
    isChrome = sUserAgent.indexOf("Chrome")>-1;
    isSafari = sUserAgent.indexOf("AppleWebKit")>-1 && !isChrome;
    isKonq = sUserAgent.indexOf("Konqueror")>-1;

    var isMinChrome30 =false;
    var isMinChrome31_0_1664_3 =false;
    var isMinChrome31_0_1650_16 = false;
    var sMinChrome32 = false;
    var isMinChrome33 = false;
    var isMinChrome34 =false;
    var isMinSafari1 =false;
    var isMinSafari1_2 = false;
    var isMinKonq2_2 = isMinKonq3 = isMinKonq3_1 = isMinKonq3_2 = false;
    if(isSafari){
        var reAppleWebKit = new RegExp("AppleWebKit\\/(\\d+(?:\\.\\d*)?)");
        reAppleWebKit.test(sUserAgent);
        var fAppleWebKitVersion = parseFloat(RegExp["$1"]);

        isMinSafari1 = fAppleWebKitVersion >=85;
        isMinSafari1_2 = fAppleWebKitVersion>=124;
    }else if(isKonq){
        var reKonq = new RegExp("Konqueror\\/(\\d+(?:\\.\\d+(?:\\.\\d)?)?)");
        reKonq.test(sUserAgent);
        isMinKonq2_2 = compareVersion(RegExp["$1"],"2.2")>=0;
        isMinKonq3 = compareVersion(RegExp["$1"],"3.0")>=0;
        isMinKonq3_1 = compareVersion(RegExp["$1"],"3.1")>=0;
        isMinKonq3_2 = compareVersion(RegExp["$1"],"3.2")>=0;
    } else if(isChrome){
        var reChrome = new RegExp("Chrome\\/(\\d+(?:\\.[0-9](?:\\.\\d+(?:\\.\\d+)?)?)?)");
        reChrome.test(sUserAgent);

        isMinChrome30 = compareVersion(RegExp["$1"],"30")>=0;
        isMinChrome31_0_1650_16 = compareVersion(RegExp["$1"],"31.0.1650.16")>=0;
        isMinChrome31_0_1664_3 = compareVersion(RegExp["$1"],"31.0.1664.3")>=0;
        isMinChrome32 = compareVersion(RegExp["$1"],"32")>=0;
        isMinChrome33 =compareVersion(RegExp["$1"],"33")>=0;
        isMinChrome34 = compareVersion(RegExp["$1"],"34")>=0;
    }
    }
// IE Broswer
var isIE = sUserAgent.indexOf("compatible")>-1 && sUserAgent.indexOf("MSIE")>-1 && !isOpera;

if(isIE){
    var isMinIE4,isMinIE5,isMinIE5_5,isMinIE6;
    isMinIE4=isMinIE5=isMinIE5_5=isMinIE6=false;

    var reIE = new RegExp("MSIE (\\d+\\.\\d+)");
    reIE.test(sUserAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    isMinIE4 = fIEVersion >= 4;
    isMinIE5 = fIEVersion >= 5;
    isMinIE5_5 = fIEVersion >= 5.5;
    isMinIE6 = fIEVersion >= 6.0;
}
//Mozilla
var isMoz = sUserAgent.indexOf("Gecko")>-1 && !isKHTML;
if(isMoz){
    var isMinMoz1,isMinMoz1_4,isMinMoz1_5;
    isMinMoz1=isMinMoz1_4=isMinMoz1_5=false;

    var reMoz = new RegExp("rv:(\\d+\\.\\d+(?:\\.\\d+)?)");
    reMoz.test(sUserAgent);

    isMinMoz1 = compareVersion(RegExp["$1"],"1.0")>=0;
    isMinMoz1_4 = compareVersion(RegExp["$1"],"1.4")>=0;
    isMinMoz1_5 = compareVersion(RegExp["$1"],"1.5")>=0;
}*/
// Event Handler

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