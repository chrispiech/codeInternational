/*
 * Archivo: BeeperRecogiendoKarel.java
 * -----------------------------------
 * El programa BeeperRecogiendoKarel define un
 * método de "ejecución" con comandos que hacen que
 * Karel tome un beeper y lo coloque en una repisa.
 */
import stanford.karel.*;
public class BeeperRecogiendoKarel extends Karel {
   public void run() {
      moverse();
      recogerBeeper();
      moverse();
      girarALaIzquierda();
      moverse();
      girarALaIzquierda();
      girarALaIzquierda();
      girarALaIzquierda();
      moverse();
      moverse();
      ponerBeeper();
      moverse();
   } 
}