# Archivo: Esquina Conos .py
# -----------------------------
# cono un cono en cada esquina
from karel.stanfordkarel import *
def main():
   # repite el cuerpo 4 veces
   for i in range(4):
	   poner_cono()
	   moverse()
	   moverse()
	   moverse()
	   girar_izquierda()
