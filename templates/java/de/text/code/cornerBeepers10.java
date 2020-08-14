/*
 * Datei: EckeFünfConoS.java
 * ------------------------
 * beeper fünf beeper s in jeder Ecke
 */
import stanford.karel.*;
public class EckeFünfConoS extends Karel {

   public void run() {
      /* Wiederholen Sie einmal für jede Ecke */
      for(int i = 0; i < 4; i++) {
         legteFünfConoS();
         moveBisZurNächstenEcke();
      }
   } 

   /* karel in die nächste ecke verschieben */
   public void moveBisZurNächstenEcke() {
      move();
      move();
      move();
      turnLeft();
   }

   /* Platziert 5 beeper s mit einer for-Schleife */
   public void legteFünfConoS() {
      for(int i = 0; i < 5; i++) {
      	putBeeper();
      }
   }
}