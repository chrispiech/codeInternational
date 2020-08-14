import stanford.karel.*;
public class KoniS extends Karel {
   /** kuanza utekelezaji hapa */
   public void run() {
      while(frontIsClear()) {
         koni();
         move();
      }
      /* ili kuzuia mdudu wa fencepost */
      koni();
   }

   /*  huchukua koni ikiwa mtu aliyepo huweka chini koni
    * vinginevyo */
   public void koni() {
      /* kama / taarifa nyingine */
      if(koniIko()) {
         chukuaKoni();
      } else {
         wekaKoni();
      }
   }
}