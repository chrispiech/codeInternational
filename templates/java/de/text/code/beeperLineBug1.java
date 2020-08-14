/*
 * Datei: Cono.java
 * ---------------
 * Verwendet eine while-Schleife, um eine Zeile mit b
 * eeper s zu platzieren. Dieses Programm funktionier
 * t für eine Welt jeder Größe. Da jedoch jede Welt w
 * eniger move s als putBeeper s benötigt, fehlt imme
 * r eine beeper .
 */
import stanford.karel.*;
public class Cono extends Karel {
   public void run() {
   	  /* wiederholt, bis karel vor einer wand steht */
      while(frontIsClear()) {
      	 /* Platziere eine beeper auf dem aktuellen Feld */ 
         putBeeper();
      	 /* move bis zum nächsten Platz */
         move();
      }
   }
}