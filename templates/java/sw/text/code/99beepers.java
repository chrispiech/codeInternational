/*
 * Fungua: MahaliWengiKoniS.java
 * ----------------------------
 * Sehemu 42 koni s kutumia mzunguko for
 */
import stanford.karel.*;
public class MahaliWengiKoniS extends Karel {
   public void run() {
      move();
      /* kurudia wekaKoni mara nyingi */
      for(int i = 0; i < 42; i++) {
      	wekaKoni();
      }
      move();
   } 
}