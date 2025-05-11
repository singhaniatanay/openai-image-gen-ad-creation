import os
import openai
from business.prompt_templates import PROMPT_TEMPLATE
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

async def extract_brand_kit_with_llm(crawled_data: dict) -> dict:
    prompt = PROMPT_TEMPLATE.format(crawled_data=crawled_data)
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": "You are a helpful assistant that extracts brand kit details from website data."},
                  {"role": "user", "content": prompt}],
        max_tokens=500,
        temperature=0.2
    )
    import json as pyjson
    try:
        content = response["choices"][0]["message"]["content"]
        start = content.find('{')
        end = content.rfind('}') + 1
        if start != -1 and end != -1:
            return pyjson.loads(content[start:end])
        else:
            return {}
    except Exception as e:
        print(f"LLM extraction error: {e}")
        return {}