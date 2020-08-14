/*
 * Dosya: IlkKarel.java
 * -------------------
 * İlkKarel programı üç run " run " metodunu tanımlar
 * . Bu komutlar move bir blok move öne, beeper , dah
 * a sonra da move sonraki köşeye ilerlemesini sağlar
 * .
 */
import stanford.karel.*;
public class IlkKarel extends Karel {
   /* program burada run ning başlıyor */
   public void run() {
      move();
      pickBeeper();
      move();
   } 
}