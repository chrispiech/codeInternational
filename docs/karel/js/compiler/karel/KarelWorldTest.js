/*
 * File: KarelWorldTest.java
 * -------------------------
 * Makes sure we can read Karel world files.
 */

function KarelWorldTest() {}

KarelWorldTest.main = function(args) {
   var console = new JSConsole();
   var world = new KarelWorld();
   var cmdProc = function(console, line) {
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
         if (req.readyState == 4) {
            var text = req.responseText;
            if (text.length > 0) {
               world.load(text);
               var lines = world.save().split('\n');
               for (var i = 0; i < lines.length; i++) {
                  console.println(lines[i]);
               }
            } else {
               req.abort();
               console.println("The file " + line + " does not exist.");
            }
            console.waitForCommand();
         }
      }
      req.open("GET", "file:worlds/" + line, true);
      req.send();
   };
   console.println("KarelWorld test");
   console.setCommandProc(cmdProc);
   console.waitForCommand();
};
