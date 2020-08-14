/*
 * Fail: ConoMemilihKarel.java
 * --------------------------
 * Program ConoMemilihKarel mentakrifkan kaedah " run
 * " dengan arahan yang menyebabkan Karel menjemput
 * beeper dan meletakkannya di atas tebing.
 */
import stanford.karel.*;
public class ConoMemilihKarel extends Karel {
   public void run() {
      move();
      pickBeeper();
      move();
      turnLeft();
      move();
      turnLeft();
      turnLeft();
      turnLeft();
      move();
      move();
      putBeeper();
      move();
   } 
}