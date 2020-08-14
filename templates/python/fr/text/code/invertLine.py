from karel.stanfordkarel import *

# le début du programme
def main():
   while l'avant_est_clair(): 
      inverser_jeton()
      avancer()
   # pour éviter un bug de clôture
   inverser_jeton()

# prend un jeton s'il y en a un
# pose un jeton sinon
def inverser_jeton():
   # une instruction if / else
   if jetons_présent():
      ramasser_jeton()
   else:
      laisser_jeton()