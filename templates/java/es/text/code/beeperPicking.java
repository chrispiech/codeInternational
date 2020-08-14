/*
 * Archivo: Primero Karel .java
 * ---------------------------
 * El programa Primero Karel define un método " run "
 * con tres comandos. Estos comandos causan Karel a
 * moverserse reenviar un bloque, recoger un cono y lueg
 * o moverserse avanzar a la siguiente esquina.
 */
import stanford.karel.*;
public class PrimeroKarel extends Karel {
   /* El programa comienza aquí ejecutando */
   public void run() {
      moverse();
      recogerCono();
      moverse();
   } 
}