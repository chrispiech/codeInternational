# Fichier: Jeton CollectingKarel.py
# --------------------------------
# La classe Jeton CollectingKarel rassemble tous les jetons
# dans une série de tours verticales et les dépose au
# coin le plus à l'est au 1er rang.
from karel.stanfordkarel import *

def main():
   collectionner_tous_jetons()
   tout_laisser_tomber_jetons()
   rentrer_à_la_maison()

# jetons le jetons de chaque tour en se déplaçant le
# row, appelant recueillir_une_tour à chaque coin. le
# la postcondition pour cette fonction est que Karel soit dans le
# coin le plus à l'est de la 1ère rangée face à l'est.
def collectionner_tous_jetons():
   while l'avant_est_clair():
      recueillir_une_tour()
      avancer()
   recueillir_une_tour()

# Collecte le jetons dans une seule tour. Lorsque recueillir_une_tour
# est appelé, Karel doit être au 1er rang face à l'est. le
# postcondition pour recueillir_une_tour est que Karel doit à nouveau
# être face à l'est dans ce même coin.
def recueillir_une_tour():
   tourner_gauche()
   collecter_la_ligne_de_jetons()
   tourner_autour()
   avancer_au_mur()
   tourner_gauche()

# Collecte une ligne consécutive de jetons . La fin du jeton
La ligne # est indiquée par un coin qui ne contient pas jetons .
def collecter_la_ligne_de_jetons():
   while jetons_présent():
      ramasser_jeton()
      if l'avant_est_clair():
         avancer()

# jetons tous les jetons sur le coin actuel.
def tout_laisser_tomber_jetons() :
   while jetons_en_sac():
      laisser_jeton()

# Ramène Karel à sa position initiale au coin du 1er
# Avenue et 1ère rangée, face à l'est. La condition préalable pour cela
# fonction est que Karel doit être face à l'est quelque part le 1er
# row, ce qui est vrai à la fin de collectionner_tous_jetons.
def rentrer_à_la_maison():
   tourner_autour()
   avancer_au_mur()
   tourner_autour()

# Fait avancer Karel jusqu'à ce qu'il soit bloqué par un mur.
def avancer_au_mur():
   while l'avant_est_clair():
      avancer()

# Fait tourner Karel de 180 degrés
def tourner_autour():
   tourner_gauche()
   tourner_gauche()