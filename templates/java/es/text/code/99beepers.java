/*
 * Archivo: LugarMuchosConos.java
 * -----------------------------
 * Lugares 42 conos usando un ciclo for
 */
import stanford.karel.*;
public class LugarMuchosConos extends Karel {
   public void run() {
      moverse();
      /* repetir ponerCono muchas veces */
      for(int i = 0; i < 42; i++) {
      	ponerCono();
      }
      moverse();
   } 
}