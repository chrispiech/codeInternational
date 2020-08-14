/*
 * File: JSUtil.js
 * ---------------
 * This file contains standard utility functions that are used
 * throughout the Stanford JavaScript development library.

 */

/*
 * Function: addEventListener
 * Usage: addEventListener(element, trigger, fn);

 * ----------------------------------------------
 * Sets fn as the event listener for the specified element
 * and trigger event.  The trigger argument indicates the
 * event name, without the "on" prefix required on older
 * browsers.
 */

 function KarelCompiler() {
 }

KarelCompiler.addEventListener = function(element, trigger, fn) {
   if (element.addEventListener) {
      element.addEventListener(trigger, fn, false);
   } else if (element.attachEvent) {
      element.attachEvent("on" + trigger, fn);
   } else {
      element["on" + trigger] = fn;
   }
}

/*
 * Function: quoteHTML
 * Usage: newstr = quoteHTML(str);
 * -------------------------------
 * Returns a string whose appearance in HTML will match the characters
 * in str.
 */

function quoteHTML(str) {
   var result = "";
   for (var i = 0; i < str.length; i++) {
      var ch = str.charAt(i);
      switch (ch) {
       case ' ': ch = "&nbsp;"; break;
       case '<': ch = "&lt;"; break;
       case '>': ch = "&gt;"; break;
       case '&': ch = "&amp;"; break;
      }
      result += ch;
   }
   return result;
}

/*
 * Function: toStr
 * Usage: str = toStr(arg);
 * ------------------------
 * Implements the java2js (char) cast.
 */

function toStr(arg) {
   if ((typeof arg) == "string") return arg;
   if (arg < 0) return "";
   return String.fromCharCode(arg);
}

/*
 * Function: toInt
 * Usage: ch = toInt(arg);
 * -----------------------
 * Implements the java2js (int) cast.
 */

function toInt(arg) {
   if ((typeof arg) == "string") {
      return (arg && arg.length) ? arg.charCodeAt(0) : 0;
   } else {
      return truncate(arg);
   }
}

/*
 * Function: truncate
 * Usage: n = truncate(x);
 * -----------------------
 * Truncates the number x by discarding any fraction.
 */

function truncate(value) {
   return (value < 0) ? Math.ceil(value) : Math.floor(value);
}

/*
 * Function: round
 * Usage: n = round(x);
 * --------------------
 * Rounds the number x to the nearest integer.
 */

function round(value) {
   return Math.round(value);
}

/*
 * String class methods
 * --------------------
 * These extensions to the String class prototype implement
 * several of the Java string methods that are unimplemented
 * in JavaScript.
 */

String.prototype.trim = function() {
   return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
};

String.prototype.startsWith = function(str) {
   if (this.length < str.length) return false;
   return this.substring(0, str.length) == str;
};

String.prototype.endsWith = function(str) {
   if (this.length < str.length) return false;
   return this.substring(this.length - str.length) == str;
};

String.prototype.compareTo = function(str) {
   return (("" + this) === str) ? 0 : (this < str) ? -1 : 1;
};

String.prototype.equals = function(str) {
   return ("" + this) == str;
};

String.prototype.equalsIgnoreCase = function(str) {
   return this.toLowerCase() === str.toLowerCase();
};

String.prototype.isEmpty = function() {
   return this.length == 0;
};

String.compare = function(s1, s2) {
   return s1.compareTo(s2);
};

/*
 * Integer class methods
 * ---------------------
 * These static methods simulate a few of the more important
 * functions in Java's Integer class.
 */

function Integer() {
   alert("Error: Can't call Integer constructor");
}

Integer.parseInt = function(str, radix) {
   return parseInt(str, radix);
};

Integer.toString = function(number, radix) {
   return number.toString(radix);
};

/*
 * Double class methods
 * --------------------
 * These static methods simulate a few of the more important
 * functions in Java's Double class.
 */

function Double(n) {
   alert("Error: Can't call Double constructor");
}

Double.parseDouble = function(str) {
   return parseFloat(str);
};

Double.toString = function(number) {
   return number.toString();
};

/*
 * Character class methods
 * -----------------------
 * These static methods simulate a few of the more important
 * functions in Java's Character class.  For convenience and
 * brevity, these facilities are also defined as top-level
 * functions using their names from the C++ <cctype> library.
 */

function Character() {
   alert("Error: Can't call Character constructor");
}

Character.digit = function(ch, radix) {
   return parseInt(toStr(ch), radix);
};

Character.forDigit = function(digit, radix) {
   return digit.toString(radix);
};

Character.isDigit = function(ch) {
   return /^\d$/.test(toStr(ch));
};

Character.isJavaIdentifierPart = function(ch) {
   return /^[A-Za-z0-9_]$/.test(toStr(ch));
};

Character.isJavaIdentifierStart = function(ch) {
   return /^[A-Za-z_]$/.test(toStr(ch));
};

Character.isLetter = function(ch) {
   return /^[A-Za-z]$/.test(toStr(ch));
};

Character.isDigit = function(ch) {
   return /^[0-9]$/.test(toStr(ch));
};

Character.isLetterOrDigit = function(ch) {
   return /^[A-Za-z0-9]$/.test(toStr(ch));
};

Character.isLowerCase = function(ch) {
   return /^[a-z]$/.test(toStr(ch));
};

Character.isUpperCase = function(ch) {
   return /^[A-Z]$/.test(toStr(ch));
};

Character.isWhitespace = function(ch) {
   return /^\s$/.test(toStr(ch));
};

Character.toUpperCase = function(ch) {
   return ch.toUpperCase();
}

Character.toLowerCase = function(ch) {
   return ch.toLowerCase();
}

var isalnum = Character.isLetterOrDigit;
var isalpha = Character.isLetter;
var isdigit = Character.isDigit;
var islower = Character.isLowerCase;
var isspace = Character.isWhitespace;
var isupper = Character.isUpperCase;
var tolower = Character.toLowerCase;
var toupper = Character.toUpperCase;

function iscntrl(ch) {
   var code = toInt(ch);
   return ch < 32 || ch == 127;
};

function isgraph(ch) {
   var code = toInt(ch);
   return ch > 32 && ch < 127;
};

function isprint(ch) {
   var code = toInt(ch);
   return ch >= 32 && ch < 127;
};

function ispunct(ch) {
   return isgraph(ch) && !isalnum(ch);
};

function isxdigit(ch) {
   return /^[A-Fa-f0-9]$/.test(toStr(ch));
};



function isMobile() {
   var useragent = navigator.userAgent;
   useragent = useragent.toLowerCase();

   if (useragent.indexOf('iphone') != -1 || useragent.indexOf('symbianos') != -1 || useragent.indexOf('ipad') != -1 || useragent.indexOf('ipod') != -1 || useragent.indexOf('android') != -1 || useragent.indexOf('blackberry') != -1 || useragent.indexOf('samsung') != -1 || useragent.indexOf('nokia') != -1 || useragent.indexOf('windows ce') != -1 || useragent.indexOf('sonyericsson') != -1 || useragent.indexOf('webos') != -1 || useragent.indexOf('wap') != -1 || useragent.indexOf('motor') != -1 || useragent.indexOf('symbian') != -1 ) {
     return true;
   }
   return false;
}

function loadDoc(url, callback) {
	var request;

	if (window.XMLHttpRequest) { 
		request = new XMLHttpRequest();     // Firefox, Safari, ...
	} else if (window.ActiveXObject) {
    		request = new ActiveXObject("Microsoft.XMLHTTP");  // Internet Explorer 
 	} 

	request.open("GET", url, false);
	request.send(null);	

	if (request.status == 404) {
		alert("file not found");
	}
	callback(request.responseText);
}

function disableSelection(target){

    if (typeof target.onselectstart!="undefined") //IE route
        target.onselectstart=function(){return false}

    else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
        target.style.MozUserSelect="none"

    else //All other route (ie: Opera)
        target.onmousedown=function(){return false}

    target.style.cursor = "default"
}

function AssertException(message) { this.message = message; }
   AssertException.prototype.toString = function () {
   return 'AssertException: ' + this.message;
}

function assert(exp, message) {
   if (!exp) {
      throw new AssertException(message);
   }
}

function deepCopyUtil(p,c) {
   if(p == null) return p;
var c = c||{};
for (var i in p) {
  if (typeof p[i] === 'object' && p[i] != null) {
    c[i] = (p[i].constructor === Array)?[]:{};
    deepCopyUtil(p[i],c[i]);
  } else c[i] = p[i];}
return c;
}

function IdCounter(){}
IdCounter.count = 0;
IdCounter.getUniqueId = function() {
   IdCounter.count += 1;
   return 'id' + IdCounter.count;
}

