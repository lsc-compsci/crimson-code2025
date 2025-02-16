from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv

# import from python scripts for quiz contents
import color_content
import css_content
import typo_content


# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
users_collection = db["users"]

app = FastAPI()

# Allow frontend to make requests (adjust origins to match your frontend URL)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default dev URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Ensure POST and OPTIONS are allowed
    allow_headers=["*"],
)

# Security settings
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(BaseModel):
    email: str
    password: str

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/register/")
async def register(user: User):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="User already exists")
    hashed_password = hash_password(user.password)
    users_collection.insert_one({"email": user.email, "password": hashed_password})
    return {"message": "User registered successfully"}

@app.post("/login/")
async def login(user: User):
    print("attempting a login")
    print(user)
    #return {"access_token": access_token, "token_type": "bearer"}
    return {}
    #try:
    #    db_user = users_collection.find_one({"email": user.email})
    #    print("stage0")
    #    if not db_user or not verify_password(user.password, db_user["password"]):
    #        print("stage01")
    #        raise HTTPException(status_code=401, detail="Invalid credentials")
    #    print("stage1")
    #    access_token = create_access_token({"sub": user.email}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    #    print("stage2")
    #    return {"access_token": access_token, "token_type": "bearer"}
    #except:
    #    print("stage3")
    #    raise HTTPException(status_code=420, detail="Our code borked.")

@app.get("/color-quiz")
def get_color_quiz():
    return color_content.prompt

@app.get("/css-quiz")
def get_css_quiz():
    return css_content.prompt

@app.get("/typo-quiz")
def get_typo_quiz():
    return typo_content.prompt

#@app.post("/login/")
#async def login(user: User):
#    print("things are happening")
#    print(user)
#
#    #user = User(data[])
#    return {"message": "Login successful"}