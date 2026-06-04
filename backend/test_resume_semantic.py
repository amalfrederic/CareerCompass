from semantic_engine import extract_semantic_skills

resume = """
Experienced backend developer.
Built scalable web services and database schema.
Worked with cloud infrastructure and containerization.
"""

skills = extract_semantic_skills(resume)

print("Detected Skills:", skills)