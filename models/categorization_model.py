import openai
import os
from dotenv import load_dotenv

CATEGORIES = [
    "Grief & Loss", "Chronic Illness & Disability", "Work Stress & Burnout",
    "Academic Pressure", "Discrimination & Exclusion", "Loneliness & Social Anxiety",
    "Trauma & PTSD", "Bullying & Harassment", "Self-Esteem & Body Image", "Addiction & Recovery"
]

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def categorize_story(story):
    prompt = f"""
    Categorize the following story into one of the themes: {", ".join(CATEGORIES)}.

    Story: "{story}"

    Category:
    """
    
    client = openai.OpenAI()

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "system", "content": "You are a helpful assistant that classifies stories into predefined categories."},
                  {"role": "user", "content": prompt}],
        temperature=0 
    )
    
    category = response.choices[0].message.content.strip()

    if category in CATEGORIES:
        return category
    else:
        return "Uncategorized"

if __name__ == "__main__":
    sample_story = "I lost my best friend recently, and it's been hard to cope with the grief."
    category = categorize_story(sample_story)
    print(f"Story Category: {category}")