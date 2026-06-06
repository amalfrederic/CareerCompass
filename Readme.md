# 🚀 CareerCompass

**CareerCompass** is an AI-powered Career Readiness and Resume Intelligence Platform designed to help students evaluate their resumes, identify skill gaps, and prepare for their dream careers.

Unlike traditional resume screening systems that focus on recruiters, CareerCompass acts as a personalized AI career mentor, providing students with actionable insights, career recommendations, and progress analytics.

---

## 🎯 Features

### 📄 Resume Analysis
- Upload resumes in PDF format
- Extract skills, education, projects, certifications, and achievements
- Intelligent resume parsing using NLP

### 🎯 Career Compatibility Analysis
- Select your target role (Software Engineer, Data Scientist, AI Engineer, etc.)
- Compare your profile against industry expectations
- Generate Career Compatibility Scores

### 📊 Visual Analytics Dashboard
- Skill distribution charts
- Career readiness indicators
- Progress tracking
- Strength and weakness analysis

### 🔍 Skill Gap Detection
- Identify missing skills required for target roles
- Compare current skills against industry benchmarks
- Receive personalized recommendations

### 🧠 AI-Powered Recommendations
- Suggested technologies to learn
- Project recommendations
- Certification suggestions
- Career improvement roadmap

### 🔐 Secure Authentication
- Firebase Authentication
- User profile management
- Secure access control

---

## 🏗️ System Architecture

```text
React Frontend
       │
       ▼
Firebase Authentication
       │
       ▼
FastAPI Backend
       │
       ├───────────────┐
       ▼               ▼
NLP/ML Engine      Firebase
(SpaCy + SBERT)    Firestore
       │
       ▼
Resume Analysis &
Career Intelligence
```

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- FastAPI
- Python

### AI / Machine Learning
- SpaCy
- Scikit-Learn
- Sentence Transformers
- Semantic Similarity Analysis

### Database & Cloud
- Firebase Authentication
- Firestore Database
- Firebase Storage

### Development Tools
- Git
- GitHub

---

## 📂 Project Structure

```text
CareerCompass/
│
├── backend/
│   ├── main.py
│   ├── analyser.py
│   ├── auth.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/amalfrederic/CareerCompass.git
cd CareerCompass
```

---

## ⚙️ Backend Setup

Navigate to backend:

```bash
cd backend
```

### Create Virtual Environment

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

#### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Download SpaCy Model

```bash
python -m spacy download en_core_web_sm
```

### Run Backend Server

```bash
uvicorn main:app --reload
```

Backend will run on:

```text
http://127.0.0.1:8000
```

Swagger API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 🎨 Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
GEMINI_API_KEY=your_api_key
GROQ_API_KEY=your_api_key

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_API_KEY=your_api_key

SECRET_KEY=your_secret_key
```

---

## 📈 Future Enhancements

- Resume ATS Scoring
- AI Career Mentor Chatbot
- Interview Readiness Assessment
- Company-Specific Compatibility Analysis
- Learning Progress Tracker
- Placement Analytics Dashboard
- Personalized Learning Roadmaps
- Resume Improvement Suggestions
- Industry Benchmarking

---

## 🎓 Project Vision

CareerCompass aims to bridge the gap between students and industry expectations by providing intelligent, data-driven career guidance.

By combining Artificial Intelligence, Natural Language Processing, and Visual Analytics, the platform helps students:

- Understand their strengths
- Identify improvement areas
- Discover missing skills
- Track career readiness
- Build a roadmap toward their dream role

CareerCompass transforms resumes into meaningful career insights and empowers students to make informed career decisions with confidence.

---

## 👨‍💻 Author

**Amal Frederic**

Built with ❤️ to help students become career-ready through AI-powered guid