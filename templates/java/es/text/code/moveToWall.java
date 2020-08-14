/*
 * Archivo: MoverseAPared.java
 * --------------------------
 * Usa un "while" ciclo a moverserse Karel hasta que toq
 * ue una pared. Funciona en cualquier mundo del tama
 * ño.
 */
import stanford.karel.*;
public class MoverseAPared extends Karel {
   public void run() {
      moverseAPared();
   }

   /* Este es un método muy útil. */
   private void moverseAPared() {
      while(frenteDespejado()) {
         moverse();
      }
   } 
}