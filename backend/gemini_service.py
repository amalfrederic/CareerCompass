from google import genai
import os
import json
import re
from dotenv import load_dotenv

# Load env
load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


# 🔧 Clean Gemini output
def clean_json_response(text):
    return re.sub(r"```json|```", "", text).strip()


# 🔥 Model fallback (IMPORTANT)
def generate_with_fallback(prompt):
    try:
        return client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=prompt,
        )
    except Exception:
        return client.models.generate_content(
            model="gemini-2.0-flash-lite",
            contents=prompt,
        )


# 🔥 1️⃣ Extract Job Skills
def extract_job_skills(job_description: str):
    prompt = f"""
You are an expert technical recruiter.

Task:
Extract ONLY the most relevant technical skills required for this job.

Rules:
- Include programming languages, frameworks, tools, and concepts
- Exclude soft skills
- Keep skills concise (1–3 words)
- Avoid duplicates
- Return ONLY raw JSON array (no markdown)

Example:
["Python", "Machine Learning", "Docker"]

Job Description:
{job_description}
"""

    try:
        response = generate_with_fallback(prompt)

        raw_text = response.text.strip()
        cleaned = clean_json_response(raw_text)

        skills = json.loads(cleaned)

        if isinstance(skills, list):
            return skills
        return {"error": "Invalid list format", "raw": raw_text}

    except Exception as e:
        return {"error": str(e)}


# 🔥 2️⃣ Classify Job Skills
def classify_job_skills(extracted_jobs, role):
    prompt = f"""
You are an expert hiring manager.

Task:
Classify the following technical skills based on importance.

Definitions:
- Core: absolutely mandatory
- Important: strong advantage
- Optional: supporting or nice-to-have

Strict Rules:
- Every skill must appear in EXACTLY one category
- Do NOT repeat skills
- Do NOT add new skills
- Return ONLY raw JSON (no markdown)

Output format:
{{
  "core": [],
  "important": [],
  "optional": []
}}

Skills:
{extracted_jobs}

Job Role:
{role}
"""

    try:
        response = generate_with_fallback(prompt)

        raw_text = response.text.strip()
        cleaned = clean_json_response(raw_text)

        data = json.loads(cleaned)

        if not all(k in data for k in ["core", "important", "optional"]):
            return {"error": "Invalid structure", "raw": raw_text}

        return data

    except Exception as e:
        return {"error": str(e)}


# 🔥 3️⃣ Evaluate Resume Supporting Skills
def evaluate_resume_skills(resume_skills, job_role):
    prompt = f"""
You are an expert recruiter.

Task:
From the given resume skills, identify which are RELEVANT for the job role.

Rules:
- Select only useful/related skills
- Ignore unrelated skills
- Return ONLY raw JSON array (no markdown)

Example:
["Docker", "AWS"]

Resume Skills:
{resume_skills}

Job Role:
{job_role}
"""

    try:
        response = generate_with_fallback(prompt)

        raw_text = response.text.strip()
        cleaned = clean_json_response(raw_text)

        data = json.loads(cleaned)

        if isinstance(data, list):
            return data
        return {"error": "Invalid format", "raw": raw_text}

    except Exception as e:
        return {"error": str(e)}