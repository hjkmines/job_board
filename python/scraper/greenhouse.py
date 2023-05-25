

import requests
import json
import html
import csv
import re
from time import sleep
import datetime
from datetime import timezone


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
                companies_bad[token] = companies.get(token)
                companies_clean.pop(token)

        if companies_bad:
            with open(f"./logs/companies_bad_greenhouse_{date.today()}.json", "w") as out:
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
    def get_location(locations) -> list:
        points = []
        for location in locations:
            if re.search('remote|anywhere|everywhere', location.strip().lower()):
                continue
            res = requests.get(f'https://geocode.maps.co/search?q={location}')
            try:
                data = res.json()[0]
            except:
                continue
            coordinates = [float(data.get('lon')), float(data.get('lat'))]
            points.append(coordinates)
            sleep(0.5)
        if points:
            return {'type': 'MultiPoint', 'coordinates': points}
        return None

    def get_details(results: list) -> pd.DataFrame:
        data = []

        html_re = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')

        for job in results:
            url = f'https://boards-api.greenhouse.io/v1/boards/{job.get("token")}/jobs/{job.get("id")}'
            res = requests.get(url)

            if res:
                job_detail = json.loads(res.text)
                job_info = {'title': job_detail.get('title'), 'company': job.get('company'), 'link': job_detail.get('absolute_url'),
                            'description': re.sub(html_re, '', html.unescape(job_detail.get('content'))), 'date': datetime.datetime.fromisoformat(job_detail.get('updated_at')),
                            'remote': None, 'greenhouse_id': job.get('id'), 'greenhouse_api_url': url, 'raw_date': job_detail.get('updated_at'), 'source': 'greenhouse'}

                if job_detail.get('offices'):
                    offices = job_detail.get('offices')
                    locations = []
                    for office in offices:
                        if office.get('location'):
                            locations.append(office.get('location'))
                        else:
                            if office.get('name'):
                                locations.append(office.get('name'))
                    job_info['location'] = locations

                elif job_detail.get('location'):
                    location = job_detail['location']['name']
                    job_info['location'] = location

                locations = job_info.get('location')
                if locations:
                    points = get_location(locations)

                    if re.search('remote|anywhere|everywhere', ' '.join(locations).lower()):
                        job_info['remote'] = True
                    else:
                        job_info['remote'] = False

                    if points:
                        job_info['points'] = points

            data.append(job_info)

        return data
    companies_clean = get_companies(companies_file)

    results = get_jobs(companies_clean, criteria)
    data = get_details(results)

    return data
