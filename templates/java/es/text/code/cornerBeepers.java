/*
 * Archivo: EsquinaConos.java
 * -------------------------
 * cono un cono en cada esquina.
 */
import stanford.karel.*;
public class EsquinaConos extends Karel {
   public void run() {
      /* repite el cuerpo 4 veces */
      for(int i = 0; i < 4; i++) {
      	ponerCono();
      	moverse();
      	moverse();
      	moverse();
      	girarIzquierda();
      }
   } 
}