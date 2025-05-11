PROMPT_TEMPLATE = """
Given the following crawled website data, extract the following brand kit details if available:
- Brand/Company Name
- Domain
- Logo URL
- Primary Color (hex)
- Secondary Color (hex)
- Accent Color (hex)
- Fonts (list)
- Industry

Crawled Data:
{crawled_data}

Return a JSON object with keys: name, domain, logo_url, primary_color, secondary_color, accent_color, fonts, industry. If a field is missing, set it to null.
"""