/*
 * Archivo: BeepersDeEsquina.java
 * ------------------------------
 * Coloca un beeper en cada esquina.
 */
import stanford.karel.*;
public class BeepersDeEsquina extends Karel {
   public void run() {
      /* repite el cuerpo 4 veces */
      for(int i = 0; i < 4; i++) {
      	ponerBeeper();
      	moverse();
      	moverse();
      	moverse();
      	girarALaIzquierda();
      }
   } 
}