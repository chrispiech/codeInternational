import stanford.karel.*;
public class RellenoDeBachesKarel extends Karel {
   public void run() {
      moverse();
      llenarBaches();
      moverse();
   }

   /**
    * Rellena el bache por debajo Karel posición actual
    * 's mediante la colocación de un cono en esa esquin
    * a. Para que este método funcione correctamente, Ka
    * rel debe estar orientado hacia el este inmediatame
    * nte por encima del bache. Cuando se complete la ej
    * ecución, Karel habrán regresado a la misma plaza y
    * nuevamente estarán orientados hacia el este.
    */
   private void llenarBaches() {
      girarDerecha();
      moverse();
      ponerCono();
      mediaVeulta();
      moverse();
      girarDerecha();
   } 

   /** Gira Karel 90 grados a la derecha. */
   public void girarDerecha() {
      girarIzquierda();
      girarIzquierda();
      girarIzquierda();
   }

   /** Gira Karel alrededor de 180 grados. */
   public void mediaVeulta() {
      girarIzquierda();
      girarIzquierda();
   }
}