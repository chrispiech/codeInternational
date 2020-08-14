import stanford.karel.*;
public class ConoS extends Karel {
   /** burada yürütmeye başla */
   public void run() {
      while(frontIsClear()) {
         conoTersCono();
         move();
      }
      /* bir geçici hatayı önlemek için */
      conoTersCono();
   }

   /*  Bir alır beeper biri varsa aşağı koyar beeper aksi */
   public void conoTersCono() {
      /* bir if / else ifadesi */
      if(beepersPresent()) {
         pickBeeper();
      } else {
         putBeeper();
      }
   }
}