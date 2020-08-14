＃文件：MoveToWall.py
＃------------------------------
＃使用“ while”循环到move卡雷尔，直到命中
＃ 一堵墙。适用于任何大小的世界。
from 卡雷尔.stanford import *

＃程序以main
def main():
   ＃调用move to wall函数
   move至墙()

＃这是一个非常有用的功能
def move至墙():
   ＃在条件成立时重复身体
   while front_is_clear():
      move()


