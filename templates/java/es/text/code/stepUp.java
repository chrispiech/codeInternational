/*
 * Archivo: ConoRecogiendo Karel .java
 * ----------------------------------
 * El programa ConoRecogiendo Karel define un método
 * " run " con comandos que hacen que Karel tome un c
 * ono y lo coloque en una repisa.
 */
import stanford.karel.*;
public class ConoRecogiendoKarel extends Karel {
   public void run() {
      moverse();
      recogerCono();
      moverse();
      girarIzquierda();
      moverse();
      girarIzquierda();
      girarIzquierda();
      girarIzquierda();
      moverse();
      moverse();
      ponerCono();
      moverse();
   } 
}