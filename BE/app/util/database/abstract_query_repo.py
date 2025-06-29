from abc import ABCMeta, abstractmethod

class AbstractQueryRepo(metaclass=ABCMeta):
    def __init__(self):
        self.queries = {}
    
    def get_sql(self, sql_name):
        return self.queries[sql_name]
