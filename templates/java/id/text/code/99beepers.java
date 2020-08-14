/*
 * File: TempatBanyakBeepers.java
 * ------------------------------
 * Places 42 bip menggunakan loop untuk
 */
import stanford.karel.*;
public class TempatBanyakBeepers extends Karel {
   public void run() {
      pindah();
      /* ulangi berkali-kali */
      for(int i = 0; i < 42; i++) {
      	masukkanBeeper();
      }
      pindah();
   } 
}