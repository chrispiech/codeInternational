/*
 * File: KarelViewTest.java
 * ------------------------
 * Test the display of a world.
 */

function KarelViewTest() {}

KarelViewTest.main = function(args) {
   var console = new JSConsole();
   var world = new KarelWorld();
   var view = new KarelView(world);
   var cmdProc = function(console, line) {
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
         if (req.readyState == 4) {
            var text = req.responseText;
            if (text.length > 0) {
               world.load(text);
               view.repaint();
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
   console.println("KarelView test");
   console.setCommandProc(cmdProc);
   console.waitForCommand();
};
