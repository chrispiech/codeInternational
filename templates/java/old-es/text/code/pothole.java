import stanford.karel.*;
public class RellenoDeBachesDeCarel extends Karel {
   public void run() {
      moverse();
      rellenarBache();
      moverse();
   }

   /**
    * Rellena el bache debajo de la posición actual de
    * Karel colocando un beeper en esa esquina. Para
    * que este método funcione correctamente, Karel
    * debe estar orientado hacia el este,
    * inmediatamente por encima del bache. Cuando se
    * complete la ejecución, Karel habrá regresado a la
    * misma plaza y nuevamente estará orientada hacia
    * el este.
    */
   private void rellenarBache() {
      girarALaDerecha();
      moverse();
      ponerBeeper();
      giroDeVuelta();
      moverse();
      girarALaDerecha();
   } 

   /** Gira a Karel 90 grados a la derecha. */
   public void girarALaDerecha() {
      girarALaIzquierda();
      girarALaIzquierda();
      girarALaIzquierda();
   }

   /** Da vuelta a Karel alrededor de 180 grados. */
   public void giroDeVuelta() {
      girarALaIzquierda();
      girarALaIzquierda();
   }
}