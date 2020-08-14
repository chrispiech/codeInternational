/*
 * Funga: KoniLine.java
 * -------------------
 * Inatumia "wakati" kitanzi ili kuweka mstari wa kon
 * i s. Programu hii inafanya kazi kwa ulimwengu wa u
 * kubwa wowote.
 */
import stanford.karel.*;
public class KoniLine extends Karel {
   public void run() {
      /* kurudia mpaka karel inakabiliwa na ukuta */
      while(frontIsClear()) {
         /* koni kwenye mraba wa sasa */ 
         wekaKoni();
         /* move kwenye mraba ujao */
         move();
      }
      /* hutatua mdudu wa post-uzio */
      wekaKoni();
   }
}