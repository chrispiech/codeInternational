/*
 * Dosya: IlkKarel.java
 * -------------------
 * Karel beeper ve bir çıkıntıya yerleştirdi.
 */
import stanford.karel.*;
public class IlkKarel extends Karel {
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