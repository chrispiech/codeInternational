/*
 * Soubor: KuzelŘádekChyba.java
 * ---------------------------
 * Použije smyčku while k umístění řádku kuzel s. Ten
 * to program funguje pro svět jakékoli velikosti. Ni
 * cméně, protože každý svět vyžaduje jeden méně move
 * ů než putBeeper sa vždy mine kuzel .
 */
import stanford.karel.*;
public class KuzelŘádekChyba extends Karel {
   public void run() {
   	  /* opakuje se, dokud se karel nestane čelem ke zdi */
      while(frontIsClear()) {
      	 /* místo kuzel na aktuálním náměstí */ 
         putBeeper();
      	 /* move na další náměstí */
         move();
      }
   }
}