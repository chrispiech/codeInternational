＃文件：BeeperCollectingKarel.py
＃--------------------------------
＃BeeperCollectingKarel类收集所有锥体秒
＃在一系列垂直塔中并将它们存放在
＃第一行的最东角。
from 卡雷尔.stanford import *

def main():
   收集所有锥体秒()
   删除所有锥体秒()
   回家()

＃沿1号移动，从每个塔中收集锥体秒
＃行，在每个角落呼叫收集一个塔。的
＃此功能的后置条件是Karel在
＃第一排的最东角朝东。
def 收集所有锥体秒():
   while front_is_clear():
      收集一个塔()
      move()
   收集一个塔()

＃在单个塔中收集锥体 。当收集一个塔
＃被称为，Karel必须在向东的第一排。的
＃收集一个塔的后置条件是卡雷尔必须再次
＃在同一角落向东。
def 收集一个塔():
   turn_left()
   收集锥体秒()
   turn_around()
   move至墙()
   turn_left()

＃收集锥体 s的连续行。 锥体
＃线由不包含锥体 s的角指示。
def 收集锥体秒():
   while 锥体():
      选择锥体()
      if front_is_clear():
         move()

＃将所有锥体放到当前角上。
def 删除所有锥体秒() :
   while 锥体_s():
      放锥体()

＃将卡雷尔（Karel）返回其在第1个角的初始位置
＃大道和第一排，朝东。前提条件
＃功能是，卡雷尔必须在1日朝东
＃行，这在“收集所有锥体秒”结束时正确。
def 回家():
   turn_around()
   move至墙()
   turn_around()

＃向前移动卡雷尔，直到被墙壁挡住。
def move至墙():
   while front_is_clear():
      move()

＃将Karel旋转180度
def turn_around():
   turn_left()
   turn_left()