# %%
import requests
from bs4 import BeautifulSoup
import undetected_chromedriver as uc
from time import sleep
from urllib.parse import urljoin
import datetime
import json
import re


driver = uc.Chrome()

def scrape_yc():
    def get_companies():
        
        driver.get('https://www.ycombinator.com/companies?isHiring=true')
        sleep(10)
        page_len = driver.execute_script("window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;")

        while(True):
                last_len = page_len
                sleep(1)
                page_len= driver.execute_script("window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;")
                if last_len==page_len:
                    break

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        results_div = soup.find('div', ['UzdOssTgtlpjmaMUbghW'])
        companies_a = results_div.find_all('a', class_='WxyYeI15LZ5U_DOM0z8F')
        companies_a[0]['href'].split('/')[-1]

        companies = [company['href'].split('/')[-1] for company in companies_a ]
        
        return companies


    def get_location(locations) -> list:
        points = []
        for location in locations:
            if re.search('remote|anywhere|everywhere', location.strip().lower()):
                continue
            try:
                res = requests.get(
                    f'https://geocode.maps.co/search?q={location}')
                sleep(0.6)
            except:
                continue
            try:
                data = res.json()[0]
            except:
                continue
            coordinates = [float(data.get('lon')), float(data.get('lat'))]
            points.append(coordinates)
        if points:
            return {'type': 'MultiPoint', 'coordinates': points}
        return None


    def get_job_details(companies):
        base = 'https://www.ycombinator.com/'
        html_re = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')

        roles = {'developer', 'engineer', 'developers', 'engineers',  'data', 'analyst', 'scientist', 'frontend', 'software',
            'apprentice', 'apprenticeship', 'front-end', 'backend', 'back-end', 'intern', 'internship', 'fellowship'}

    # Includes 'software' for titles that are just 'software engineer', etc.
        # levels = {'junior', 'entry-level', 'grad', 'graduate', 'apprentice', 'web',
        #         'apprenticeship','fellowship', 'software', 'entry', 'intern', 'i', '1', 'associate', 'jr.', 'jr', 'cloud'}

        # Optional, but helps exclude higher level positions
        exclude = {'senior', 'principal', 'sr.', 'sr', 'ii', 'iii'}

        #criteria = {'roles': roles, 'levels': levels, 'exclude': exclude}

        exp_levels = {'1+ years', 'any (new grads ok)', 'any'}
        
        jobs_data = []

       


        for company in companies:
            driver.get(urljoin(base, f'companies/{company}/jobs'))
            html = driver.page_source

        
            bowl = BeautifulSoup(html, 'html.parser')
        
            try:
                job_count = bowl.find('span', class_ = 'ycdc-badge ml-0 font-bold no-underline').text
            except:
                continue

            if int(job_count) == 0:
                continue


            jobs = bowl.find(
                'div', class_="flex w-full flex-col justify-between divide-y divide-gray-200")

            
            
            for job in jobs:
                job_title = job.find('div', class_='ycdc-with-link-color').text

                title = set(job_title.lower().split())

                job_exp = job.find_all('div', class_='list-item')[-1].text
                exp_set = {job_exp.lower()}


                if title.intersection(roles) and not title.intersection(exclude) and exp_set.intersection(exp_levels) :
                 
                    job_link = job.find('a')['href']
              
                    driver.get(urljoin(base, job_link))
                    html = driver.page_source 
                    cup = BeautifulSoup(html, 'html.parser')
                    job_json = cup.find('script', attrs={'type': 'application/ld+json'})
                    if not job_json:
                        continue
                    job_dict = json.loads(job_json.text)
                 

                    job_datePosted = job_dict['datePosted']

                    job_link = urljoin(base, job_link)
                    job_company = job_dict['hiringOrganization'].get('name')

                    job_description = cup.find(
                        'h2', class_='ycdc-section-title').next_sibling.text

                    job_locations = []

                    
                    if job_dict.get('jobLocationType') == "TELECOMMUTE":
                        remote = True
                        job_locations.append(
                            f"Remote {job_dict.get('applicantLocationRequirements').get('name')}")
                    else:
                        remote = False
        
                    locations = job_dict.get('jobLocation')
                    if locations:
                        for location in job_dict.get('jobLocation'):

                            address = location.get('address')

                            if type(address) is dict:
                                city = address.get('addressLocality')
                                state = address.get('addressRegion')
                                country = address.get('addressCountry')
                                job_locations.append(f'{city}, {state}, {country}')
                        
                    job_info = {'title': job_title, 'company': job_company, 'link': job_link,
                                'description': re.sub(html_re, '', job_description), 'date': datetime.datetime.fromisoformat(job_datePosted),
                                'source': 'yc', 'location': job_locations, 'points': get_location(job_locations), 'remote': remote, 'experience' : job_exp}
                    jobs_data.append(job_info)

        return jobs_data

    companies = get_companies()

    jobs = get_job_details(companies)
    
    return jobs
