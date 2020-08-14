/*
 * Archivo: ConoErrorDeLínea.java
 * -----------------------------
 * Utiliza un ciclo while para colocar una línea de c
 * onos . Este programa funciona para un mundo de cua
 * lquier tamaño. Sin embargo, debido a que cada mund
 * o requiere uno menos moverserse s que ponerCono s, si
 * empre se pierde un cono .
 */
import stanford.karel.*;
public class ConoErrorDeLínea extends Karel {
   public void run() {
   	  /* Se repite hasta karel frente a una pared. */
      while(frenteDespejado()) {
      	 /* coloca un cono en la plaza actual */ 
         ponerCono();
      	 /* moverse al siguiente cuadrado */
         moverse();
      }
   }
}