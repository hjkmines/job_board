import scraper
import pandas as pd
from datetime import date
import pymongo
from dotenv import dotenv_values
import json
import os

today = date.today()

# Output dir
if not os.path.exists(f'./output/{today}'):
    os.mkdir(f'./output/{today}')

# Web scrapers
print('Scraping Dice...')
dice_df = scraper.scrape_dice(pages=1) 
dice_json = f'./output/{today}/dice_{today}.json'
dice_df.to_json(dice_json, orient='records')

print('Scraping Indeed...')
indeed_df = scraper.scrape_indeed(pages=1)
indeed_json = f'./output/{today}/indeed_{today}.json'
indeed_df.to_json(indeed_json, orient='records')

# Company lists
greenhouse_companies_file = 'greenhouse_companies.csv'
lever_companies_file = 'lever_companies.csv'

roles = {'developer','engineer', 'data', 'analyst', 'scientist','frontend', 'software', 'apprentice', 'apprenticeship', 'front-end', 'backend', 'back-end', 'jr.', 'jr' }

# Includes 'software' for titles that are just 'software engineer', etc.
levels = {'junior', 'entry-level', 'grad', 'graduate', 'apprentice', 'web', 'apprenticeship', 'software', 'entry', 'intern', 'i', '1', 'associate', 'jr.', 'jr'}

# Optional, but helps exclude higher level positions
exclude = {'senior', 'principal' , 'sr.', 'ii', 'iii'}

criteria ={'roles': roles, 'levels': levels, 'exclude' : exclude}

# Scraping Greenhouse
print('Scraping Greenhouse...')
greenhouse_df = scraper.scrape_greenhouse(greenhouse_companies_file, criteria)
greenhouse_json = f'./output/{today}/greenhouse_{today}.json'
greenhouse_df.to_json(greenhouse_json, orient='records')

print('Scraping Lever...')
lever_df = scraper.scrape_lever(lever_companies_file, criteria)
lever_json = f'./output/{today}/lever_{today}.json'
lever_df.to_json(lever_json, orient='records')

MONGO_URL = dotenv_values('config/config.env').get('MONGO_URL') 
client = pymongo.MongoClient(MONGO_URL)
db = client["test"]

jobs_coll = db['jobs_test']

jobs_coll.drop()
jobs_coll = db['jobs_test']

# Opening the json file
def insert_json(source_json: str, Collection):
    with open(source_json) as file:
        file_data = json.load(file)
        
    # Inserting the loaded data in the Collection
    # if JSON contains data more than one entry
    # insert_many is used else insert_one is used

    if isinstance(file_data, list):
        Collection.insert_many(file_data)

    else:
        Collection.insert_one(file_data)

print('Inserting documents...')
insert_json(dice_json, jobs_coll)
insert_json(indeed_json, jobs_coll)
insert_json(greenhouse_json, jobs_coll)
insert_json(lever_json, jobs_coll)

jobs_coll.create_index([('points', pymongo.GEOSPHERE)])