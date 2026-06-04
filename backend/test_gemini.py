
from gemini_service import extract_job_skills

job = """
We are looking for a backend developer with experience in
Python, Django, REST APIs, PostgreSQL, AWS and Docker.
"""

result = extract_job_skills(job)

print("Gemini Output:")
print(result)