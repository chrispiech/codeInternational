/*
 * Soubor: RohKuzelS.java
 * ---------------------
 * Umístí jeden kuzel do každého rohu
 */
import stanford.karel.*;
public class RohKuzelS extends Karel {
   public void run() {
      /* opakujte tělo 4 krát */
      for(int i = 0; i < 4; i++) {
      	putBeeper();
      	move();
      	move();
      	move();
      	turnLeft();
      }
   } 
}