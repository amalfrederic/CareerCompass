# career_analyzer.py

from analyser import analyze_resume_against_job
from groq_service import generate_roles_from_domain
from carrer_features import (
    get_learning_priority,
    generate_learning_path,
    suggest_roles,
    estimate_salary,
    compute_skill_gap
)


def analyze_career(resume_text, target_role):

    # 1️⃣ Generate specific roles from general domain
    roles = generate_roles_from_domain(target_role)

    if not roles or not isinstance(roles, list):
        return {"error": "Role generation failed", "roles": roles}

    results = []

    # 2️⃣ Analyze resume for each role
    for role in roles:

        result = analyze_resume_against_job(resume_text, role)

        if isinstance(result, dict) and "error" in result:
            continue

        results.append({
            "role": role,
            "score": result.get("match_percentage", 0),
            "matched_skills": result.get("matched_skills", []),
            "missing_skills": result.get("missing_skills", []),
            "classified_skills": result.get("classified_skills", {})
        })

    # 3️⃣ Sort roles by score
    results = sorted(results, key=lambda x: x["score"], reverse=True)

    if not results:
        return {"error": "No valid role analysis"}

    # 4️⃣ Best role
    best_role = results[0]

    # 🔥 5️⃣ FEATURE ENGINE

    # Skill priority
    learning_priority = get_learning_priority(
        best_role["missing_skills"],
        best_role.get("classified_skills", {})
    )

    # LLM roadmap
    learning_path = generate_learning_path(
        learning_priority,
        best_role["role"]
    )

    # LLM role suggestions
    better_roles = suggest_roles(
        best_role["matched_skills"],
        target_role
    )

    # LLM salary
    salary = estimate_salary(best_role["role"])

    # Skill gap
    skill_gap = compute_skill_gap(
        best_role.get("classified_skills", {}),
        best_role["missing_skills"]
    )

    # Insights
    insights = generate_career_insights(best_role["score"])

    # 6️⃣ FINAL RESPONSE
    return {
        "target_role": target_role,
        "best_fit_role": best_role,
        "all_roles": results,

        # 🔥 NEW FEATURES
        "learning_priority": learning_priority,
        "learning_path": learning_path,
        "better_fit_roles": better_roles,
        "estimated_salary": salary,
        "skill_gap": skill_gap,

        "career_insights": insights
    }


# 🔥 USER-FOCUSED INSIGHTS
def generate_career_insights(score):

    if score >= 75:
        return "You are job-ready for this role. Start applying confidently."

    elif score >= 55:
        return "You are close to this role. Improve a few key skills to become job-ready."

    elif score >= 35:
        return "You have a foundation, but need to build stronger domain skills."

    else:
        return "You need to develop core skills before targeting this role."