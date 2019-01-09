db_config = {
    'remote': {
        'host': "111.230.244.113", 'port': 3306,
        'user': "root", 'passwd': "10001000",
        'db': "music", 'charset': "utf8",
        'pool': {
            # use = 0 no pool else use pool
            "use": 1,
            # size is >=0,  0 is dynamic pool
            "size": 0,
            # pool name
            "name": "remote",
        }
    }
}
