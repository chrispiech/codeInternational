/*
 * Datei: ConoKarelPflücken.java
 * ----------------------------
 * Das ConoKarelPflücken-Programm definiert eine " ru
 * n " -Methode mit Befehlen, mit denen Karel eine be
 * eper und auf einen Sims beeper .
 */
import stanford.karel.*;
public class ConoKarelPflücken extends Karel {
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