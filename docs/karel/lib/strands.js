/**
Strands - JavaScript Cooperative Threading and Coroutine support
Copyright (C) 2007 Xucia Incorporation
Author - Kris Zyp - kriszyp@xucia.com
 /* ***** BEGIN LICENSE BLOCK *****
  * Version: MPL 1.1/GPL 2.0/LGPL 2.1
  *
  * The contents of this file are subject to the Mozilla Public License Version
  * 1.1 (the "License"); you may not use this file except in compliance with
  * the License. You may obtain a copy of the License at
  * http://www.mozilla.org/MPL/
  *
  * Software distributed under the License is distributed on an "AS IS" basis,
  * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  * for the specific language governing rights and limitations under the
  * License.
  * ***** END LICENSE BLOCK ***** */
function temp() {
		var standardPush = Array.prototype.push;
	var debugMode =document.location.search.indexOf("debug=true") > -1;

	var push = function(obj,value) {
		return standardPush.call(obj,value); // preserve default push behavoir
	}
	var suspendedFrame = null;
	var currentThread = {};
	var Suspend = {	// returned value when a coroutine is suspended, and state of the top frame when suspended
		toString: function() { return "SUSPENDED" }
	}
	/**
	 * This is wrap the given function in a try catch when debug mode is off. If an error is thrown, the error message will be displayed with an alert
	 */		
	var tryCatch = function(func) {
		return strands.errorWrapper(func)();
	}
	var specificNotify = {};
	Future = function(func,args,thisObj,callback) {
		this.topFrames = [];
		var self = this;
		this.fulfill = function(retValue) {
			if (retValue == specificNotify) {
				var targetFrames = retValue.targetFrames;
				retValue = retValue.retValue;
			}
			else
				self.value = retValue;
			var frame;
			while (frame = (targetFrames || self.topFrames).shift()) { // iterate through all the resulting threads/frames
				// This is the beginning of a resume
				currentThread = {};
		//		checkRestState();
				if (!frame._r) 
					throw new Error("Future called without being in a result state");
				frame.retValue = retValue; 
				if (frame._r.NRY)
					frame._r.thread = currentThread;
				while (frame._r.parentFrame) {
					frame = frame._r.parentFrame; // now the bottom frame
					frame._r.thread = currentThread;
				}
				if (frame._r.func) {
					suspendedFrame = frame; // the .parents indicates it was a NotReadyYet function, so there is no suspended frames above it
					tryCatch(function() {
						frame._r.func.call(frame._r.frameThis); // now resume	
					});
				}
				else {
					//A thread was resumed with no call stack
					suspendedFrame = null;
				}
			}
		}
		if (func) {
			if (callback)
				this.addListener(callback);
			(function() {
				with(_frm(this,arguments,[],[])) {
					var value = func.apply(thisObj || window,args||[]);
					if (value===_S) return _s();
					self.fulfill(value);
				}
			})();			
		}
	}
	Future.prototype = {
		addListener : function(func) {
			push(this.topFrames,func);
		},
		interrupt : function () {
			this.fulfill(strands.INTERRUPTED);
		},
		isDone : function() {
			return this.hasOwnProperty('value');
		},
		result : function(timeout) {
			if (this.hasOwnProperty('value') || (suspendedFrame && suspendedFrame.retValue)) { // The future has been called, we can resume
				var value = (suspendedFrame ? suspendedFrame.retValue : 0) || this.value;
				suspendedFrame = null; // make sure we don't get any callers picking this up, we may not need this
				if (value == strands.TIMEOUT || value== strands.INTERRUPTED)
					throw value;
				return value;// the future has already been fulfilled so we can just return the result
			}
			var topFrame = {}
			push(this.topFrames,topFrame);
			var self = this;
			topFrame._r = {func:function() {return self.result()}};
			suspendedFrame = topFrame;
			if (timeout) {
				setTimeout(function() {
					self.fulfill(specificNotify = {retValue:strands.TIMEOUT,targetFrames:[topFrame]});
				},timeout);
			}
			return Suspend;
		}
	}


	var CallFrame = function() {
	}
	var Construct = function() {};
	var defaultScope = CallFrame.prototype = {
		_s : function(exception) { // this handles exceptions as well as suspensions
				if (exception) {
					if (this._r.ecp == null)
						throw exception;
					this.$_thr = true;
					this.$_ex  = exception;
					this._cp  = this._r.ecp;
					return;
				}
				var info = this._r;
				if (!suspendedFrame)
					NoSuspendedFrame; // This can be caused by returning Suspend without actually being in a suspension, or if _S ends up in a variable
				suspendedFrame._r.parentFrame = this;
				info.childFrame = suspendedFrame; // it needs to be reexecuted
				suspendedFrame = this;
				if (this._r.thread == currentThread) // Assertion
					SuspensionFrameShouldNotBeCurrentThread;
				return Suspend;
			},
		_S : Suspend,
		_keys : function(obj) {
			var keys = [];
			for(var n in obj) 
				push(keys,n)	;
			return keys;
		},

		_new : function(value,args) { // create a new instance of an object or constructor
			if (value === Suspend)
				return value;
			var frame = _frm(this,arguments,[],[]);				
			if (frame._cp == 0) {
				frame._cp=1;
				frame.Const= value;
				Construct.prototype = value.prototype;
				if (value === String || value === Number) // these classes must not have a target this
					return args.length?new value(args[0]):new value;
				if (value !== Date) { // date does not have to directly instantiated, but it does need an undefined scope, it also needs to be able to handle variable arguements
					frame.newThis = new Construct();
				}
			}
			if ((value = frame.Const.apply(frame.newThis,args?args:[])) == Suspend) return frame._s();
			if (value instanceof Object) return value; // if the new returns a different value than "this"			
			return frame.newThis;
		},
		_cp : 0
	}
	/**
	 * Suspend execution for the given amount time
	 * @param time	milliseconds to pause
	 */
	sleep = function(time) {
		alert("you got here");
		var frame = _frm(this,arguments,[],[]);
		alert("and here");
		if (!frame._cp) { // if it is zero
			alert("in ur loop");
			frame._cp = 1;
			setTimeout((frame.future = new Future).fulfill,time);
			frame.future.result();
			return frame._s();
		}
		alert("our ur loop here");
		frame.future.result(); // this is the result operation to resume
	}

	strands = { 
		defaultScope : defaultScope,
		loadScope : function(){},
		/**
		 * This function that will be called to return a function that should execute the provided function in order to initialize the stack 
		 * Any time a new stack is created, the returned function will be used. This provides a mechanism to wrap all processing
		 * within a try catch.
		 */
		errorWrapper : function(func) {
			var newFunc = function() {
				if (debugMode)
					return func.apply(this,arguments);			
				try {
					return func.apply(this,arguments);			
				}
				catch (e) {
					alert(e.message || e);
				}
			}
			newFunc.noTryCatch = func;
			return newFunc;
		},
		TIMEOUT : {toString:function(){return "Thread timeout"}},
		INTERRUPTED : {toString:function(){return "Thread interrupted"}},
		sleep : sleep,
		/**
		 * This is a constant that is returned from functions to indicate that the code execution is suspending
		 */
		Suspension : Suspend,

	/**
 * Makes an XHR (Ajax) request using the given url, method, and post data (for POST requests) and 
	returns contents that came from the server.

 * @param {Object} url
 * @param {Object} method
 * @param {Object} postData
 */
	request : function(url, method, postData) {
		var frame = _frm(this,arguments,[],[]);
		if (frame._cp == 0) {
			var getXMLHttpRequest = function () {
				if (parent.XMLHttpRequest)
			        return new parent.XMLHttpRequest();
				else if (window.ActiveXObject)
			        return new ActiveXObject("Microsoft.XMLHTTP");
			}
		 	var xhr = getXMLHttpRequest();
			frame.future = new Future();
			var ajaxDataReader = function () {
				if (xhr.readyState == 4) {
			        // only if "OK"
			        var loaded;
			        try {
			        	var status = xhr.status;
			        	loaded = xhr.responseText.length > 0;//firefox can throw an exception right here
			        } catch(e) {}
			        if (loaded) 
	    				frame.future.fulfill(xhr.responseText);				
					else
						frame.future.interrupt();
	        		xhr = null; // This is to correct for IE memory leak
				}
			}
			frame._cp = 1;
		    xhr.open(method || "POST", url, true); 
			xhr.onreadystatechange = ajaxDataReader;
		    xhr.send(postData);
		}
		var result = frame.future.result();
		if (result == frame._S) frame._s();
		return result;
	},
	compilerUrl : 'js/compiler.js',
	gecko : {}.__proto__,
	loadScript : function(url) {	
		var frame = _frm(this,arguments,[],[]);
		switch(frame._cp) {
			case 0:frame.future = new Future();
				frame.url = url;
				frame._cp = 1;
			case 1: case 2:case 3:url = frame.url;
			function load() {
				if (strands.gecko) {
					if (frame._cp != 2) {					
					    var scriptTag = document.createElement("script"); // must use the document that supports events, not his one
					    scriptTag.onload = frame.future.fulfill;
					    scriptTag.type= 'application/javascript;version=1.7';
						scriptTag.setAttribute("src", url);
					    document.body.appendChild(scriptTag); // This is supposed to be asynchronous, but sometimes it will get its request before continuing
				    }
					frame._cp = 2;
				    return frame.future.result();
			    }			    
				else {
					var source = strands.request(url,'GET');
					if (source == Suspend) return Suspend;
					eval(source);
				}
			}
			var compOptions,shorten;
			if (url.match(/\.jss$/)) {
				compOptions = {};
				shorten = 1;
			}
			else if (url.match(/\.js17$/)) {
				if (strands.gecko) 
					shorten = 0;
				else {
					compOptions = {source:'js17'};
					shorten = 2;
				}				
			} 
			if (strands.precompiled) 
				url = url.substring(0,url.length-shorten);
			else
			{
				if (compOptions) {
					if (!strands.compiler || frame._cp == 2) {
						frame._cp = 2; 
						var compiler;
						if ((compiler = strands.request(strands.compilerUrl,'GET'))==Suspend)
							return frame._s();
						eval(compiler);
						frame._cp = 3;
						strands.compiler = new StrandsCompiler(compOptions);
					}
					var source;
					if ((source = strands.request(url,'GET'))==Suspend)
						return frame._s();
					source = strands.compiler.compile(source);
					eval(source);
					return;
				}
			}
			if (load() == Suspend) return frame._s();
		}
	}
}
coroutine = strands.gecko ? eval("function(func) {"+
"return function() {	"+
"			if (suspendedFrame && suspendedFrame._r.thread == currentThread && suspendedFrame._r.func) {"+
"				var frame = suspendedFrame;"+
"				var gen = frame._r;"+
"				delete gen.thread;"+
"				suspendedFrame = gen.childFrame; "+// if this is undefined it means we are at the top of the resume stack
"				delete gen.childFrame; "+// for assertions
"				var result = suspendedFrame._r.func(); "+// resume the stack
"				if (result == Suspend) return frame._s(); "+// if we have to suspend again right away
"		}"+
"		else { "+//fresh entry
"			var gen = func.apply(this,arguments);"+
"			if (!(gen != null && typeof(gen) == 'object' &&"+
"					typeof(gen.next) == 'function' && typeof(gen.send) == 'function'))"+
"				return gen;"+
"			var frame = new CallFrame;"+
"			frame._r = gen;"+
"			frame._r.func = arguments.callee;"+
"			var result;"+
"		}"+
"		try{"+
"			while(1){"+
"				coreturn = undefined; "+// global return value
"				result = gen.send(result);"+
"				if (result == Suspend) return frame._s();"+
"			} "+
"		} catch(e if e == StopIteration) {"+
"			return coreturn;"+
"		}		"+
"	}"+
"}") : function() {throw new Error("can not call coroutine except as a function wrapper");};	/** 
	 * This creates a new Strands call frame. It becomes the scope for the function maintains variables and parameters across suspensions and resumes. It should only be used in compiled code
	 */	
	_frm = function(frameThis,args,argNames,varNames,noScopeNeeded) {
		if (args.caller) args.caller=0; // this fixes a big memory leak;
		if (suspendedFrame) {
			// if it is loading we start a new frame
			if (suspendedFrame._r.thread == currentThread && suspendedFrame._r.func && !suspendedFrame._r.NRY) {// this means we are resuming
				var frame = suspendedFrame;
				//TODO: Implement this:
				if (frame._r.func != args.callee && frame._r.func.toString() != args.callee.toString()) {// this means the function that is being called has changed, the function has been replaced, so we need to call the orginal one
	//				if (this!=frame._r.frameThis) {
						suspendedFrame = null;
						StackAlterationError("The function has changed, the means for handling this right now is not complete");
		//			}
/*					var retValue = frame.func.call(frame.frameThis);
					if (retValue == _S){
						// this is the tricky part, we need to call the next function and have it be guaranteed to return a _S
					}
					else {// we need to come up with a way to ensure that we have the right rv#
						frame["rv" + frame.cp++] = retValue;  //make sure we increment the cp so we are the next part
					}
					return frame;*/
				}
				delete frame._r.thread;
	
				suspendedFrame = frame._r.childFrame; // if this is undefined it means we are at the top of the resume stack
				delete frame._r.childFrame; // for assertions
				if (suspendedFrame && suspendedFrame._r) {//Assertion stuff
					if (! suspendedFrame._r.parentFrame)
						SuspendedFrameHasNoParentFrame;
					else
						delete suspendedFrame._r.parentFrame;				
				}
				return frame;
			}
			else { // this case means that there is a suspendedFrame variable left over from a previous resume/suspension
				// It should only be a left over from a suspension, and it should be the bottom frame.  A resume should null out suspendedFrame
	
				suspendedFrame = null;  // a suspension took place somewhere else, so now we can get rid of this
			}
		}
		frame = new CallFrame;
		frame._r = {};		

		frame._cp = 0; // Why is this needed for opera to work? somewhere the prototype _cp is getting set, need to figure out why
		frame.arguments = args;
		frame._scope = frame;
		frame._r.func = args.callee;
		frame._r.frameThis  = frameThis;
		for( var i = 0; i < argNames.length; i++ ) 
			frame[argNames[i]] = args[i];
		for( var i = 0; i < varNames.length; i++ ) 
			frame[varNames[i]] = undefined; // declare all the variables
		return frame;
	}
	function Generator(frame){
		this.frame = frame;
	};
	Generator.prototype = {
		next : function() {
			return this.send();
		},
		send : function(value) {			
			suspendedFrame = this.frame;
			suspendedFrame._r.thread = currentThread;
			_receive = value;
			return this.frame._r.func.call(this.frame._r.frameThis);			
		}
	} 
	_gen = function(frame) {
		return new Generator(frame);
	}
		
};
temp();
