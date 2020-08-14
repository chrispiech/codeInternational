from karel.stanfordkarel import *

# el inicio del programa
def main():
   while frente_despejado(): 
      invertir_cono()
      moverse()
   # para prevenir un error en el poste de la cerca
   invertir_cono()

# recoge un cono si hay uno presente
# pone un cono contrario
def invertir_cono():
   # una declaración if / else
   if conos_presente():
      recoger_cono()
   else:
      poner_cono()