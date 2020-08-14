/*
 * Fail: KarelPertama.java
 * ----------------------
 * Karel mengambil beeper dan meletakkannya di atas t
 * ebing.
 */
import stanford.karel.*;
public class KarelPertama extends Karel {
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