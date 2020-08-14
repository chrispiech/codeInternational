import stanford.कैरेल.*;
public class Conoएस extends कैरेल {
   /** यहाँ निष्पादन शुरू करें */
   public void run() {
      while(frontIsClear()) {
         cono();
         move();
      }
      /* एक बेड़ा बग को रोकने के लिए */
      cono();
   }

   /*  अगर कोई मौजूद है तो beeper उठाता है, अन्यथा beeper
    * नीचे beeper है */
   public void cono() {
      /* a / if स्टेटमेंट */
      if(beepersPresent()) {
         pickBeeper();
      } else {
         putBeeper();
      }
   }
}