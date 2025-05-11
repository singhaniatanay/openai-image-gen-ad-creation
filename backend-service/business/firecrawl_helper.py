import os
import requests
from firecrawl import FirecrawlApp
from dotenv import load_dotenv

load_dotenv()

FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")

if not FIRECRAWL_API_KEY:
    raise ValueError("FIRECRAWL_API_KEY environment variable is not set. Please set it before running the application.")

app = FirecrawlApp(api_key=FIRECRAWL_API_KEY)

def crawl_website_with_firecrawl(url: str) -> dict:
    crawl_result = app.crawl_url(url, params={
        'limit': 10,
        'maxDepth': 3,
        'scrapeOptions': {
            'formats': [ 'markdown', 'html', 'screenshot@fullPage' ],
        }
        })
    # print(f"Crawl result: {crawl_result}")
    #write crawl result to a file
    with open('./crawl_result.json', 'w') as f:
        f.write(str(crawl_result))
    status = crawl_result['status']
    if status == 'completed':
        return crawl_result['data']
    else:
        results = check_crawl_job_status(crawl_result['id'])
        if results is not None:
            return results
    return {}


# function to loop over status call and check if status is completed, if completed return results else sleep for 5 seconds and check again until 7 retries
def check_crawl_job_status(job_id: str) -> dict:
    for i in range(7):
        status = app.check_crawl_status(job_id)
        print(f"Status: {status}")
        if status['status'] == 'completed':
            return status['data']
        else:
            time.sleep(10)
    return None