from pydantic import BaseModel
from typing import List, Optional

class ScrapeRequest(BaseModel):
    url: str

class ScrapedDataResponse(BaseModel):
    name: Optional[str] = None
    domain: Optional[str] = None
    logo_url: Optional[str] = None
    primary_color: Optional[str] = None
    secondary_color: Optional[str] = None
    accent_color: Optional[str] = None
    fonts: Optional[List[str]] = None
    industry: Optional[str] = None
    # Add any other fields as needed