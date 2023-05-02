
import pandas as pd
import requests
import json
import html
import datetime
import csv
import re



companies_df = pd.read_csv('../lever_companies.csv')

companies_dict = {}
for _, row in companies_df.iterrows():
    companies_dict[row['Token']] = row['Company']

tokens = set(companies_df.Token)
companies_clean = companies_dict
companies_bad_lever = {}

for token in tokens:
    if not requests.get(f'https://jobs.lever.co/v0/postings/{token}?mode=json'):
        print(f'API call for {token} failed')
        companies_bad_lever[token] = companies_dict.get(token)
        companies_clean.pop(token)



roles = {'developer', 'engineer', 'data', 'engineering', 'frontend', 'software', 'apprentice',
         'analyst', 'quality', 'apprenticeship', 'front-end', 'backend', 'back-end', 'jr.', 'jr'}
# Includes 'software' for titles that are just 'software enginer', etc.
levels = {'junior', 'entry-level', 'grad', 'graduate', 'data', 'apprentice', 'apprenticeship',
          'software', 'qa', 'quality', 'test', 'entry', 'intern', 'i', '1', 'associate', 'co-op'}
# Optional, but helps exclude higher level postiions
exclude = {'senior', 'principal', 'sr.', 'sr' 'ii', 'iii', 'director'}

res = requests.get(f'https://jobs.lever.co/v0/postings/tegus?mode=json')
jobs = json.loads(res.text)
job = jobs[0]

results = []

for token in tokens:
    res = requests.get(f'https://jobs.lever.co/v0/postings/{token}?mode=json')
    if res:
        jobs = json.loads(res.text)

    company = companies_clean.get(token)

    for job in jobs:
        title = set(job.get('text').lower().split())

        if title.intersection(roles) and title.intersection(levels) and not title.intersection(exclude):
            job_info = {'title': job.get('text'), 'company': company, 'description': job.get('descriptionPlain'),
                        'link': job.get('applyUrl'), 'remote': True if job.get('workplaceType').lower() == 'remote' else False, 'location': job.get('categories').get('location'),  'date_posted': datetime.datetime.fromtimestamp(job.get('createdAt')/1000.).isoformat()}

            results.append(job_info)

df = pd.DataFrame()
df = df.from_records(results)

df.sort_values(by='date_posted', ascending=False)
