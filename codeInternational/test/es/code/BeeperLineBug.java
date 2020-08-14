/*
 * Archivo: ErrorEnLaLíneaDelCono.java
 * ---------------------------
 * Utiliza un bucle "while" para colocar una línea
 * de señales acústicas. Este programa funciona para
 * un mundo de cualquier tamaño. Sin embargo, dado
 * que cada mundo requiere uno menos movimientos que
 * los ponerConos, siempre pierde un cono.
 */
import stanford.karel.*;
public class ErrorEnLaLíneaDelCono extends Karel {
   public void run() {
      /* Se repite hasta que Karel se enfrenta a una pared. */
      while(frenteDespejado()) {
         /* colocar un cono en la plaza actual */ 
         ponerCono();
         /* moverse a la siguiente plaza */
         moverse();
      }
   }
}