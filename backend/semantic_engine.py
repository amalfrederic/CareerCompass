from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv

# 🔥 Load env
load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

# 🔥 Load embedding model
model = SentenceTransformer(
    "sentence-transformers/all-MiniLM-L6-v2",
    token=HF_TOKEN
)

# 🔥 Import LLM extractor
from groq_service import extract_resume_skills_llm


def extract_semantic_skills(resume_text):

    # 🔥 Step 1: LLM-based skill extraction
    try:
        llm_skills = extract_resume_skills_llm(resume_text)
    except Exception:
        return []

    if not llm_skills:
        return []

    # 🔥 Step 2: Normalize + clean
    cleaned_skills = []

    for skill in llm_skills:
        skill = skill.strip().lower()

        # remove junk
        if len(skill) < 2:
            continue

        cleaned_skills.append(skill)

    # 🔥 Remove duplicates
    return list(set(cleaned_skills))