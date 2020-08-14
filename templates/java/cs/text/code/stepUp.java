/*
 * Soubor: KuzelSběrKarel.java
 * --------------------------
 * Program KuzelSběrKarel definuje metodu " run " s p
 * říkazy, které způsobí, že Karel vyzvedne kuzel a u
 * místí jej na římsu.
 */
import stanford.karel.*;
public class KuzelSběrKarel extends Karel {
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