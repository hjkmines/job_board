import scraper
import pandas as pd
from datetime import date
import pymongo
from dotenv import dotenv_values
import json
import os

today = date.today()

# Web scrapers
dice_df = scraper.scrape_dice() 

indeed_df = scraper.scrape_indeed()

# Greenhouse API
companies_file = 'companies.csv'

roles = {'developer','engineer', 'frontend', 'software', 'apprentice', 'apprenticeship', 'front-end', 'backend', 'back-end', 'jr.', 'jr' }

# Includes 'software' for titles that are just 'software engineer', etc.
levels = {'junior', 'entry-level', 'grad', 'graduate', 'apprentice', 'apprenticeship', 'software', 'entry', 'intern', 'i', '1', 'associate'}

# Optional, but helps exclude higher level positions
exclude = {'senior', 'principal' , 'sr.', 'ii', 'iii'}

criteria ={'roles': roles, 'levels': levels, 'exclude' : exclude}

greenhouse_df = scraper.scrape_greenhouse(companies_file, criteria)

# Output dir
if not os.path.exists(f'./output/{today}'):
    os.mkdir(f'./output/{today}')

# Output paths
greenhouse_json = f'./output/{today}/greenhouse_{today}.json'
dice_json = f'./output/{today}/dice_{today}.json'
indeed_json = f'./output/{today}/indeed_{today}.json'

# Output json 
greenhouse_df.to_json(greenhouse_json, orient='records')
dice_df.to_json(dice_json, orient='records')
indeed_df.to_json(indeed_json, orient='records')



MONGO_URL = dotenv_values('config/config.env').get('MONGO_URL') 
client = pymongo.MongoClient(MONGO_URL)
db = client["test"]

dice_coll = db["dice_test"]
indeed_coll = db["indeed_test"]
greenhouse_coll = db["greenhouse_test"]


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


insert_json(dice_json, dice_coll)
insert_json(indeed_json, indeed_coll)
insert_json(greenhouse_json, greenhouse_coll)

