import stanford.कैरेल.*;
public class गड्ढेभरनेवालाकरेल extends कैरेल {
   public void run() {
      move();
      गड्ढाभरना();
      move();
   }

   /**
    * उस कोने पर beeper रखकर करेल की वर्तमान स्थिति के न
    * ीचे गड्ढे को भरता है। सही तरीके से काम करने के लिए
    * इस विधि के लिए, कारेल को गड्ढे के ऊपर तुरंत पूर्व
    * की ओर होना चाहिए। जब निष्पादन पूरा हो जाएगा, तो क
    * ारेल उसी वर्ग में लौट आएंगे और फिर से पूर्व की ओर
    * मुख करेंगे।
    */
   private void गड्ढाभरना() {
      turnRight();
      move();
      putBeeper();
      turnAround();
      move();
      turnRight();
   } 

   /** करेल को 90 डिग्री दाईं ओर मोड़ता है। */
   public void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }

   /** करेल को 180 डिग्री के आसपास घुमाता है। */
   public void turnAround() {
      turnLeft();
      turnLeft();
   }
}