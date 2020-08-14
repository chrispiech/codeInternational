/*
 * Archivo: ConoRecogida Karel .java
 * --------------------------------
 * La clase ConoRecogida Karel recoge todos los conos
 * en una serie de torres verticales y las deposita
 * en la esquina este de la primera fila.
 */
import stanford.karel.*;
public class ConoRecogidaKarel extends Karel {

   /**
    * Especifica el punto de entrada del programa.
    */
   public void run() {
      recogerTodosLosConos();
      soltarTodoConos();
      volverACasa();
   }

   /**
    * Colecciona el conos de cada torre moviéndose a lo
    * largo de la primera fila, llamando a recogerUnaTor
    * re en cada esquina. La Karel para este método es q
    * ue Karel encuentra en la esquina más oriental de l
    * a primera fila, mirando hacia el este.
    */
   private void recogerTodosLosConos() {
      while (frenteDespejado()) {
         recogerUnaTorre();
         moverse(); 
      }
      recogerUnaTorre();
   }

   /**
    * Recoge el conos en una sola torre. Cuando se llama
    * Karel , Karel debe estar en la 1ra fila mirando h
    * acia el este. La postcondición para recogerUnaTorr
    * e es que Karel debe estar nuevamente orientada al
    * este en esa misma esquina.
    */
   private void recogerUnaTorre() {
      girarIzquierda();
      líneaDeConosDeConos();
      mediaVeulta();
      moverseAPared();
      girarIzquierda();
   }

   /**
    * Recoge una línea consecutiva de conos . El final d
    * e la línea cono se indica mediante una esquina que
    * no contiene conos .
    */
   private void líneaDeConosDeConos() {
      while (conosPresentes()) {
         recogerCono();
         if (frenteDespejado()) {
            moverse(); 
         }
      } 
   }

   /**
    * Deja conos todos los conos en la esquina actual.
    */
   private void soltarTodoConos() {
      while (bolsaConConos()) {
         ponerCono();
      }
   }

   /**
    * Regresa Karel a su posición inicial en la esquina
    * de 1st Avenue y 1st row, mirando hacia el este. La
    * condición previa para este método es que Karel de
    * be estar orientado hacia el este en algún lugar de
    * la 1ª fila, lo cual es cierto al final de recoger
    * TodosLosConos.
    */
   private void volverACasa() {
      mediaVeulta();
      moverseAPared();
      mediaVeulta();
   }

   /** Mueve Karel hacia adelante hasta que es bloqueado por una pared. */
   private void moverseAPared(){
      while (frenteDespejado()) {
         moverse();
      } 
   }

   /** Gira Karel 180 grados alrededor */
   private void mediaVeulta(){
      girarIzquierda();
      girarIzquierda();
   }
}