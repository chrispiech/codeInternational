/*
 * Funga: KoniPickingKarel.java
 * ---------------------------
 * Programu ya KoniPickingKarel inafafanua njia " run
 * " na amri tatu. Amri hizi husababisha Karel kufik
 * ia move mbele ya block moja, kuchukua koni , na ki
 * sha move mbele kona inayofuata.
 */
import stanford.karel.*;
public class KoniPickingKarel extends Karel {
   public void run() {
      move();
      chukuaKoni();
      move();
      geukaKushoto();
      move();
      geukaKulia();
      move();
      move();
      wekaKoni();
      move();
   }

   /**
    * Inarudi Karel 90 kwa haki.
    */
   private void geukaKulia() {
      geukaKushoto();
      geukaKushoto();
      geukaKushoto();
   }
}