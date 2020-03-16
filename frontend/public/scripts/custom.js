//public/js/main-script.js

jQuery(window).bind("load", function () {
   //Returns width, height of browser viewport
    var browserWidth = jQuery(window).width();
    var browserHeight = jQuery(window).height();
});

jQuery(function () {

  //e.preventDefault();
  //e.stopPropagation();
});


//FUNCTION TO CHECK IF THE STRING IS EMAIL OR NOT
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
    return re.test(jQuery.trim(email));
}
//THE FOLLIWING FUNCTION DETECTS IF THE DEVICE IS MOBILE OR NOT
function isiPhone() {
    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android|blackberry|webos)/);
    if (agentID) {
        return true;
    } else {
        return false;
    }
}
function GetIEVersion() {
    //Select Internet Explorer
    var sAgent = window.navigator.userAgent.toLowerCase();
    var Idx = sAgent.indexOf("msie");
    // If IE, return version number.
    if (Idx > 0) {
        //alert(parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx))));
        return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));
    } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
        // If IE 11 then look for Updated user agent string.
        //alert("yes");
        return 11;
    } else {
        //alert("0");
        return false;
    }
}
function stringTrimJS(string) {
    if (typeof string !== "undefined" && string !== null && string !== "") {
        //return ;
        return do_addslashes(jQuery.trim(string));
    } else {
        return "";
    }
}
//if true=empty, else not empty
function stringIsEmpty(string) {
    return (stringTrimJS(string)==="") ? true : false;
}
//strips all html tags
function stripAllHTMLTags(str) {
    if(typeof str==="undefined" || str===""){
       return "";
    }else{
       //var reg = new RegExp("", "#<\s*\/?("+str+")\s*[^>]*?>#im");
       //return str.replace(reg, "");
       str = str.replace(/\'/ig, "&#39;");
       str = str.replace(/\"/ig, "&#34;");
       str = str.replace(/(<([^>]+)>)/ig, "");
       return jQuery.trim(str.toString());
    }
 }

 function do_addslashes(str){
   if(typeof str !== "undefined" && str !== null && str !== ""){
       return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
    }else{
       return "";
    }
}
