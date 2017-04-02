ASCIIGallery= new function() {
  var BASE_URL = 'http://ascii.gallery/gadgets/';
  var STYLESHEET = BASE_URL + "css/default.css";
  var CONTENT_URL = BASE_URL + 'figlet';

  function requestStylesheet(stylesheet_url) {
    stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.type = "text/css";
    stylesheet.href = stylesheet_url;
    stylesheet.media = "all";
    document.lastChild.firstChild.appendChild(stylesheet);
  }

  function base64_decode (data) {
          // From: http://phpjs.org/functions
          // + original by: Tyler Akins (http://rumkin.com)
          // + improved by: Thunder.m
          // + input by: Aman Gupta
          // + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
          // + bugfixed by: Onno Marsman
          // + bugfixed by: Pellentesque Malesuada
          // + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
          // + input by: Brett Zamir (http://brett-zamir.me)
          // + bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
          // * example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
          // * returns 1: 'Kevin van Zonneveld'
          // mozilla has this native
          // - but breaks in 2.0.0.12!
          //if (typeof this.window['atob'] === 'function') {
          // return atob(data);
          //}
          var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            dec = "",
            tmp_arr = [];

          if (!data) {
            return data;
          }

          data += '';

          do { // unpack four hexets into three octets using index points in b64
            h1 = b64.indexOf(data.charAt(i++));
            h2 = b64.indexOf(data.charAt(i++));
            h3 = b64.indexOf(data.charAt(i++));
            h4 = b64.indexOf(data.charAt(i++));

            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

            o1 = bits >> 16 & 0xff;
            o2 = bits >> 8 & 0xff;
            o3 = bits & 0xff;

            if (h3 == 64) {
              tmp_arr[ac++] = String.fromCharCode(o1);
            } else if (h4 == 64) {
              tmp_arr[ac++] = String.fromCharCode(o1, o2);
            } else {
              tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
            }
          } while (i < data.length);

          dec = tmp_arr.join('');

          return dec;
 }

  function requestContent( node_id ) {
    var script = document.createElement('script');
    var append;
    var text = 'ascii.gallery';
    var style = 'slant';

    if ( typeof(ascii_text) != 'undefined' ) 
       text  = ascii_text;

    if ( typeof(ascii_style) != 'undefined') 
       style = ascii_style;
       
    script.src = CONTENT_URL + '?text=' + encodeURIComponent(text) + '&style=' + encodeURIComponent(style) + '&node=' + encodeURIComponent(node_id);
    document.getElementsByTagName('head')[0].appendChild(script);
  }

    this.init = function() {
      var node_id = Math.random().toString(36).substring(7);
      document.write("<div id='" + node_id + "' style='display: none'></div>");
      this.serverResponse = function(data) {
        if (!data) return;
        var hdiv = document.getElementById(data.node);
        var div = document.createElement('div');
        hdiv.appendChild(div);
        div.innerHTML = '<div class="ascii-gallery">' +
                              base64_decode(data.contents) +
                        '</div>'; 

        hdiv.style.display = 'block'; // make element visible
        hdiv.style.visibility = 'visible'; // make element visible
      }
    
      requestStylesheet(STYLESHEET);
      requestContent(node_id);
    }
}
ASCIIGallery.init();

function set_homebrew_scheme(elementid) {
    var element = document.getElementById(elementid);
    element.className += " ascii-homebrew";
    element.className = element.className.replace( /(?:^|\s)ascii-dark(?!\S)/g , '' ); 
    element.className = element.className.replace( /(?:^|\s)ascii-light(?!\S)/g , '' ); 
}

function set_dark_scheme(elementid) {
    var element = document.getElementById(elementid);
    element.className += " ascii-dark";
    element.className = element.className.replace( /(?:^|\s)ascii-homebrew(?!\S)/g , '' ); 
    element.className = element.className.replace( /(?:^|\s)ascii-light(?!\S)/g , '' ); 
}

function set_light_scheme(elementid) {
    var element = document.getElementById(elementid);
    element.className += " ascii-light";
    element.className = element.className.replace( /(?:^|\s)ascii-dark(?!\S)/g , '' ); 
    element.className = element.className.replace( /(?:^|\s)ascii-homebrew(?!\S)/g , '' ); 
}
