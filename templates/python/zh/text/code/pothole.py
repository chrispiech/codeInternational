from 卡雷尔.stanford import *
def main():
   move()
   填充坑洼()
   move()

＃通过以下方式填充Karel当前位置下方的坑洼
＃在该角上放置一个锥体 。为了使此功能起作用
＃正确，卡雷尔必须正对着上方的东方
＃坑洼。执行完成后，Karel将拥有
＃返回同一广场，再次面向东方。
def 填充坑洼():
   turn_right()
   move()
   放锥体()
   turn_around()
   move()
   turn_right()

＃将Karel向右旋转90度。
def turn_right():
   turn_left()
   turn_left()
   turn_left()

＃将Karel旋转180度。
def turn_around():
   turn_left()
   turn_left()