
from analyser import analyze_resume_against_job

resume = """
Experienced backend developer.
Built scalable web services using Django and REST APIs.
Worked with AWS cloud infrastructure and Docker containers.
"""

job = """
We are hiring a backend developer with experience in
Python, Django, REST APIs, PostgreSQL, AWS and Docker.
"""

result = analyze_resume_against_job(resume, job)

print("\n===== ANALYSIS RESULT =====\n")
print("Resume Skills:", result.get("resume_skills"))
print("Job Skills:", result.get("job_skills"))
print("Matched Skills:", result.get("matched_skills"))
print("Missing Skills:", result.get("missing_skills"))
print("Match %:", result.get("match_percentage"))