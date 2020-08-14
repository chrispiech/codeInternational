/*
 * Soubor: KuzelSběrKarel.java
 * --------------------------
 * Program KuzelSběrKarel definuje metodu " run " se
 * třemi příkazy. Tyto příkazy způsobí, že Karel na m
 * ove vpřed o jeden blok, zvedne kuzel , a pak move
 * dopředu do dalšího rohu.
 */
import stanford.karel.*;
public class KuzelSběrKarel extends Karel {
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
    * Otočí Karla o 90 stupňů doprava.
    */
   private void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }
}