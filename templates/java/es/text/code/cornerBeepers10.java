/*
 * Archivo: EsquinaCincoConos.java
 * ------------------------------
 * conos cinco conos en cada esquina.
 */
import stanford.karel.*;
public class EsquinaCincoConos extends Karel {

   public void run() {
      /* Repetir una vez por cada esquina. */
      for(int i = 0; i < 4; i++) {
         ponerCincoConos();
         moverseALaEsquinaSiguiente();
      }
   } 

   /* reposicionar karel a la siguiente esquina */
   public void moverseALaEsquinaSiguiente() {
      moverse();
      moverse();
      moverse();
      girarIzquierda();
   }

   /* coloca 5 conos usando un ciclo for */
   public void ponerCincoConos() {
      for(int i = 0; i < 5; i++) {
      	ponerCono();
      }
   }
}