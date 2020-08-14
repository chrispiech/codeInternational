/*
 * Archivo: LíneaDeSonido.java
 * ---------------------------
 * Utiliza un bucle "while" para colocar una línea
 * de señales acústicas. Este programa funciona para
 * un mundo de cualquier tamaño.
 */
import stanford.karel.*;
public class LíneaDeSonido extends Karel {
   public void run() {
   	  /* Se repite hasta que Karel se enfrenta a una pared. */
      while(elFrenteEsClaro()) {
      	 /* colocar un beeper en la plaza actual */ 
         ponerBeeper();
      	 /* moverse a la siguiente plaza */
         moverse();
      }
      /* resuelve el error del poste de la cerca */
      ponerBeeper();
   }
}