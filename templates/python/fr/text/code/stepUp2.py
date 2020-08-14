# Fichier: Jeton PickingKarel.py
# -----------------------------
# Le programme Jeton Jeton définit un " main "
# fonction avec trois commandes. Ces commandes provoquent
# Karel à avancer avancer d'un bloc, prendre un
# jeton puis avancer devant le coin suivant.
from karel.stanfordkarel import *
def main():
   avancer()
   ramasser_jeton()
   avancer()
   tourner_gauche()
   avancer()
   tourner_droite()
   avancer()
   avancer()
   laisser_jeton()
   avancer()

def tourner_droite():
   tourner_gauche()
   tourner_gauche()
   tourner_gauche()