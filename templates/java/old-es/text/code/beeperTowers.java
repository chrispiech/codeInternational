/*
 * Archivo: BeeperRecogiendoKarel.java
 * -----------------------------------
 * La clase BeeperRecogiendoKarel recoge todos los
 * beepers en una serie de torres verticales y las
 * deposita en la esquina este de la primera fila.
 */
import stanford.karel.*;
public class BeeperRecogiendoKarel extends Karel {

   /**
    * Especifica el punto de entrada del programa.
    */
   public void run() {
      recogerTodosLosBeepers();
      soltarTodosLosBeepers();
      volverACasa();
   }

   /**
    * Recoge los beepers de cada torre moviéndose a lo
    * largo de la primera fila, llamando a
    * recogerUnaTorre en cada esquina. La condición
    * posterior para este método es que Karel se
    * encuentra en la esquina más oriental de la
    * primera fila mirando hacia el este.
    */
   private void recogerTodosLosBeepers() {
      while (elFrenteEsClaro()) {
         recogerUnaTorre();
         moverse(); 
      }
      recogerUnaTorre();
   }

   /**
    * Recoge los beepers en una sola torre. Cuando se
    * llama recogerUnaTorre, Karel debe estar en la
    * primera fila mirando hacia el este. La
    * postcondición para recogerUnaTorre es que Karel
    * debe estar nuevamente orientada al este en esa
    * misma esquina.
    */
   private void recogerUnaTorre() {
      girarALaIzquierda();
      coleccionarLíneaDeBeepers();
      giroDeVuelta();
      moverALaPared();
      girarALaIzquierda();
   }

   /**
    * Recoge una línea consecutiva de beepers. El final
    * de la línea de señalización se indica mediante
    * una esquina que no contiene señales acústicas.
    */
   private void coleccionarLíneaDeBeepers() {
      while (beepersPresente()) {
         recogerBeeper();
         if (elFrenteEsClaro()) {
            moverse(); 
         }
      } 
   }

   /**
    * Deja caer todos los beepers en la esquina actual.
    */
   private void soltarTodosLosBeepers() {
      while (beepersEnBolsa()) {
         ponerBeeper();
      }
   }

   /**
    * Devuelve a Karel a su posición inicial en la
    * esquina de 1st Avenue y 1st row, mirando hacia el
    * este. La condición previa para este método es que
    * Karel debe estar orientado hacia el este en algún
    * lugar de la primera fila, lo cual es cierto al
    * final de recogerTodosLosBeepers.
    */
   private void volverACasa() {
      giroDeVuelta();
      moverALaPared();
      giroDeVuelta();
   }

   /** Mueve a Karel hacia adelante hasta que es bloqueada por un muro. */
   private void moverALaPared(){
      while (elFrenteEsClaro()) {
         moverse();
      } 
   }

   /** Da vuelta a Karel 180 grados alrededor */
   private void giroDeVuelta(){
      girarALaIzquierda();
      girarALaIzquierda();
   }
}