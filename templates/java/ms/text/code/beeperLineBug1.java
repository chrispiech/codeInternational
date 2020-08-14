/*
 * Fail: ConoLineCono.java
 * ----------------------
 * Menggunakan gelung sementara untuk meletakkan gari
 * s beeper s. Program ini berfungsi untuk dunia deng
 * an saiz apa pun. Walau bagaimanapun, kerana setiap
 * dunia memerlukan satu kurang move s daripada putB
 * eeper s ia selalu merindukan beeper .
 */
import stanford.karel.*;
public class ConoLineCono extends Karel {
   public void run() {
   	  /* berulang sehingga karel menghadap dinding */
      while(frontIsClear()) {
      	 /* letakkan beeper pada dataran semasa */ 
         putBeeper();
      	 /* move ke dataran seterusnya */
         move();
      }
   }
}