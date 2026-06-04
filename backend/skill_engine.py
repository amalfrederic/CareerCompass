import spacy
from spacy.matcher import PhraseMatcher

# Load English model
nlp = spacy.load("en_core_web_sm")

# Define skill list (expand later)
SKILL_LIST = [
    "Python",
    "Django",
    "Flask",
    "React",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "MongoDB",
    "SQL",
    "Machine Learning",
    "Deep Learning",
    "REST API",
    "Git"
]

# Create matcher
matcher = PhraseMatcher(nlp.vocab, attr="LOWER")

patterns = [nlp.make_doc(skill) for skill in SKILL_LIST]
matcher.add("SKILLS", patterns)


def extract_resume_skills(resume_text):
    doc = nlp(resume_text)
    matches = matcher(doc)

    found_skills = set()

    for match_id, start, end in matches:
        skill = doc[start:end].text
        found_skills.add(skill)

    return list(found_skills)

def normalize_skills(skill_list):
    return set(skill.strip().lower() for skill in skill_list)


def compare_skills(resume_skills, job_skills):
    resume_set = normalize_skills(resume_skills)
    job_set = normalize_skills(job_skills)

    matched = resume_set.intersection(job_set)
    missing = job_set - resume_set

    if len(job_set) == 0:
        match_percentage = 0
    else:
        match_percentage = (len(matched) / len(job_set)) * 100

    return {
        "matched_skills": list(matched),
        "missing_skills": list(missing),
        "match_percentage": round(match_percentage, 2)
    }