(function() {
    var ua = $.browser;
    if ( ua.msie && parseInt($.browser.version, 10) < 9 ) {
          window.location.href = "./error/unsupported_browser.html";
    }
})();


    
