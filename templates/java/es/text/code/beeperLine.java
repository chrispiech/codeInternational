/*
 * Archivo: ConoLinea.java
 * ----------------------
 * Utiliza un "while" ciclo para colocar una línea de
 * conos . Este programa funciona para un mundo de c
 * ualquier tamaño.
 */
import stanford.karel.*;
public class ConoLinea extends Karel {
   public void run() {
      /* Se repite hasta karel frente a una pared. */
      while(frenteDespejado()) {
         /* coloca un cono en la plaza actual */ 
         ponerCono();
         /* moverse al siguiente cuadrado */
         moverse();
      }
      /* resuelve el error del poste de la cerca */
      ponerCono();
   }
}