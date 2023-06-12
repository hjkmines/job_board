import scraper
from datetime import date
import pymongo
from dotenv import dotenv_values
import os
import cleaning

today = date.today()

# Output dir
if not os.path.exists(f'./output/{today}'):
    os.mkdir(f'./output/{today}')

# Web scrapers
print('Scraping Dice...')
dice_data = scraper.scrape_dice(pages=10)


print('Scraping Indeed...')
indeed_data = scraper.scrape_indeed(pages=10)

# Company lists
greenhouse_companies_file = 'greenhouse_companies.csv'
lever_companies_file = 'lever_companies.csv'

roles = {'developer', 'engineer', 'data', 'analyst', 'scientist', 'frontend', 'software',
         'apprentice', 'apprenticeship', 'front-end', 'backend', 'back-end'}

# Includes 'software' for titles that are just 'software engineer', etc.
levels = {'junior', 'entry-level', 'grad', 'graduate', 'apprentice', 'web',
          'apprenticeship', 'software', 'entry', 'intern', 'i', '1', 'associate', 'jr.', 'jr'}

# Optional, but helps exclude higher level positions
exclude = {'senior', 'principal', 'sr.', 'sr', 'ii', 'iii'}

criteria = {'roles': roles, 'levels': levels, 'exclude': exclude}

# Scraping Greenhouse
print('Scraping Greenhouse...')
greenhouse_data = scraper.scrape_greenhouse(
    greenhouse_companies_file, criteria)

print('Scraping Lever...')
lever_data = scraper.scrape_lever(lever_companies_file, criteria)

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
jobs_coll.insert_many(indeed_data)
jobs_coll.insert_many(dice_data)
jobs_coll.insert_many(greenhouse_data)
jobs_coll.insert_many(lever_data)

print('Clean up')
cleaning.delete_dups()


print('Done!')
