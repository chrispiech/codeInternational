# Archivo: Cono Recogiendo Karel .py
# -----------------------------
# El programa Cono Picking Karel define un " main "
# función con tres comandos. Estos comandos causan
# Karel a moverse hacia adelante un bloque, tome un
# cono y luego moverse adelante a la siguiente esquina.
from karel.stanfordkarel import *
def main():
   moverse()
   recoger_cono()
   moverse()
   girar_izquierda()
   moverse()
   girar_derecha()
   moverse()
   moverse()
   poner_cono()
   moverse()

def girar_derecha():
   girar_izquierda()
   girar_izquierda()
   girar_izquierda()