
# imports
from bs4 import BeautifulSoup
import pandas as pd
from time import sleep
import requests
import undetected_chromedriver as uc
from urllib.parse import urljoin, urlencode
import re
import json

def scrape_dice(query="junior software developer", pages=1, wait=5):
    base = 'https://www.dice.com/jobs/'
    params = {}
    params['q'] = query

    titles = []
    companies = []
    links = []
    remote = []

    cities = []
    states = []
    countries = []
    zips = []

    dates = []
    descriptions = []

    def scrap_template1(cup):

        description = cup.find('div', id='jobdescSec')
        scripts = cup.find_all('script', type="text/javascript")
        job_info = scripts[4]
        json_txt = re.search(r'"jobId(.|\n)*}', job_info.text)
        json_txt_clean = re.sub(r'//.*', '', json_txt.group())
        json_txt_clean = "{"+json_txt_clean
        job_json = json.loads(json_txt_clean)
        job_json['description'] = description.text

        try:
            company = cup.find('span', id='hiringOrganizationName')
            companies.append(company.text)
        except:
            companies.append(None)

        try:
            description = cup.find('div', id='jobdescSec')
            descriptions.append(description.text)
        except:
            descriptions.append(None)

        try:
            scripts = cup.find_all('script', type="text/javascript")
            job_info = scripts[4]
            json_txt = re.search(r'"jobId(.|\n)*}', job_info.text)
            json_txt_clean = re.sub(r'//.*', '', json_txt.group())
            json_txt_clean = "{"+json_txt_clean
            job_json = json.loads(json_txt_clean)
            cities.append(job_json['jobCity'])
            states.append(job_json['jobRegion'])
            countries.append(job_json['jobCountry'])
            zips.append(job_json['jobPostalCode'])
            dates.append(job_json['datePosted'])
            remote.append(job_json['remote'])
        except:
            dates.append(None)
            cities.append(None)
            states.append(None)
            zips.append(None)
            countries.append(None)
            remote.append(None)

    def scrap_template2(cup):
        try:
            description = cup.find('div', id='jobDescription')
            descriptions.append(description.text)
        except:
            descriptions.append(None)

        try:
            company = cup.find('a', attrs={'data-cy': 'companyNameLink'})
            companies.append(company.text)
        except:
            companies.append(None)

        try:
            json_text = cup.find('script', id="__NEXT_DATA__")
            jobdic = json.loads(json_text.text)
            jobdata = jobdic['props']['pageProps']['initialState']['api']['queries']
            firstkey = list(jobdata.keys())[0]
            locationdetail = jobdata[firstkey]['data']['locationDetail']
            locationdata = locationdetail['locations'][0]
            dateposted = jobdata[firstkey]['data']['datePosted']
            dates.append(dateposted)
            remote_status = locationdetail['remote']
            remote.append(remote_status)
            cities.append(locationdata['city'])
            countries.append(locationdata['city'])
            states.append(locationdata['state'])
            zips.append(locationdata['postalCode'])

        except:
            dates.append(None)
            cities.append(None)
            states.append(None)
            zips.append(None)
            remote.append(None)
            countries.append(None)

    def scrap_job(joblink):
        res = requests.get(joblink)
        cup = BeautifulSoup(res.text, 'html.parser')

        if cup.find('div', id='jobdescSec'):
            scrap_template1(cup)
        else:
            scrap_template2(cup)
    # web driver setup
    driver = uc.Chrome()

    for page in range(1, pages+1):
        url = base + urlencode(params).replace('=', '-')+f'-jobs?p={page}'
        driver.get(url)
        sleep(wait)
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        # parent container for job cards
        jobs_list = soup.find('div', attrs={'id': 'search-results-control'})
        jobs = jobs_list.find_all('h3')
        job_titles = [title.find('span').text for title in jobs]
        job_links = [urljoin(base, job.find('a')['href']) for job in jobs]
        jobs_list.find_all('span', class_='compName')
        titles += job_titles
        links += job_links

    driver.close()

    for link in links:
        scrap_job(link)

    df = pd.DataFrame()
    df['title'] = titles
    df['company'] = companies
    df['link'] = links
    df['description'] = descriptions
    df['date_posted'] = dates
    df['country'] = countries
    df['state'] = states
    df['city'] = cities
    df['zip'] = zips
    df['remote'] = remote

    return df
