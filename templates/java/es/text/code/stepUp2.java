/*
 * Archivo: ConoRecogiendo Karel .java
 * ----------------------------------
 * El programa ConoRecogiendo Karel define un método
 * " run " con tres comandos. Estos comandos causan K
 * arel a moverserse avanzar un bloque, recoger un cono
 * , y luego moverserse avanzar a la siguiente esquina.
 */
import stanford.karel.*;
public class ConoRecogiendoKarel extends Karel {
   public void run() {
      moverse();
      recogerCono();
      moverse();
      girarIzquierda();
      moverse();
      girarDerecha();
      moverse();
      moverse();
      ponerCono();
      moverse();
   }

   /**
    * Gira Karel 90 grados a la derecha.
    */
   private void girarDerecha() {
      girarIzquierda();
      girarIzquierda();
      girarIzquierda();
   }
}