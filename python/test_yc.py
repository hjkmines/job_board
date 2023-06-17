import scraper
from datetime import date
import pymongo
from dotenv import dotenv_values
import os
import cleaning

print('yc')
yc_data = scraper.scrape_yc()

MONGO_URL = dotenv_values('config/config.env').get('MONGO_URL')
client = pymongo.MongoClient(MONGO_URL)
db = client["test"]

jobs_coll = db['jobs_test']

# jobs_coll.drop()
# jobs_coll = db['jobs_test']
print('Indexing...')
jobs_coll.create_index([('points', pymongo.GEOSPHERE)])
jobs_coll.create_index(
    [('title', pymongo.TEXT), ('description', pymongo.TEXT), ('company', pymongo.TEXT)])


print('Inserting documents...')
jobs_coll.insert_many(yc_data)


print('Clean up')
cleaning.delete_dups()


print('Done!')