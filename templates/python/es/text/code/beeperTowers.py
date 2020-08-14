# Archivo: Cono Recopilando Karel .py
# --------------------------------
# La clase Cono Collecting Karel recopila todos los conos
# en una serie de torres verticales y las deposita en el
# esquina más al este en la 1ra fila.
from karel.stanfordkarel import *

def main():
   recoger_todo_conos()
   soltar_todo_conos()
   volver_a_casa()

# Recoge el conos de cada torre moviéndose a lo largo de la primera
# fila, llamando a recoger_una_torre en cada esquina. los
# La Karel para esta función es que Karel esté en el
# esquina más al este de la 1ra fila mirando al este.
def recoger_todo_conos():
   while frente_despejado():
      recoger_una_torre()
      moverse()
   recoger_una_torre()

# Recoge el conos en una sola torre. Cuando recoger_una_torre
#, Karel debe estar en la 1ª fila mirando al este. los
# La condición posterior para recoger_una_torre es que Karel debe volver a
# estar mirando hacia el este en la misma esquina.
def recoger_una_torre():
   girar_izquierda()
   recoger_línea_de_conos()
   media_vuelta()
   moverse_a_la_pared()
   girar_izquierda()

# Recopila una línea consecutiva de conos . El fin del cono
La línea # está indicada por una esquina que no contiene conos .
def recoger_línea_de_conos():
   while conos_presente():
      recoger_cono()
      if frente_despejado():
         moverse()

# conos todo el conos en la esquina actual.
def soltar_todo_conos() :
   while conos_en_bolsa():
      poner_cono()

# Devuelve Karel a su posición inicial en la esquina de la 1ra.
# Avenida y 1ª fila, orientada al este. La condición previa para esto
# función es que Karel debe estar orientado hacia el este en algún lugar de la primera
# fila, que es verdadera al final de recoger_todo_conos.
def volver_a_casa():
   media_vuelta()
   moverse_a_la_pared()
   media_vuelta()

# Mueve Karel hacia adelante hasta que un muro lo bloquea.
def moverse_a_la_pared():
   while frente_despejado():
      moverse()

# Gira Karel 180 grados alrededor
def media_vuelta():
   girar_izquierda()
   girar_izquierda()