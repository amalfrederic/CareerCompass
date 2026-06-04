from pydantic import BaseModel, Field

class UserCreate(BaseModel):
    name: str
    email: str
    password: str = Field(min_length=6, max_length=72)

class UserLogin(BaseModel):
    email: str
    password: str


class AnalyzeRequest(BaseModel):
    resume_text: str
    job_description: str


class CareerRequest(BaseModel):
    resume_text: str
    target_role: str

