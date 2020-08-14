import stanford.كاريل.*;
public class كاريلملءكاريل extends كاريل {
   public void run() {
      move();
      ملءالحفرة();
      move();
   }

   /**
    * يملأ الحفرة تحت كاريل الحالي لـ مخروط بوضع مخروط ع
    * لى تلك الزاوية. لكي تعمل هذه الطريقة بشكل صحيح ، ي
    * جب مواجهة كاريل شرقًا مباشرةً فوق الحفرة. عند اكتم
    * ال التنفيذ ، كاريل إلى نفس المربع كاريل الشرق مرة
    * أخرى.
    */
   private void ملءالحفرة() {
      turnRight();
      move();
      putBeeper();
      turnAround();
      move();
      turnRight();
   } 

   /** يتحول كاريل 90 درجة إلى اليمين. */
   public void turnRight() {
      turnLeft();
      turnLeft();
      turnLeft();
   }

   /** يتحول كاريل حوالي 180 درجة. */
   public void turnAround() {
      turnLeft();
      turnLeft();
   }
}