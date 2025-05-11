from fastapi import APIRouter, HTTPException
from data.models import ScrapeRequest, ScrapedDataResponse
from business.firecrawl_helper import crawl_website_with_firecrawl
from business.llm_helper import extract_brand_kit_with_llm
import requests

router = APIRouter()

@router.post("/scrape-details/", response_model=ScrapedDataResponse)
async def scrape_website_details(request: ScrapeRequest):
    site_url = request.url
    if not site_url:
        raise HTTPException(status_code=400, detail="URL is required")
    try:
        crawled = crawl_website_with_firecrawl(site_url)
        extracted = await extract_brand_kit_with_llm(crawled)
        return ScrapedDataResponse(
            name=extracted.get("name"),
            domain=extracted.get("domain"),
            logo_url=extracted.get("logo_url"),
            primary_color=extracted.get("primary_color"),
            secondary_color=extracted.get("secondary_color"),
            accent_color=extracted.get("accent_color"),
            fonts=extracted.get("fonts"),
            industry=extracted.get("industry")
        )
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Could not fetch website: {str(e)}")
    except Exception as e:
        print(f"Unexpected error during scraping: {e}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@router.get("/")
async def root():
    return {"message": "Brand Kit Detail Scraper API is running!"}