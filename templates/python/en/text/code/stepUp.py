# File: FirstKarel.py
# -----------------------------
# The FirstKarel program defines a "main" 
# function with commands that cause Karel to pick up
# a beeper and place it on a ledge.
from karel.stanfordkarel import *

def main():
   move()
   pick_beeper()
   move()
   turn_left()
   move()
   turn_left()
   turn_left()
   turn_left()
   move()
   move()
   put_beeper()
   move()
   