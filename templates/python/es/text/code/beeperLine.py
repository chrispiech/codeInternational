
# Archivo: ConoLínea.py
# ------------------------------
# Utiliza ciclo while para colocar una línea de conos .
# Este programa funciona para un mundo de cualquier tamaño.
from karel.stanfordkarel import *

# el programa comienza en main
def main():
   # se repite hasta que karel enfrenta a una pared
   while frente_despejado():
      # colocar un cono en el cuadrado actual
      poner_cono()
      # moverse al siguiente cuadrado
      moverse()
   # resuelve el error del poste de la cerca
   poner_cono()


