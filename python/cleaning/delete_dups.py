import pymongo
from dotenv import dotenv_values


def delete_dups(collection='jobs_test'):
    MONGO_URL = dotenv_values('config/config.env').get('MONGO_URL')
    client = pymongo.MongoClient(MONGO_URL)
    db = client["test"]

    jobs_coll = db[collection]

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
        print(dup)
        jobs_coll.delete_many({'_id': {'$in': dup.get('dups')[:-1]}})

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
