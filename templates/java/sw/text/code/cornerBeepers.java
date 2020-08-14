/*
 * Funga: KonaKoniS.java
 * --------------------
 * Sehemu moja koni katika kila kona
 */
import stanford.karel.*;
public class KonaKoniS extends Karel {
   public void run() {
      /* kurudia mwili mara 4 */
      for(int i = 0; i < 4; i++) {
      	wekaKoni();
      	move();
      	move();
      	move();
      	geukaKushoto();
      }
   } 
}