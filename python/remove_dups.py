import pymongo
from dotenv import dotenv_values

MONGO_URL = dotenv_values('config/config.env').get('MONGO_URL')
client = pymongo.MongoClient(MONGO_URL)
db = client["test"]

jobs_coll = db['jobs_test']

""" db.jobs_copy.aggregate([
    { "$group": {
        "_id": { "link": "$link" },
        "dups": { "$push": "$_id" },
        "count": { "$sum": 1 }
    }},
    { "$match": { "count": { "$gt": 1 } }},
{'$sort': {'date': 1}}]).forEach(function (doc) {
    doc.dups.shift();
    db.jobs_copy.deleteOne({ _id: { $in: doc.dups } });
  }); """