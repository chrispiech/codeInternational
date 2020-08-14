import stanford.كاريل.*;
public class InverمخروطS extends كاريل {
   /** بدء التنفيذ هنا */
   public void run() {
      while(frontIsClear()) {
         عكسمخروط();
         move();
      }
      /* لمنع علة fencepost */
      عكسمخروط();
   }

   /*  تلتقط مخروط إذا كان أحد حاضرين يضع مخروط خلاف ذلك */
   public void عكسمخروط() {
      /* إذا / آخر بيان */
      if(beepersPresent()) {
         pickBeeper();
      } else {
         putBeeper();
      }
   }
}