/*
 * फ़ाइल: कॉनो लिफ्टकरकरेल। जावा
 * ----------------------------
 * कॉनो पिककारकरेल कार्यक्रम कमांड के साथ एक " run "
 * विधि को परिभाषित करता है, जो कारेल को beeper एक कग
 * ार पर beeper ।
 */
import stanford.कैरेल.*;
public class Conoउठाकरकरेल extends कैरेल {
   public void run() {
      move();
      pickBeeper();
      move();
      turnLeft();
      move();
      turnLeft();
      turnLeft();
      turnLeft();
      move();
      move();
      putBeeper();
      move();
   } 
}