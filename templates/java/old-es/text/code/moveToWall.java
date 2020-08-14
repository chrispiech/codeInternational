/*
 * Archivo: MoveToWall.java
 * ------------------------
 * Utiliza un bucle "while" para mover a Karel hasta
 * que toque una pared. Funciona en cualquier mundo
 * del tamaño.
 */
import stanford.karel.*;
public class MoverALaParedDeDemostración extends Karel {
   public void run() {
      moverALaPared();
   }

   /* Este es un método muy útil. */
   private void moverALaPared() {
      while(elFrenteEsClaro()) {
         moverse();
      }
   } 
}