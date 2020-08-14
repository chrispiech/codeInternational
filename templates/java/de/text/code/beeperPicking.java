/*
 * Datei: ErsterKarel.java
 * ----------------------
 * Das Programm ErsterKarel definiert eine " run " -M
 * ethode mit drei Befehlen. Diese Befehle bewirken,
 * dass Karel move einen Block weiterleitet, beeper u
 * nd dann move vor der nächsten Ecke.
 */
import stanford.karel.*;
public class ErsterKarel extends Karel {
   /* das programm beginnt hier run ning */
   public void run() {
      move();
      pickBeeper();
      move();
   } 
}