/*
 * Soubor: PrvníKarel.java
 * ----------------------
 * Program PrvníKarel definuje metodu " run " se třem
 * i příkazy. Tyto příkazy způsobí, že Karel na move
 * vpřed o jeden blok, zvedne kuzel a pak move dopřed
 * u do dalšího rohu.
 */
import stanford.karel.*;
public class PrvníKarel extends Karel {
   /* program začíná zde provádění */
   public void run() {
      move();
      pickBeeper();
      move();
   } 
}