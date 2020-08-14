/*
 * Datei: PlatziereVieleConoS.java
 * ------------------------------
 * beeper 42 beeper s mit einer for-Schleife
 */
import stanford.karel.*;
public class PlatziereVieleConoS extends Karel {
   public void run() {
      move();
      /* piepserSetzen viele male wiederholen */
      for(int i = 0; i < 42; i++) {
      	putBeeper();
      }
      move();
   } 
}