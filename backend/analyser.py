from semantic_engine import extract_semantic_skills, model
from groq_service import extract_job_skills, classify_job_skills
from scoring_engine import final_score


# 🔹 Normalize skills
def normalize(skills):
    return list(set(skill.strip().lower() for skill in skills))


# 🔹 Convert classified → dict
def flatten_classified(classified):
    job_dict = {}

    for s in classified.get("core", []):
        job_dict[s.lower()] = "core"

    for s in classified.get("important", []):
        job_dict[s.lower()] = "important"

    for s in classified.get("optional", []):
        job_dict[s.lower()] = "optional"

    return job_dict


def analyze_resume_against_job(resume_text, job_description):

    # 1️⃣ Extract resume skills
    resume_skills = extract_semantic_skills(resume_text)
    resume_list = normalize(resume_skills)

    # 2️⃣ Extract job skills
    job_raw = extract_job_skills(job_description)

    if isinstance(job_raw, dict) and "error" in job_raw:
        return {"error": "Job extraction failed", "details": job_raw}

    if not isinstance(job_raw, list):
        return {"error": "Invalid job skill format", "details": job_raw}

    job_skills = normalize(job_raw)

    # 3️⃣ Classify job skills
    classified = classify_job_skills(job_skills, job_description)

    if isinstance(classified, dict) and "error" in classified:
        return {"error": "Skill classification failed", "details": classified}

    # 🔥 Fix: Avoid too many core skills
    if len(classified.get("core", [])) > 3:
        extra = classified["core"][3:]
        classified["core"] = classified["core"][:3]
        classified["important"].extend(extra)

    # 4️⃣ Convert for scoring
    job_dict = flatten_classified(classified)

    # 5️⃣ Scoring (NEW ENGINE)
    score_data = final_score(
        resume_text=resume_text,
        resume_skills=resume_list,
        job_skills=job_dict,
        model=model
    )

    # 6️⃣ Return clean output (optimized for career analyzer)
    return {
        "match_percentage": score_data["score"],
        "match_label": score_data["label"],
        "matched_skills": score_data["matched_skills"],
        "missing_skills": score_data["missing_skills"],
        "classified_skills": classified
    }