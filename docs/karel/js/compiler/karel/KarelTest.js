/*
 * File: KarelTest.java
 * --------------------
 * Create a test harness for Karel.
 */

function KarelTest() {
   /* Empty */
}

KarelTest.main = function(args) {
   new KarelTest().main();
}

KarelTest.prototype.main = function() {
   this.console = new JSConsole();
   this.world = new KarelWorld();
   this.world.addKarel(new Karel());
   this.view = new KarelView(this.world);
   this.controller = new KarelController(this.world);
   this.world.addView(this.view);
   this.world.updateViews();
   this.vm = new KarelVM(this.world);
   var scanner = new TokenScanner();
   var pgm = this;
   var stepIn = document.getElementById("StepIn");
   var stepInFn = function(e) {
      pgm.vm.stepIn();
      pgm.world.updateViews();
   };      
   addEventListener(stepIn, "click", stepInFn);
   scanner.setIgnoreWhitespaceFlag(true);
   scanner.setIgnoreCommentsFlag(true);
   scanner.setScanStringsFlag(true);
   var cmdProc = function(console, line) {
      scanner.setInput(line);
      var cmd = scanner.readToken();
      if (cmd == "") {
         console.waitForCommand();
      } else if (KarelTest.commands[cmd]) {
         try {
            KarelTest.commands[cmd](pgm, scanner);
         } catch (e) {
            console.println(e);
            console.waitForCommand();
         }
      } else if (Karel.instructions[cmd]) {
         try {
            pgm.world.getKarel()[cmd]();
            pgm.world.updateViews();            
         } catch (e) {
            console.println(e);
         }
         console.waitForCommand();
      } else {
         console.println("Unrecognized command: " + line);
         console.waitForCommand();
      }
   };
   this.console.println("Karel Test Platform");
   this.console.setCommandProc(cmdProc);
   this.console.waitForCommand();
};

KarelTest.prototype.load = function(text) {
   var parser = new KarelParser();
   parser.setInput(text);
   while (true) {
      var token = parser.readToken();
      if (token == "") break;
      parser.saveToken(token);
      var fn = parser.readFunction();
      var code = [];
      this.vm.resetTempCounter();
      this.vm.compile(fn[2], code);
      this.vm.functions[fn[1]] = code;
      this.console.println(fn[1]);
   }
}

KarelTest.commands = { };

KarelTest.commands.list = function(pgm, scanner) {
   var token = scanner.readToken();
   var console = pgm.console;
   if (token == "") {
      for (var key in pgm.vm.functions) {
         console.println(key);
      }
   } else {
      var code = pgm.vm.functions[token];
      if (!code) throw new Error("Undefined function \"" + token + "\"");
      console.println("function " + token + "() {");
      for (var i = 0; i < code.length; i++) {
         var ins = code[i];
         console.println("  " + ((ins.toString) ? ins : ins.name));
      }
      console.println("}");
   }
   console.waitForCommand();
};

KarelTest.commands.load = function(pgm, scanner) {
   var filename = scanner.readToken();
   switch (TokenScanner.getTokenType(filename)) {
    case TokenScanner.WORD:
      filename = "programs/" + filename + ".k";
      break;
    case TokenScanner.STRING:
      filename = "programs/" + TokenScanner.getString(filename);
      break;
    default:
      program.console.println("Illegal program file specification");
      pgm.console.waitForCommand();
      return;
   }
   var handler = function(text) {
      if (text === null) {
         pgm.console.println("Can't find program file \"" + filename + "\"");
      } else {
         pgm.load(text);
         pgm.view.repaint();
      }
      pgm.console.waitForCommand();
   }
   LocalFile.readFile(filename, handler);
};

KarelTest.commands.world = function(pgm, scanner) {
   var filename = scanner.readToken();
   switch (TokenScanner.getTokenType(filename)) {
    case TokenScanner.WORD:
      filename = "worlds/" + filename + ".w";
      break;
    case TokenScanner.STRING:
      filename = "worlds/" + TokenScanner.getString(filename);
      break;
    default:
      program.console.println("Illegal world file specification");
      pgm.console.waitForCommand();
      return;
   }
   var handler = function(text) {
      if (text === null) {
         pgm.console.println("Can't find world file \"" + filename + "\"");
      } else {
         pgm.world.load(text);
         pgm.world.updateViews();
      }
      pgm.console.waitForCommand();
   }
   LocalFile.readFile(filename, handler);
};
