/*
 * Datei: ConoLinie.java
 * --------------------
 * Verwendet eine "while" -Schleife, um eine Zeile mi
 * t beeper s zu platzieren. Dieses Programm funktion
 * iert für eine Welt jeder Größe.
 */
import stanford.karel.*;
public class ConoLinie extends Karel {
   public void run() {
      /* wiederholt, bis karel vor einer wand steht */
      while(frontIsClear()) {
         /* Platziere eine beeper auf dem aktuellen Feld */ 
         putBeeper();
         /* move bis zum nächsten Platz */
         move();
      }
      /* behebt den Zaunpfosten-Bug */
      putBeeper();
   }
}