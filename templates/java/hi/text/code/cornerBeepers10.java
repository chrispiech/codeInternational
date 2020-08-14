/*
 * फ़ाइल: कोनेपांच कोनो एस। जावा
 * ----------------------------
 * प्रत्येक कोने में पाँच beeper स्थान हैं
 */
import stanford.कैरेल.*;
public class कोनेपांचConoएस extends कैरेल {

   public void run() {
      /* प्रत्येक कोने के लिए एक बार दोहराएं */
      for(int i = 0; i < 4; i++) {
         पांचConoएसCono();
         अगलेकोनेमेंMove();
      }
   } 

   /* अगले कोने में रिप्लेसमेंट कारेल */
   public void अगलेकोनेमेंMove() {
      move();
      move();
      move();
      turnLeft();
   }

   /* 5 beeper s लूप के लिए उपयोग होता है */
   public void पांचConoएसCono() {
      for(int i = 0; i < 5; i++) {
      	putBeeper();
      }
   }
}