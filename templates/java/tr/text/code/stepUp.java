/*
 * Dosya: ConoToplama.java
 * ----------------------
 * ConoToplama programı, run beeper ve bir çıkıntıya
 * yerleştirmesine neden olan komutlarla bir " run "
 * yöntemi tanımlar.
 */
import stanford.karel.*;
public class ConoToplama extends Karel {
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