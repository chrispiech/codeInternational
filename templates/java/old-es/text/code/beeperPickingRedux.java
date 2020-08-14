/*
 * Archivo: BeeperRecogiendoKarel.java
 * -----------------------------------
 * Karel toma un beeper y lo coloca en una repisa.
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