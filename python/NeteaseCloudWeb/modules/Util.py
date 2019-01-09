import time
import re
import logging.handlers
import os
import string
import random
import datetime


class Util():
    DELAY_TIME = 2  # 操作延迟时间
    KEY_LEN = 10
    LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    def __init__(self):
        pass

    def check_content(self, matcher, string):
        return re.search(str(matcher), str(string))

    def get_current_time(self):
        return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

    def get_num_in_str(self, string):
        str1 = filter(str.isdigit, string)
        num_str = ''
        for item in str1:
            num_str += item
        if num_str != '':
            return int(num_str)
        else:
            return 0

    def cut_between_str(self, string, key1, key2):
        index1 = string.find(key1)
        index2 = string.find(key2)
        return string[index1 + 1:index2]

    def finally_result(self, util, logger, file_name, error_num):
        if error_num > 0:
            file_name, extension_name = os.path.splitext(os.path.basename(os.path.realpath(file_name)))
            print("检测存在", error_num, "个错误，详细请查看日志", file_name, ".log")
            logger.warning_str("检测存在", error_num, "个错误，详细请查看日志")
        else:
            print(util.get_current_time(), "检测全部通过")
            logger.info("检测全部通过")

    def switch_to_new_window(self, driver, current_handle):
        all_handles = driver.window_handles  # 获取全部页面句柄
        for handle in all_handles:  # 遍历全部页面句柄
            if handle != current_handle:  # 判断条件
                driver.switch_to.window(handle)  # 切换到新页面
