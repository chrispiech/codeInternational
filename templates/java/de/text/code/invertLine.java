import stanford.karel.*;
public class InverConoS extends Karel {
   /** Starten Sie hier die Ausführung */
   public void run() {
      while(frontIsClear()) {
         cono();
         move();
      }
      /* um einen Fencepost Bug zu verhindern */
      cono();
   }

   /*  holt einen beeper wenn einer vorhanden ist, legt e
    * inen beeper ansonsten */
   public void cono() {
      /* eine if / else-Anweisung */
      if(beepersPresent()) {
         pickBeeper();
      } else {
         putBeeper();
      }
   }
}