/*
 * File: KarelApplication.java
 * ---------------------------
 * Create a test application for Karel.
 */

function KarelApplication() {
   /* Empty */
}

KarelApplication.main = function(args) {
   new KarelApplication().main();
}

KarelApplication.prototype.main = function() {
   this.console = new JSConsole();
   this.world = new KarelWorld();
   this.world.addKarel(new Karel());
   this.view = new KarelView(this.world);
   this.controller = new KarelController(this);
   this.world.addView(this.view);
   this.world.updateViews();
   this.vm = new KarelVM(this.world);
   var scanner = new TokenScanner();
   var app = this;
   scanner.setIgnoreWhitespaceFlag(true);
   scanner.setIgnoreCommentsFlag(true);
   scanner.setScanStringsFlag(true);
   var cmdProc = function(console, line) {
      scanner.setInput(line);
      var cmd = scanner.nextToken();
      if (cmd == "") {
         console.waitForCommand();
      } else if (KarelApplication.commands[cmd]) {
         try {
            KarelApplication.commands[cmd](app, scanner);
         } catch (e) {
            console.println(e);
            console.waitForCommand();
         }
      } else if (Karel.instructions[cmd]) {
         try {
            app.world.getKarel()[cmd]();
            app.world.updateViews();
         } catch (e) {
            console.println(e);
         }
         console.waitForCommand();
      } else if (app.vm.functions[cmd]) {
         app.vm.reset();
         app.vm.call(cmd, app.vm.functions[cmd]);
         KarelApplication.commands.resume(app, scanner);
      } else {
         console.println("Unrecognized command: " + line);
         console.waitForCommand();
      }
   };
   this.console.println("Karel Test Platform");
   this.console.setCommandProc(cmdProc);
   this.console.waitForCommand();
};

KarelApplication.prototype.loadProgram = function(text) {
   try {
      alert(text);
      var parser = new KarelParser();
      parser.setInput(text);
      while (true) {
         var token = parser.nextToken();
         if (token == "") break;
         parser.saveToken(token);
         var fn = parser.readFunction();
         var code = [];
         this.vm.compile(fn[2], code);
         code.push(new ReturnIns());
         this.vm.functions[fn[1]] = code;
      }
   } catch (e) {
      this.console.println(e);
   }
}

KarelApplication.commands = { };

KarelApplication.commands.list = function(app, scanner) {
   var console = app.console;
   var fns = [ ];
   for (var key in app.vm.functions) {
      fns.push(key);
   }
   fns.sort();
   for (var i = 0; i < fns.length; i++) {
      console.println(fns[i]);
   }
   console.waitForCommand();
};

KarelApplication.commands.code = function(app, scanner) {
   var console = app.console;
   var token = scanner.nextToken();
   if (!token) throw new Error("Missing function name");
   var code = app.vm.functions[token];
   if (!code) throw new Error("Undefined function \"" + token + "\"");
   console.println("     function " + token + "() {");
   for (var i = 0; i < code.length; i++) {
      var ins = code[i];
      var num = ("   " + i);
      num = num.substring(num.length - 3);
      console.println(num + "    " + ((ins.toString) ? ins : ins.name));
   }
   console.println("     }");
   console.waitForCommand();
};

KarelApplication.commands.load = function(app, scanner) {
   var filename = scanner.nextToken();
   if (TokenScanner.getTokenType(filename) == TokenScanner.STRING) {
      filename = TokenScanner.getString(filename);
   } else {
      var token = scanner.nextToken();
      if (token == ".") {
         filename += "." + scanner.nextToken();
      } else {
         scanner.saveToken(token);
      }
   }
   if (filename.endsWith(".w")) {
      var handler = function(text) {
         try {
            if (text === null) {
               throw new Error("Can't find world file \"" + filename + "\"");
            } else {
               app.world.load(text);
               app.controller.setSpeed(app.world.getSpeed());
               app.world.updateViews();
            }
         } catch (e) {
            app.console.println(e);
         }
         app.console.waitForCommand();
      }
      LocalFile.readFile("worlds/" + filename, handler);
   } else if (filename.endsWith(".k") || filename.endsWith(".js")) {
      var handler = function(text) {
         try {
            if (text === null) {
               throw new Error("Can't find program file \"" + filename + "\"");
            } else {
               app.loadProgram(text);
            }
         } catch (e) {
            app.console.println(e);
         }
         app.console.waitForCommand();
      }
      LocalFile.readFile("programs/" + filename, handler);
   } else {
      var handler2 = function(text) {
         try {
            if (text !== null) {
               app.world.load(text);
               app.controller.setSpeed(app.world.getSpeed());
               app.world.updateViews();
            }
         } catch(e) {
            app.console.println(e);
         }
         app.console.waitForCommand();
      }
      var handler1 = function(text) {
         try {
            if (text === null) {
               var msg = "Can't find program file \"" + filename + ".k\"";
               throw new Error(msg);
            } else {
               app.loadProgram(text);
            }
            LocalFile.readFile("worlds/" + filename + ".w", handler2);
         } catch (e) {
            app.console.println(e);
            app.console.waitForCommand();
         }
      }
      LocalFile.readFile("programs/" + filename + ".k", handler1);
   }
};

KarelApplication.commands.speed = function(app, scanner) {
   var str = "";
   while (true) {
      var token = scanner.nextToken();
      if (token == "") break;
      if (token != "=") str += token;
   }
   var speed = Math.max(0, Math.min(1, parseFloat(str)));
   app.console.println("speed = " + speed);
   app.controller.setSpeed(speed);
   app.console.waitForCommand();
};

KarelApplication.commands.run = function(app, scanner) {
   app.callback = function() { app.console.waitForCommand(); };
   app.vm.reset();
   app.controller.runAction();
};

KarelApplication.commands.resume = function(app, scanner) {
   app.callback = function() { app.console.waitForCommand(); };
   app.controller.runAction();
};

KarelApplication.commands.stepOver = function(app, scanner) {
   app.callback = function() { app.console.waitForCommand(); };
   app.controller.stepOverAction();
};

KarelApplication.commands.stepIn = function(app, scanner) {
   app.callback = function() { app.console.waitForCommand(); };
   app.controller.stepInAction();
};

KarelApplication.commands.stepOut = function(app, scanner) {
   app.callback = function() { app.console.waitForCommand(); };
   app.controller.stepOutAction();
};

KarelApplication.commands.help = function(app, scanner) {
   var console = app.console;
   var commands = [ ];
   for (var key in KarelApplication.commands) {
      commands.push(key);
   }
   commands.sort();
   console.println("Available commands (plus Karel instructions):");
   for (var i = 0; i < commands.length; i++) {
      var cmd = commands[i];
      console.println("  " + KarelApplication.commands[cmd].helpText);
   }
   console.waitForCommand();
};

/* Help texts for commands */

KarelApplication.commands.list.helpText =
  "list       Lists the loaded functions";
KarelApplication.commands.code.helpText =
  "code fn    Displays the VM code for fn";
KarelApplication.commands.load.helpText =
  "load file  Loads a program or world file";
KarelApplication.commands.speed.helpText =
  "speed s    Sets the speed to s (0 to 1)";
KarelApplication.commands.run.helpText =
  "run        Runs the main function";
KarelApplication.commands.resume.helpText =
  "resume     Continue program after stopping";
KarelApplication.commands.stepOver.helpText =
  "stepOver   Executes an entire call";
KarelApplication.commands.stepIn.helpText =
  "stepIn     Executes one statement";
KarelApplication.commands.stepOut.helpText =
  "stepOut    Runs until function returns";
KarelApplication.commands.help.helpText =
  "help       Prints this message";
