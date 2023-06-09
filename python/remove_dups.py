import pymongo
from dotenv import dotenv_values
import pprint

def remove_dups():
    MONGO_URL = dotenv_values('config/config.env').get('MONGO_URL')
    client = pymongo.MongoClient(MONGO_URL)
    db = client["test"]

    jobs_coll = db['jobs_test']

    dups = list(jobs_coll.aggregate([
        {"$group": {
            "_id": {"link": "$link"},
            "dups": {"$push": "$_id"},
            "count": {"$sum": 1}
        }},
        {"$match": {"count": {"$gt": 1}}},
        {"$sort": {"date": 1}}
    ]))

    for dup in dups:
        jobs_coll.delete_many({'_id' : {'$in' : dup[:-1]}})

    # jobs_coll.eval(
    #     '''db.jobs_test.aggregate([
    #     { "$group": {
    #     "_id": { "link": "$link" },
    #     "dups": { "$push": "$_id" },
    #     "count": { "$sum": 1 }
    #     }},
    #     { "$match": { "count": { "$gt": 1 } }},
    #     {"$sort": {"date": 1}}
    #     ],
    #     { allowDiskUse: true }).forEach(function (doc) {
    #     doc.dups.shift();
    #     db.jobs_backup.deleteMany({ _id: { $in: doc.dups } });
    #     }); ''')

remove_dups