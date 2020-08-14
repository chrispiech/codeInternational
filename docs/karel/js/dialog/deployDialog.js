function DeployDialog() {
}

DeployDialog._boxy = null;
DeployDialog._karelIdeHandle = null;

DeployDialog._boxyExists = function() {
   return DeployDialog._boxy && DeployDialog._boxy.isVisible();
}

DeployDialog.deploy = function() {
   var MIN_INPUT_LENGTH = 5;
   var MAX_INPUT_LENGTH = 15;

   var code = DeployDialog._karelIdeHandle.getCode();
   var author = document.getElementById('deployAuthor').value;
   var title = document.getElementById('deployProgramName').value;
   var world = document.getElementById('deployWorld').value;
   var errorMessages = {
      'Your Program':code,
      'Program Name':title,
      'Your Name':author,
   }
   if(code == STARTER_CODE) {
      DeployDialog.displayError("Can not submit starter code.");
      return;
   }
   
   for (key in errorMessages) {
      value = errorMessages[key];
      if (isInputShort(value)){
         DeployDialog.displayError(key + " is too short");
         return
      }
      if (key != 'Your Program' && isInputLong(value)) {
         DeployDialog.displayError(key + " is too long");
         return
      }
   }
   if(world == '') {
      DeployDialog.displayError("You must provide a Default World.");
      return
   }
   DeployDialog.clearError();

   var loadingScreen = new Boxy("<p>Please wait...</p>", {title: "Deploying", closeable: false, modal:true});
   var windowHeight = $(window).height() - 1;
   var windowWidth = $(window).width() - 1;
   loadingScreen.centerAt(windowWidth * 0.5, windowHeight * 0.4);
   var submitHandler = function(data) {
	  console.log('submtter ' + data);
      var html = '';
      if(data == 'ERROR') {
         html = '<div id="dialogDeploySuccess"><b>Error. Something went wrong.</b></div>'
      } else {
         var url = 'http://'+ document.location.hostname + '/program.html#/' + data;
         var successHtml = '<div id="dialogDeploySuccess"><b>Success! Here is your link.<br/>You can share it with anyone: </b><br/><br/><a id="userProgramLink" href="'+url+'">'+url+'</a></div>';
      }
      DeployDialog._boxy.setContent(successHtml);
      DeployDialog.resize();
      loadingScreen.hideAndUnload();
   }
   var postParameters = {
      'code':code,
      'author':author,
      'title':title,
      'world':world
   }
   $.post("http://www.stanfordkarel.appspot.com/submitRemote", postParameters,submitHandler);
   
   
   function isInputShort(input) {
      return input.length < MIN_INPUT_LENGTH;
   }

   function isInputLong(input) {
      return input.length > MAX_INPUT_LENGTH;
   }
}

DeployDialog.clearError = function() {
   $('#deployError').html('');
}

DeployDialog.displayError = function(msg) {
   var errorMsg = 'Error: ' + msg;
   $('#deployError').html(errorMsg);
}

DeployDialog.createDeployDialog = function(karelIde) {
   if($('#deployError'))$('#deployError').remove();
   if($('#deployProgramName'))$('#deployProgramName').remove();
   if($('#deployAuthor'))$('#deployAuthor').remove();
   if($('#deployWorld'))$('#deployWorld').remove();

   DeployDialog._karelIdeHandle = karelIde;
   var html = '<div id="deploy">\
				<p><b>Would you like to deploy your program?</b><p><br/>\
				<b>Program Name</b><br>\
				<input type="text" name="programTitle" class="deployInput" id = "deployProgramName" size=30><br/><br/>\
				<p><b>Your Name</b><br>\
				<input class="deployInput" type="text" name="deployAuthor" id = "deployAuthor" size=30></p><br/>\
				<p><b>Default World</b><br>\
				<input class="deployInput" type="text" name="deployWorld" id = "deployWorld" size=30></p><br/>\
				<p><b><span id="deployError"></span></b></p><br/>\
				<p><button type="button" id="interactor" onClick="DeployDialog.deploy()"><b>Deploy: </b><IMG SRC="./images/uploadButton.png" HEIGHT=50 WIDTH=50 ALT="run" ALIGN="ABSMIDDLE"></button></form></p>\
			</div>'

   if (!ReferenceDialog._boxyExists()){
      DeployDialog._boxy = new Boxy(html, {title:"Deploy", modal:true});
      DeployDialog.resize();
   }
}

DeployDialog.resize = function(){
   if(DeployDialog._boxyExists()) {
      var BOXY_PERCENT = 0.8;
      var windowHeight = $(window).height() - 1;
      var windowWidth = $(window).width() - 1;
      DeployDialog._boxy.centerAt(windowWidth * 0.5, windowHeight * 0.4);
   }
}

