from karel.stanfordkarel import *
def main():
   avancer()
   remplir_les_nids_de_poule()
   avancer()

# Remplit le nid-de-poule sous la position actuelle de Karel en
# placer un jeton sur ce coin. Pour que cette fonction fonctionne
# correctement, Karel doit être face à l'est immédiatement au-dessus du
# nid de poule. Lorsque l'exécution est terminée, Karel aura
# est revenu sur la même place et sera de nouveau face à l'est.
def remplir_les_nids_de_poule():
   tourner_droite()
   avancer()
   laisser_jeton()
   tourner_autour()
   avancer()
   tourner_droite()

# Tourne Karel de 90 degrés vers la droite.
def tourner_droite():
   tourner_gauche()
   tourner_gauche()
   tourner_gauche()

# Fait tourner Karel d'environ 180 degrés.
def tourner_autour():
   tourner_gauche()
   tourner_gauche()