/*
 * Datei: ConoKarelPflücken.java
 * ----------------------------
 * Das ConoKarelPflücken-Programm definiert eine " ru
 * n " -Methode mit drei Befehlen. Diese Befehle vera
 * nlassen Karel, move einen Block beeper , beeper un
 * d dann move vor der nächsten Ecke.
 */
import stanford.karel.*;
public class ConoKarelPflücken extends Karel {
   public void run() {
      move();
      pickBeeper();
      move();
      turnLeft();
      move();
      turnRight();
      move();
      move();
      putBeeper();
      move();
   }

   /**
    * Dreht Karel um 90 Grad nach rechts.
    */
   private void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }
}