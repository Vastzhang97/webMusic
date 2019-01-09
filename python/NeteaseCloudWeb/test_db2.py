import pymysql
from PyMysqlPool.db_util.mysql_util import query, query_single, insertOrUpdate
import logging
import mysql_config


def query_pool_size():
    job_status = 2
    _sql = "select *  from master_job_list j  where j.job_status  in (%s) "
    _args = (job_status,)
    task = query(mysql_config['remote'], _sql, _args)
    logging.info("query_npool method query_npool result is %s ,input _data is %s ", task, _args)
    return


def query_npool():
    job_status = 2
    _sql = "select *  from master_job_list j  where j.job_status  !=%s "
    _args = (job_status,)
    task = query_single(mysql_config['remote'], _sql, _args)
    logging.info("query_npool method query_npool result is %s ,input _data is %s ", task, _args)
    return


def insert(nlp_rank_id, hit_query_word):
    # add more args
    _args = (nlp_rank_id, hit_query_word)
    _sql = """INSERT INTO nlp_rank_poi_online (nlp_rank_id,hit_query_word,rank_type,poi_list,poi_raw_list,article_id,city_id,status,create_time,version,source_from) VALUES (%s,%s,%s, %s, %s,%s, %s,%s, %s,%s,%s)"""
    affect = insertOrUpdate(mysql_config['remote'], _sql, _args)
    logging.info("insert method insert result is %s ,input _data is %s ", affect, _args)
    return

query_single()