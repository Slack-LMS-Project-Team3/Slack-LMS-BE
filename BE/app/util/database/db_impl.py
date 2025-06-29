from abc import ABCMeta, abstractmethod

class ConnectionError(Exception):
    pass


class ExecuteError(Exception):
    pass


class DBImpl(metaclass = ABCMeta):
    def __init__(self):
        self.connection = None
        self.conn_args = {}
        self.connect()

    def connect(self):
        try:
            self._connect()
        except Exception as e:
            raise ConnectionError(f"데이터베이스 연결에 실패했습니다 :: {e}")
