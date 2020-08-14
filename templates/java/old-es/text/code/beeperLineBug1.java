/*
 * Archivo: BeeperLineBug.java
 * ---------------------------
 * Utiliza un bucle "while" para colocar una línea
 * de señales acústicas. Este programa funciona para
 * un mundo de cualquier tamaño. Sin embargo, dado
 * que cada mundo requiere uno menos movimientos que
 * los putBeepers, siempre se pierde un pitido.
 */
import stanford.karel.*;
public class BeeperLineBug extends Karel {
   public void run() {
   	  /* Se repite hasta que Karel se enfrenta a una pared. */
      while(elFrenteEsClaro()) {
      	 /* colocar un beeper en la plaza actual */ 
         ponerBeeper();
      	 /* moverse a la siguiente plaza */
         moverse();
      }
   }
}