/**
 * Created by marcioheleno on 29/06/16.
 */
'use strict';

// setamos o titulo pelo javaScript
function setConfig() {
  var texts = {
    "title":"Shopping Controller"
  };
  document.title = texts.title;
  document.getElementById("navTitle").innerHTML = texts.title;
}

setConfig();