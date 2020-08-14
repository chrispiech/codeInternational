/*
 * Dosya: KöşeBeşConoS.java
 * -----------------------
 * Her köşeye beş beeper sn yerleştirir
 */
import stanford.karel.*;
public class KöşeBeşConoS extends Karel {

   public void run() {
      /* Her köşe için bir kez tekrarlayın */
      for(int i = 0; i < 4; i++) {
         beşConoSKoy();
         moveSonrakiKöşeye();
      }
   } 

   /* karel'i bir sonraki köşeye yerleştirme */
   public void moveSonrakiKöşeye() {
      move();
      move();
      move();
      turnLeft();
   }

   /* bir for döngüsü kullanarak 5 beeper s yerleştirir */
   public void beşConoSKoy() {
      for(int i = 0; i < 5; i++) {
      	putBeeper();
      }
   }
}