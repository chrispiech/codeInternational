/*
 * Archivo: Primero Karel .java
 * ---------------------------
 * Karel toma un cono y lo coloca en una repisa.
 */
import stanford.karel.*;
public class PrimeroKarel extends Karel {
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