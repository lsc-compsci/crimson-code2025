from dotenv import load_dotenv
from pymongo import MongoClient
import os
import openai

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

MONGO_URI = os.getenv("MONGODB_URI")

client = MongoClient(MONGO_URI)
db = client.quizapp

users_collection = db.users