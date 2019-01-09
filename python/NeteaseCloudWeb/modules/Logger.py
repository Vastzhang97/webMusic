import logging.handlers
import os
import time
import logging


class Logger():
    logger = logging.getLogger('tst')
    file_path = ""
    start_time = time.time()

    def __init__(self, file_path):
        self.file_path = os.path.basename(os.path.realpath(file_path))
        file_name, extension_name = os.path.splitext(self.file_path)
        log_path = r'logs/' + file_name + '.log'
        handler = logging.handlers.RotatingFileHandler(log_path, encoding='utf-8')  # 实例化handler
        fmt = '%(levelname)s - %(asctime)s - %(message)s'
        formatter = logging.Formatter(fmt)
        handler.setFormatter(formatter)
        # self.logger = logging.getLogger('tst')
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.DEBUG)
        self.logger.info("开始执行脚本 " + self.file_path)

    def info(self, msg):
        self.logger.info(msg)

    def info_str(self, *args):
        strings = ''
        for string in args:
            strings += str(string)
        self.logger.info(strings)

    def warning(self, msg):
        self.logger.warning(msg)

    def warning_str(self, *args):
        strings = ''
        for string in args:
            strings += str(string)
        self.logger.warning(strings)

    def error(self, msg):
        self.logger.error(msg)

    def error_str(self, *args):
        strings = ''
        for string in args:
            strings += str(string)
        self.logger.error(strings)

    def log(self, msg):
        self.logger.log(msg)

    def log_str(self, *args):
        strings = ''
        for string in args:
            strings += str(string)
        self.logger.log(strings)

    def critical(self, msg):
        self.logger.critical(msg)

    def critical_str(self, *args):
        strings = ''
        for string in args:
            strings += str(string)
        self.logger.critical(strings)

    def exit(self):
        try:
            self.logger.info("执行脚本结束 " + self.file_path + "  耗时" + str(time.time() - self.start_time))
        except Exception as e:
            pass
