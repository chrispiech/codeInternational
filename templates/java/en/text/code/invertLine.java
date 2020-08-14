import stanford.karel.*;
public class InverBeepers extends Karel {
   /** start execution here */
   public void run() {
      while(frontIsClear()) {
         invertBeeper();
         move();
      }
      /* to prevent a fencepost bug */
      invertBeeper();
   }

   /* picks up a beeper if one is present 
    * puts down a beeper otherwise */
   public void invertBeeper() {
      /* an if/else statement */
      if(beepersPresent()) {
         pickBeeper();
      } else {
         putBeeper();
      }
   }
}