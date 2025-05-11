from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router

app = FastAPI(
    title="Brand Kit Detail Scraper API",
    description="API to scrape company details from a website URL.",
    version="0.1.0",
)

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

# To run this app:
# 1. Make sure you are in the 'backend-service' directory.
# 2. Create and activate a virtual environment: 
#    python -m venv venv
#    source venv/bin/activate  (on macOS/Linux)
#    .\venv\Scripts\activate (on Windows)
# 3. Install dependencies: pip install -r requirements.txt
# 4. Run uvicorn: uvicorn main:app --reload