/*
 * फ़ाइल: कोने कोनो एस। जावा
 * ------------------------
 * प्रत्येक कोने में एक beeper स्थान
 */
import stanford.कैरेल.*;
public class कोनेConoएस extends कैरेल {
   public void run() {
      /* शरीर को 4 बार दोहराएं */
      for(int i = 0; i < 4; i++) {
      	putBeeper();
      	move();
      	move();
      	move();
      	turnLeft();
      }
   } 
}