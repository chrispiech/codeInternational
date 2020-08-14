/*
 * Archivo: BeeperRecogiendoKarel.java
 * -----------------------------------
 * El programa BeeperRecogiendoKarel define un
 * método de "ejecución" con tres comandos. Estos
 * comandos hacen que Karel avance un bloque,
 * levante un pitido y luego avance a la siguiente
 * esquina.
 */
import stanford.karel.*;
public class BeeperTotingKarel extends Karel {
   public void run() {
      moverse();
      recogerBeeper();
      moverse();
      girarALaIzquierda();
      moverse();
      girarALaDerecha();
      moverse();
      moverse();
      ponerBeeper();
      moverse();
   }

   /**
    * Gira a Karel 90 grados a la derecha.
    */
   private void girarALaDerecha() {
      girarALaIzquierda();
      girarALaIzquierda();
      girarALaIzquierda();
   }
}