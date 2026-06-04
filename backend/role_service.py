from groq_service import generate_response, clean_json_response
import json


def expand_role(role):
    prompt = f"""
You are an expert in tech careers.

Expand the given role into 4–6 specialized roles.

Return ONLY JSON array.

Example:
["Machine Learning Engineer", "NLP Engineer", "Computer Vision Engineer", "MLOps Engineer"]

Role:
{role}
"""

    raw = generate_response(prompt, task="classification")

    try:
        cleaned = clean_json_response(raw)
        data = json.loads(cleaned)
        return data if isinstance(data, list) else []
    except:
        return []
    
def generate_job_description(role):
    prompt = f"""
Generate a realistic job description for:

{role}

Include:
- Required skills
- Tools
- Technologies

Keep it concise.
Return plain text.
"""

    return generate_response(prompt, task="extraction")