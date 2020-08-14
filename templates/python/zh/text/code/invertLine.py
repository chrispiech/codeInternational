from 卡雷尔.stanford import *

＃程序的开始
def main():
   while front_is_clear(): 
      反转锥体()
      move()
   ＃防止击剑杆错误
   反转锥体()

＃如果锥体话则接一个锥体
＃否则放下锥体
def 反转锥体():
   ＃一条if / else语句
   if 锥体():
      选择锥体()
   else:
      放锥体()