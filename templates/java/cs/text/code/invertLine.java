import stanford.karel.*;
public class KuzelS extends Karel {
   /** spuštění zde */
   public void run() {
      while(frontIsClear()) {
         invertovatKuzel();
         move();
      }
      /* aby se zabránilo chybě plotu */
      invertovatKuzel();
   }

   /*  zvedne kuzel jestliže jeden je přítomný dá dolů ku
    * zel jinak */
   public void invertovatKuzel() {
      /* příkaz if / else */
      if(beepersPresent()) {
         pickBeeper();
      } else {
         putBeeper();
      }
   }
}