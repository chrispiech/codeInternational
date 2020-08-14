/*
 * Fungua: KoniMduduMdogo.java
 * --------------------------
 * Inatumia mzunguko while ili kuweka mstari wa koni
 * s. Programu hii inafanya kazi kwa ulimwengu wa uku
 * bwa wowote. Hata hivyo, kwa sababu kila dunia inah
 * itaji wachache move s kuliko wekaKoni s mara zote
 * hukosa koni .
 */
import stanford.karel.*;
public class KoniMduduMdogo extends Karel {
   public void run() {
   	  /* kurudia mpaka karel inakabiliwa na ukuta */
      while(frontIsClear()) {
      	 /* koni kwenye mraba wa sasa */ 
         wekaKoni();
      	 /* move kwenye mraba ujao */
         move();
      }
   }
}