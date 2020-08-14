/*
 * Fail: KarelPertama.java
 * ----------------------
 * Program KarelPertama mentakrifkan kaedah " run " d
 * engan tiga arahan. Perintah ini menyebabkan Karel
 * ke move ke depan satu blok, mengambil beeper dan k
 * emudian move ke depan ke sudut seterusnya.
 */
import stanford.karel.*;
public class KarelPertama extends Karel {
   /* program bermula run di sini */
   public void run() {
      move();
      pickBeeper();
      move();
   } 
}