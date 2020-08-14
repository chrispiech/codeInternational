
function Cookie(cookieName) {
	function loadCookie() {
		if (codeMirror) {
		    var program = readCookie(cookieName);
		    if (program) {
				codeMirror.setCode(program);
			}
		}
	}
	
	//Creates a cookie with the give key, value, and days before expiration
	this.createCookie = function(value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = escape(cookieName)+"="+escape(value)+expires+"; path=/";
	}
	
	//Gets the value of the cookie with the give name
	function readCookie() {
		var nameEQ = escape(cookieName) + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
		}
		return null;
	}
	
	function saveTextToCookie() {
		if (codeMirror) {
			var program = codeMirror.getCode();
			if (program) {
			    createCookie(cookieName, program, 1);
			}
		}
	}
}
