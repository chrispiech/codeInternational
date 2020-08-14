/*
 * Archivo: EsquinaCincoBeepers.java
 * ---------------------------------
 * Coloca cinco beepers en cada esquina.
 */
import stanford.karel.*;
public class EsquinaCincoBeepers extends Karel {

   public void run() {
      /* Repetir una vez por cada esquina. */
      for(int i = 0; i < 4; i++) {
         ponerCincoBeepers();
         moverALaSiguienteEsquina();
      }
   } 

   /* reposicionar karel a la siguiente esquina */
   public void moverALaSiguienteEsquina() {
      moverse();
      moverse();
      moverse();
      girarALaIzquierda();
   }

   /* coloca 5 beepers usando un bucle para */
   public void ponerCincoBeepers() {
      for(int i = 0; i < 5; i++) {
      	ponerBeeper();
      }
   }
}