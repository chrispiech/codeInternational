/*
 * फ़ाइल: कॉनो लिफ्टकरकरेल। जावा
 * ----------------------------
 * कोनो पिककरकारेल कार्यक्रम तीन कमांड के साथ एक " ru
 * n " विधि को परिभाषित करता है। इन आदेशों के कारण का
 * रेल move फॉरवर्ड एक ब्लॉक, एक beeper , और फिर move
 * आगे के कोने पर move जाता है।
 */
import stanford.कैरेल.*;
public class Conoउठाकरकरेल extends कैरेल {
   public void run() {
      move();
      pickBeeper();
      move();
      turnLeft();
      move();
      turnRight();
      move();
      move();
      putBeeper();
      move();
   }

   /**
    * करेल को 90 डिग्री दाईं ओर मोड़ता है।
    */
   private void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }
}