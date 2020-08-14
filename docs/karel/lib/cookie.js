
function Cookie(cookieName) {
	
	//Creates a cookie with the give value, and days before expiration
	this.saveTextToCookie = function(value, years) {
		if (years) {
			var date = new Date();
			date.setTime(date.getTime()+(years*365*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = escape(cookieName)+"="+escape(value)+expires+"; path=/";
	}
	
	//Gets the value of the cookie with the give name
	this.readCookie = function() {
		var nameEQ = escape(cookieName) + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
		}
		return null;
	}
}
