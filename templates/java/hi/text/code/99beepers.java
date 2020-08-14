/*
 * फ़ाइल: कईजगह कोनो एस। जावा
 * -------------------------
 * लूप के लिए 42 beeper स्थानों का उपयोग करना
 */
import stanford.कैरेल.*;
public class कईजगहConoएस extends कैरेल {
   public void run() {
      move();
      /* कई बार बीपीरिपो दोहराएं */
      for(int i = 0; i < 42; i++) {
      	putBeeper();
      }
      move();
   } 
}