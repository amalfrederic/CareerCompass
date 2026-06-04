from groq_service import (
    generate_learning_path_llm,
    suggest_roles_llm,
    estimate_salary_llm
)


# 🔥 PRIORITY (RULE BASED)
def get_learning_priority(missing_skills, classified_skills):
    core = set(s.lower() for s in classified_skills.get("core", []))
    important = set(s.lower() for s in classified_skills.get("important", []))

    priority = []

    for skill in missing_skills:
        if skill.lower() in core:
            weight = 3
        elif skill.lower() in important:
            weight = 2
        else:
            weight = 1

        priority.append((skill, weight))

    priority.sort(key=lambda x: x[1], reverse=True)

    return [s for s, _ in priority]


# 🔥 ROADMAP (CALL LLM SERVICE)
def generate_learning_path(priority_skills, role):
    try:
        return generate_learning_path_llm(priority_skills, role)
    except:
        return []


# 🔥 ROLE SWITCH (CALL LLM SERVICE)
def suggest_roles(resume_skills, target_role):
    try:
        return suggest_roles_llm(resume_skills, target_role)
    except:
        return []


# 🔥 SALARY (CALL LLM SERVICE)
def estimate_salary(role):
    try:
        return estimate_salary_llm(role)
    except:
        return "₹3L – ₹10L"


# 🔥 SKILL GAP (KEEP RULE-BASED)
def compute_skill_gap(classified_skills, missing_skills):
    core = set(s.lower() for s in classified_skills.get("core", []))
    important = set(s.lower() for s in classified_skills.get("important", []))
    optional = set(s.lower() for s in classified_skills.get("optional", []))

    return {
        "core_gap": sum(1 for s in missing_skills if s.lower() in core) * 10,
        "important_gap": sum(1 for s in missing_skills if s.lower() in important) * 8,
        "optional_gap": sum(1 for s in missing_skills if s.lower() in optional) * 5,
    }