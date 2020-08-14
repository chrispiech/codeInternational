/*
 * File: MoveToWall.java
 * ---------------------
 * Menggunakan loop "sementara" untuk menggerakkan
 * Karel hingga menyentuh dinding. Bekerja di dunia
 * ukuran apa saja.
 */
import stanford.karel.*;
public class DemoPindahKeDinding extends Karel {
   public void run() {
      pindahKeDinding();
   }

   /* ini adalah metode yang sangat berguna */
   private void pindahKeDinding() {
      while(depanJelas()) {
         pindah();
      }
   } 
}