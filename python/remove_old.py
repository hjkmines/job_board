import pymongo
from datetime import datetime, timedelta
from dotenv import dotenv_values

def remove_old(collection = 'jobs_test', delta = 360):
    MONGO_URL = dotenv_values('config/config.env').get('MONGO_URL')
    client = pymongo.MongoClient(MONGO_URL)
    db = client["test"]

    jobs_coll = db[collection]

    jobs_coll.delete_many({'date':{'$lt': datetime.now() - timedelta(days=delta)} })