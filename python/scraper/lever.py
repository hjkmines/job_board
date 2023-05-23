
import pandas as pd
import requests
import json
import datetime
from datetime import date
import csv


def scrape_lever(companies_file: str, criteria: dict):

    def get_companies(companies_file: str) -> dict:
        with open(companies_file, 'r') as data:
            companies = {row[0]: row[1] for row in csv.reader(data)}
            
        companies_bad_lever = {}
        tokens = set(companies.keys())
        companies_clean = companies
       
        for token in tokens:
            if not requests.get(f'https://jobs.lever.co/v0/postings/{token}?mode=json'):
                companies_bad_lever[token] = companies.get(token)
                companies_clean.pop(token)

        if companies_bad_lever:
            with open(f"./logs/companies_bad_lever_{date.today()}.json", "w") as out:
                json.dump(companies_bad_lever, out)

        return companies_clean

    def get_jobs(companies: dict, criteria: dict) -> list:
        roles = criteria.get('roles')
        levels = criteria.get('levels')
        exclude = criteria.get('exclude')
    
        tokens = set(companies.keys())
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
                                'link': job.get('applyUrl')[:-5], 'remote': True if job.get('workplaceType').lower() == 'remote' else False, 'location': job.get('categories').get('location'),
                                'date': datetime.datetime.fromtimestamp(int(str(job.get('createdAt'))[:-3])).isoformat()}

                    results.append(job_info)

        df = pd.DataFrame()
        df = df.from_records(results)
        return df

    companies_clean = get_companies(companies_file)
    df = get_jobs(companies_clean, criteria)
    df['source'] = 'lever'

    return df
