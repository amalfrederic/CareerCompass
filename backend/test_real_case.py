# test.py

import json
from career_analyzer import analyze_career


def run_test(test_name, resume_text, target_role):
    print(f"\n===== {test_name} =====\n")

    result = analyze_career(resume_text, target_role)

    print(json.dumps(result, indent=4))


# 🔥 TEST CASE 1 — AI ENGINEER (INTERMEDIATE)
resume_ai = """
AI Engineer with 2+ years of experience in machine learning and deep learning.
Built models using PyTorch and TensorFlow for computer vision and NLP tasks.
Strong knowledge of Python, NumPy, Pandas, and Scikit-learn.
Experience deploying models using Docker and Kubernetes on AWS.
Worked on transformer-based models and REST APIs using FastAPI.
"""

# 🔥 TEST CASE 2 — AUTOMOBILE ENGINEER
resume_auto = """
Mechanical Engineer with experience in automotive design and analysis.
Skilled in CAD modeling using SolidWorks and AutoCAD.
Experience in FEA and CFD simulations using ANSYS.
Strong knowledge of thermodynamics, fluid mechanics, and vehicle dynamics.
Worked on MATLAB simulations for automotive systems.
"""

# 🔥 TEST CASE 3 — BEGINNER (EDGE CASE)
resume_beginner = """
Computer Science student with basic knowledge of Python and data analysis.
Completed small projects using Pandas and NumPy.
Familiar with basic machine learning concepts.
"""

# 🔥 TEST CASE 4 — STRONG PROFILE
resume_strong = """
Senior AI Engineer with 5+ years of experience.
Expert in PyTorch, TensorFlow, and HuggingFace transformers.
Built large-scale NLP systems and computer vision models.
Experience with MLOps, Docker, Kubernetes, AWS, and CI/CD pipelines.
Strong in distributed computing and system design.
"""


if __name__ == "__main__":

    # 🔥 Run all tests
    run_test("AI ENGINEER TEST", resume_ai, "AI Engineer")
    run_test("AUTOMOBILE ENGINEER TEST", resume_auto, "Automobile Engineer")
    run_test("BEGINNER TEST", resume_beginner, "AI Engineer")
    run_test("STRONG PROFILE TEST", resume_strong, "AI Engineer")