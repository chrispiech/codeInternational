import stanford.karel.*;
public class InverConoS extends Karel {
   /** mulakan pelaksanaan di sini */
   public void run() {
      while(frontIsClear()) {
         terbalikCono();
         move();
      }
      /* untuk mengelakkan pepijat fencepost */
      terbalikCono();
   }

   /*  mengambil beeper jika ada yang meletakkan bawah be
    * eper sebaliknya */
   public void terbalikCono() {
      /* pernyataan jika / lain */
      if(beepersPresent()) {
         pickBeeper();
      } else {
         putBeeper();
      }
   }
}