// ==UserScript==
// @name        BoingBoing Sanitizer
// @namespace   Violentmonkey Scripts
// @match       https://boingboing.net/*
// @grant       none
// @version     1.0
// @author      -
// @description 6/7/2021, 3:01:04 PM
// ==/UserScript==

function sanitizeBoingBoing () {
    //alert("Start sanitizeBoingBoing()");

    // get all the shop links
    var shoplinks = document.getElementsByClassName("fromtheshop");
    for (var i = shoplinks.length -1; i >= 0; i--) {
      // go up one level to the containing <li> element and delete it
      shoplinks[i].parentNode.remove();
    }

    // get all the bylines
    var bylines = document.getElementsByClassName("byline");
    for (var j = bylines.length -1; j >= 0; j--) {
      // we need the trim() b/c there's some sort of terminator or something on there
      if (bylines[j].innerHTML.trim() == "Boing Boing's Shop"){
        // go up three levels to the containing <li> element and delete it
        bylines[j].parentNode.parentNode.parentNode.remove();
      }
    }

    // get all the categories
    var categories = document.getElementsByClassName("category");
    for (var j = categories.length -1; j >= 0; j--) {
      // we need the trim() b/c there's some sort of terminator or something on there
      if (categories[j].innerHTML.trim() == "Advertisement"){
        // go up three levels to the containing <li> element and delete it
        categories[j].parentNode.parentNode.parentNode.remove();
      }
    }

    // get the video ad
    var videoad = document.getElementById("FreeStarVideoAdContainerInContent");
    if (videoad){
      // go up to the containing <div> element and delete it
      videoad.parentNode.remove();
    }

    // remove empty boxes from layout
    var uls = document.getElementsByClassName("is-one-third");
    for (var k = uls.length -1; k >= 0; k--) {
      // length of 2 is just whitespace, so kill it
      if (uls[k].innerHTML.length <= 2){
        uls[k].remove();
      }
    }

    // remove the shop link from the top of the page
    var navitems = document.getElementsByClassName("navbar-item");
    var dummystring = "https://store.boingboing.net";
    for (var l = navitems.length -1; l >= 0; l--) {
      var hrefstring = navitems[l].getAttribute("href");
      // not sure why this didn't work without the intermediate variables. Javascript is weird, stupid, and sucky...
      if (hrefstring == dummystring){
        navitems[l].remove();
      }
    }

    // remove "read the rest" entries if the the image src indicates it's from the store
    var pics = document.getElementsByTagName("img");
    for (var m = pics.length -1; m >= 0; m--) {
      if (pics[m].src.includes("/sale_")){
        // go up four levels to the containing <li> element and delete it
        pics[m].parentNode.parentNode.parentNode.parentNode.remove();
      }
      else if (pics[m].src.includes("/product_")){
        // go up four levels to the containing <li> element and delete it
        pics[m].parentNode.parentNode.parentNode.parentNode.remove();
      }
    }

    //alert("End sanitizeBoingBoing()");
}

function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

addJS_Node (null, null, sanitizeBoingBoing);
