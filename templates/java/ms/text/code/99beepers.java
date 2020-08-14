/*
 * Fail: LetakkanBanyakConoS.java
 * -----------------------------
 * Tempat 42 beeper s menggunakan gelung untuk
 */
import stanford.karel.*;
public class LetakkanBanyakConoS extends Karel {
   public void run() {
      move();
      /* ulangkan tempatkanBeeper berkali-kali */
      for(int i = 0; i < 42; i++) {
      	putBeeper();
      }
      move();
   } 
}