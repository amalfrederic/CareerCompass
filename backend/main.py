from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
from database import engine, get_db
from security import hash_password, verify_password
from auth import create_access_token, verify_token
from analyser import analyze_resume_against_job
from pydantic import BaseModel
from career_analyzer import analyze_career

from fastapi.middleware.cors import CORSMiddleware

# ✅ ONLY ONE APP
app = FastAPI()

# ✅ CORS applied correctly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# REQUEST MODELS
# -----------------------------
class AnalyzeRequest(BaseModel):
    resume_text: str
    job_description: str

class CareerRequest(BaseModel):
    resume_text: str
    target_role: str

# -----------------------------
# DB INIT
# -----------------------------
models.Base.metadata.create_all(bind=engine)

# -----------------------------
# ROUTES
# -----------------------------
@app.get("/")
def home():
    return {"message": "Database Connected Successfully"}

@app.post("/register")
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pwd = hash_password(user.password)

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_pwd
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}

@app.post("/login")
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = create_access_token(data={"sub": db_user.email})

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@app.get("/me")
def get_current_user(email: str = Depends(verify_token)):
    return {"message": f"Hello {email}, you are authenticated"}

@app.post("/analyze-resume")
def analyze(data: AnalyzeRequest):
    return analyze_resume_against_job(data.resume_text, data.job_description)

@app.post("/career-analyzer")
def career_analyzer(data: CareerRequest):
    return analyze_career(data.resume_text, data.target_role)