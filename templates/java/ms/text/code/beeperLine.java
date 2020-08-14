/*
 * Fail: ConoTalian.java
 * --------------------
 * Menggunakan gelung "sementara" untuk meletakkan ga
 * ris beeper s. Program ini berfungsi untuk dunia de
 * ngan saiz apa pun.
 */
import stanford.karel.*;
public class ConoTalian extends Karel {
   public void run() {
      /* berulang sehingga karel menghadap dinding */
      while(frontIsClear()) {
         /* letakkan beeper pada dataran semasa */ 
         putBeeper();
         /* move ke dataran seterusnya */
         move();
      }
      /* menyelesaikan permen pasca pagar */
      putBeeper();
   }
}