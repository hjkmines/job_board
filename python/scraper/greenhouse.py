
import pandas as pd
import requests
import json
import html
from datetime import date
import csv


def scrape_greenhouse(companies_file: str, criteria: dict):

    # # Main Code
    # Finds jobs and outputs results as csv or excel file

    # Return a list of eligible jobs from a set of companies

    def get_companies(companies_file: str):
        with open(companies_file, 'r') as data:
            companies = {row[0]: row[1] for row in csv.reader(data)}
        companies_clean = companies
        companies_bad = {}
        tokens = set(companies.keys())
        for token in tokens:
            if not requests.get(f'https://boards-api.greenhouse.io/v1/boards/{token}/jobs'):
                companies_clean.pop(token)
                companies_bad[token] = companies.get(token)

        if companies_bad:
            with open(f"./logs/companies_bad_{date.today()}.json", "w") as out:
                json.dump(companies_bad, out)

        return companies_clean

    def get_jobs(companies: dict, criteria: dict) -> list:
        roles = criteria.get('roles')
        levels = criteria.get('levels')
        exclude = criteria.get('exclude')

        tokens = set(companies.keys())

        results = []

        for company in tokens:
            res = requests.get(
                f'https://boards-api.greenhouse.io/v1/boards/{company}/jobs')

            if res:
                jobs = json.loads(res.text).get('jobs')

            if jobs:
                for job in jobs:
                    title = set(job.get('title').lower().split())
                    if title.intersection(roles) and title.intersection(levels) and not title.intersection(exclude):
                        job['token'] = company
                        job['company'] = companies.get(company)
                        results.append(job)

        return results

    # Get job details for eligible jobs and return a dataframe with the job data

    def get_details(results: list) -> pd.DataFrame:
        data = []

        for job in results:
            url = f'https://boards-api.greenhouse.io/v1/boards/{job.get("token")}/jobs/{job.get("id")}'
            res = requests.get(url)

            if res:
                job_detail = json.loads(res.text)
                job_info = {'title': job_detail.get('title'), 'company': job.get('company'), 'link': job_detail.get('absolute_url'),
                            'description': html.unescape(job_detail.get('content')), 'date_posted': job_detail.get('updated_at'),
                            'remote': None, 'greenhouse_id': job.get('id'), 'greenhouse_api_url': url}

                if job_detail.get('offices'):
                    job_info['location'] = str(job_detail.get('offices'))
                    offices = {office.get('name').lower()
                               for office in job_detail.get('offices')}
                    if 'remote' in offices or 'anywhere' in offices:
                        job_info['remote'] = True
                    else:
                        job_info['remote'] = False

                data.append(job_info)
        df = pd.DataFrame()
        df = df.from_records(data)

        return df
    companies_clean = get_companies(companies_file)

    results = get_jobs(companies_clean, criteria)
    df = get_details(results)

    return df