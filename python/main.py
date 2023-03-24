import scraper
import pandas as pd
from datetime import date

today = date.today()

# Web scrapers
dice_df = scraper.scrape_dice()

dice_df.to_json(f'dice_{today}.json')

indeed_df = scraper.scrape_indeed()

indeed_df.to_json(f'indeed_{today}.json')

# Greenhouse API
companies_file = 'companies.csv'

roles = {'developer','engineer', 'frontend', 'software', 'apprentice', 'apprenticeship', 'front-end', 'backend', 'back-end', 'jr.', 'jr' }

# Includes 'software' for titles that are just 'software engineer', etc.
levels = {'junior', 'entry-level', 'grad', 'graduate', 'apprentice', 'apprenticeship', 'software', 'entry', 'intern', 'i', '1', 'associate'}

# Optional, but helps exclude higher level positions
exclude = {'senior', 'principal' , 'sr.', 'ii', 'iii' }

criteria ={'roles': roles, levels: 'levels', 'exclude' : exclude}

greenhouse_df = scraper.scrape_greenhouse(companies_file, criteria)

