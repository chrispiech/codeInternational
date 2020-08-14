/*
 * Datei: ErsterKarel.java
 * ----------------------
 * Karel nimmt eine beeper und legt sie auf einen Fel
 * svorsprung.
 */
import stanford.karel.*;
public class ErsterKarel extends Karel {
   public void run() {
      move();
      pickBeeper();
      move();
      turnLeft();
      move();
      turnLeft();
      turnLeft();
      turnLeft();
      move();
      move();
      putBeeper();
      move();
   } 
}