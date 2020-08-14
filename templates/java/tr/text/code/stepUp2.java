/*
 * Dosya: ConoToplama.java
 * ----------------------
 * ConoToplama programı üç run bir " run " metodunu t
 * anımlar. Bu komutlar move bir blok move öne, beepe
 * r , daha sonra da move sonraki köşeye ilerlemesine
 * neden olur.
 */
import stanford.karel.*;
public class ConoToplama extends Karel {
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
    * Karel'i 90 derece sağa döndürür.
    */
   private void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }
}