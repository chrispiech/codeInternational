from karel.stanfordkarel import *
def main():
   moverse()
   llenar_baches()
   moverse()

# Rellena el bache debajo de la posición actual de Karel
# colocando un cono en esa esquina. Para que esta función funcione
# correctamente, Karel debe estar orientado hacia el este inmediatamente arriba del
# bache. Cuando se complete la ejecución, Karel tendrá
# regresó al mismo cuadrado y nuevamente estará orientado hacia el este.
def llenar_baches():
   girar_derecha()
   moverse()
   poner_cono()
   media_vuelta()
   moverse()
   girar_derecha()

# Gira Karel 90 grados a la derecha.
def girar_derecha():
   girar_izquierda()
   girar_izquierda()
   girar_izquierda()

# Gira Karel alrededor de 180 grados.
def media_vuelta():
   girar_izquierda()
   girar_izquierda()