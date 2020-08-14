/*
 * Soubor: KuzelŘádek.java
 * ----------------------
 * Použije smyčku "while" k umístění řádku kuzel s. T
 * ento program funguje pro svět jakékoli velikosti.
 */
import stanford.karel.*;
public class KuzelŘádek extends Karel {
   public void run() {
      /* opakuje se, dokud se karel nestane čelem ke zdi */
      while(frontIsClear()) {
         /* místo kuzel na aktuálním náměstí */ 
         putBeeper();
         /* move na další náměstí */
         move();
      }
      /* řeší chybu plotu */
      putBeeper();
   }
}