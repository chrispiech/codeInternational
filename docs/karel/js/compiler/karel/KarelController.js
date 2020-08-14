/*
 * File: KarelController.js
 * ------------------------
 * This file is a stub for a more general controller.  I wanted
 * to get something working but plan to generalize this for
 * other applications.
 */

function KarelController(app, id) {
   if (!id) id = "controller";
   this.app = app;
   this.state = KarelController.STOPPED;
   this.div = document.getElementById(id);
   this.div.innerHTML =
      "<img id=Run src='images/RunIcon.png' height=36>&nbsp;&nbsp" +
      "<img id=Stop src='images/StopIcon.png' height=36>&nbsp;&nbsp" +
      "<img id=StepOver src='images/StepOverIcon.png' height=36>&nbsp;&nbsp" +
      "<img id=StepIn src='images/StepInIcon.png' height=36>&nbsp;&nbsp" +
      "<img id=StepOut src='images/StepOutIcon.png' height=36><br>" +
      "<table border=0><tr>" +
      "<td valign=middle><img src='images/TortoiseIcon.png' height=17></td>" +
      "<td valign=middle>" +
      "<div id=Track style='height:15px; width:170px;'></div></td>" +
      "<td valign=middle><img src='images/HareIcon.png' height=20></td>" +
      "</tr></table>";
   var track = this.track = document.getElementById("Track");
   track.style.backgroundColor = "#CCCCCC";
   track.style.border = "solid 1px black";
   track.style.cursor = "arrow";
   var knob = this.knob = document.createElement("div");
   knob.style.position = "relative";
   knob.style.width = track.clientHeight + "px";
   knob.style.height = track.clientHeight + "px";
   knob.style.backgroundColor = "#6699FF";
   track.style.cursor = "arrow";
   this.trackWidth = track.clientWidth;
   this.knobWidth = track.clientHeight;
   this.mouseStart = -1;
   track.appendChild(knob);
   this.setSpeed(0.5);
   var mouseDown = function(e) {
      var x = (e || window.event).clientX;
      var kx = getElementLocation(knob).x;
      if (x < kx || x > kx + knob.clientWidth) {
         var dx = ((x < kx) ? -1 : +1) * knob.clientWidth / track.clientWidth;
         app.controller.setSpeed(app.controller.speed + dx);
      } else {
         app.controller.mouseStart = x;
         app.controller.startSpeed = app.controller.speed;
      }
   }
   var mouseUp = function(e) {
      app.controller.mouseStart = -1;
   }
   var mouseMove = function(e) {
      var x = (e || window.event).clientX;
      if (app.controller.mouseStart >= 0) {
         var full = track.offsetWidth - knob.offsetWidth;
         var ds = (x - app.controller.mouseStart) / full;
         app.controller.setSpeed(app.controller.startSpeed + ds);
      }
   }
   addEventListener(track, "mousedown", mouseDown);
   addEventListener(track, "mouseup", mouseUp);
   addEventListener(track, "mousemove", mouseMove);
   this.bindButton("Run", "runAction");
   this.bindButton("Stop", "stopAction");
   this.bindButton("StepOver", "stepOverAction");
   this.bindButton("StepIn", "stepInAction");
   this.bindButton("StepOut", "stepOutAction");
}

KarelController.STOPPED = 0;
KarelController.RUNNING = 1;
KarelController.STEPPING_OVER = 2;
KarelController.STEPPING_IN = 3;
KarelController.STEPPING_OUT = 4;

KarelController.prototype.bindButton = function(id, action) {
   var self = this;
   var fn = function(e) { self[action].call(self); };
   addEventListener(document.getElementById(id), "click", fn);
};

KarelController.prototype.setSpeed = function(speed) {
   speed = Math.max(0, Math.min(1, speed));
   this.speed = speed;
   this.knob.style.left = speed * (this.trackWidth - this.knobWidth);
   this.app.world.setSpeed(speed);
};

KarelController.prototype.runAction = function(callback) {
   this.callback = callback;
   this.startKarel(KarelController.RUNNING);
};

KarelController.prototype.stopAction = function() {
   this.stopKarel();
};

KarelController.prototype.stepOverAction = function() {
   this.startLevel = this.app.vm.frameStack.length;
   this.startKarel(KarelController.STEPPING_OVER);
};

KarelController.prototype.stepInAction = function() {
   this.startLevel = this.app.vm.frameStack.length;
   this.startKarel(KarelController.STEPPING_IN);
};

KarelController.prototype.stepOutAction = function() {
   this.startLevel = this.app.vm.frameStack.length;
   this.startKarel(KarelController.STEPPING_OUT);
};

KarelController.prototype.startKarel = function(state) {
   this.app.vm.startCheck();
   this.state = state;
   this.startTimer();
};

KarelController.prototype.startTimer = function() {
   var self = this;
   var fn = function() { self.clockTicked.call(self); };
   var delay = KarelController.SLOW_DELAY +
               (KarelController.FAST_DELAY - KarelController.SLOW_DELAY) *
               this.speed;
   this.timer = setTimeout(fn, delay);
};

KarelController.prototype.stopKarel = function(state) {
   this.state = KarelController.STOPPED;
};

KarelController.prototype.clockTicked = function() {
   var app = this.app;
   var vm = app.vm;
   if (!vm.cf) {
      this.state = KarelController.STOPPED;
      return;
   }
   try {
      var running = true;
      while (running) {
         if (vm.atStatementBoundary()) running = false;
         vm.step();
         if (!vm.cf) this.state = KarelController.STOPPED;
      }
   } catch (e) {
      alert(e);
      this.state = KarelController.STOPPED;
      vm.reset();
   }
   vm.world.updateViews();
   switch (this.state) {
    case KarelController.STEPPING_IN:
      this.state = KarelController.STOPPED;
      break;
    case KarelController.RUNNING:
      this.startTimer();
      break;
    case KarelController.STEPPING_OVER:
      if (vm.frameStack.length <= this.startLevel) {
         this.state = KarelController.STOPPED;
      } else {
         this.startTimer();
      }
      break;
    case KarelController.STEPPING_OUT:
      if (vm.frameStack.length < this.startLevel) {
         this.state = KarelController.STOPPED;
      } else {
         this.startTimer();
      }
      break;
   }
   if (this.state == KarelController.STOPPED && app.callback) {
      app.callback();
      app.callback = null;
   }
};

KarelController.SLOW_DELAY = 500;
KarelController.FAST_DELAY = 5;
