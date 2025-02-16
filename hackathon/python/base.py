import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables
load_dotenv()

# Get the MongoDB URI from the environment variables
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise Exception("MONGO_URI not set in environment variables")

# Create a MongoDB client
client = MongoClient(MONGO_URI)

# Use the default database specified in the URI (or fallback to "users_db" if not provided)
db = client.get_default_database() or client["users_db"]

# Use the "users" collection for storing user documents
users_collection = db["users"]
