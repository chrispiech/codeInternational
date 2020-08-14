/*
 * Datei: EckeConoS.java
 * --------------------
 * beeper eine beeper in jeder Ecke
 */
import stanford.karel.*;
public class EckeConoS extends Karel {
   public void run() {
      /* Wiederholen Sie den Körper 4 Mal */
      for(int i = 0; i < 4; i++) {
      	putBeeper();
      	move();
      	move();
      	move();
      	turnLeft();
      }
   } 
}