from role_service import expand_role, generate_job_description

roles = expand_role("AI Engineer")

for r in roles:
    print("\nROLE:", r)
    print(generate_job_description(r))