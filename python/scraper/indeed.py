
# imports
from bs4 import BeautifulSoup
import pandas as pd
from time import sleep
from datetime import date
import undetected_chromedriver as uc
from urllib.parse import urlencode, urljoin
import json


def scrape_indeed(query="junior software developer", pages=1, wait=5):
    home = 'https://www.indeed.com'
    base = "https://www.indeed.com/jobs?"
    params = {}
    params['q'] = query
    params['sort'] = 'date'

    titles = []
    companies = []
    links = []

    cities = []
    states = []
    countries = []
    zips = []

    dates = []
    mins = []
    maxes = []
    types = []
    descriptions = []

    # web driver setup
    driver = uc.Chrome()

    for page in range(0, pages):
        params['start'] = str(page*10)
        url = base + urlencode(params)
        driver.get(url)
        sleep(wait)

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')

        jobs_list = soup.find('div', attrs={'id': 'mosaic-provider-jobcards'})

        # extracting data from each job card
        titles += [title.text for title in jobs_list.find_all(
            'h2', class_='jobTitle')]

        companies += [company.text for company in jobs_list.find_all(
            'span', class_='companyName')]

        page_links = [urljoin(home, link['href'])
                      for link in jobs_list.find_all('a', class_='jcs-JobTitle')]
        links += page_links

        for link in page_links:

            driver.get(link)
            sleep(wait)

            html = driver.page_source
            cup = BeautifulSoup(html, 'html.parser')

            try:
                description = cup.find('div', id='jobDescriptionText')
                descriptions.append(description.text)
            except:
                descriptions.append('')

            try:
                job_script = cup.find(
                    'script', attrs={'type': "application/ld+json"})
                job_json = json.loads(str(job_script.contents[0]))
                dates.append(job_json['datePosted'])
            except:
                dates.append('')

            try:
                address = job_json['jobLocation']['address']
                cities.append(address.get('addressLocality'))
                states.append(address.get('addressRegion1'))
                zips.append(address.get('postalCode'))
                countries.append(address.get('addressCountry'))

            except:
                cities.append(None)
                states.append(None)
                zips.append(None)
                countries.append(None)

            try:
                mins.append(int(job_json['baseSalary']['value']['minValue']))
                maxes.append(int(job_json['baseSalary']['value']['maxValue']))
                types.append(job_json['baseSalary']['value']['unitText'])
            except:
                mins.append(None)
                maxes.append(None)
                types.append(None)

    df = pd.DataFrame()
    df['job_title'] = titles
    df['company'] = companies
    df['link'] = links
    df['description'] = descriptions
    df['date_posted'] = dates
    df['min_salary'] = mins
    df['max_salary'] = maxes
    df['salary_type'] = types
    df['city'] = cities
    df['country'] = countries 


    return df
