/*
 * Soubor: PrvníKarel.java
 * ----------------------
 * Karel zvedne kuzel a položí ho na římsu.
 */
import stanford.karel.*;
public class PrvníKarel extends Karel {
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