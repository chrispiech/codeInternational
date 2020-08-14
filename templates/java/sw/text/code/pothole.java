import stanford.karel.*;
public class PholeKujazaKarel extends Karel {
   public void run() {
      move();
      kujazaPothole();
      move();
   }

   /**
    * Inajaza pothole chini ya nafasi ya sasa ya Karel k
    * wa kuweka koni kwenye kona hiyo. Kwa njia hii ya k
    * ufanya kazi kwa usahihi, Karel lazima atakabiliwa
    * mashariki mara moja juu ya pothole. Wakati utekele
    * zaji ukamilifu, Karel atarudi kwenye mraba huo na
    * ataangalia tena mashariki.
    */
   private void kujazaPothole() {
      geukaKulia();
      move();
      wekaKoni();
      turnAround();
      move();
      geukaKulia();
   } 

   /** Inarudi Karel 90 kwa haki. */
   public void geukaKulia() {
      geukaKushoto();
      geukaKushoto();
      geukaKushoto();
   }

   /** Anachukua Karel karibu digrii 180. */
   public void turnAround() {
      geukaKushoto();
      geukaKushoto();
   }
}