/*
 * Fail: ConoMemilihKarel.java
 * --------------------------
 * Program ConoMemilihKarel mentakrifkan kaedah " run
 * " dengan tiga arahan. Perintah ini menyebabkan Ka
 * rel ke move ke depan satu blok, mengambil beeper ,
 * dan kemudian move ke depan ke sudut seterusnya.
 */
import stanford.karel.*;
public class ConoMemilihKarel extends Karel {
   public void run() {
      move();
      pickBeeper();
      move();
      turnLeft();
      move();
      turnRight();
      move();
      move();
      putBeeper();
      move();
   }

   /**
    * Menghidupkan Karel 90 darjah ke kanan.
    */
   private void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }
}