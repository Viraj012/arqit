from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import logging
import os
from dotenv import load_dotenv

from gemini_service import generate_project_files, edit_file_with_chat

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="PlanAI API")

# Get configuration from environment variables
PORT = int(os.getenv("PORT", 8000))
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Configure CORS
origins = [
    FRONTEND_URL,  # Frontend URL from environment variables
    "http://localhost:3000",  # Default Next.js development server
    "http://localhost:3001",  # Alternative Next.js port
    "*",  # Allow all origins for development (remove in production)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProjectRequest(BaseModel):
    description: str

class ProjectFile(BaseModel):
    name: str
    content: str

class ProjectResponse(BaseModel):
    files: List[ProjectFile]
    
class ChatEditRequest(BaseModel):
    file_name: str
    file_content: str
    chat_message: str
    
class ChatEditResponse(BaseModel):
    updated_content: str

@app.get("/")
async def read_root():
    return {"status": "ok", "message": "PlanAI API is running"}

@app.post("/generate", response_model=ProjectResponse)
async def generate(request: ProjectRequest):
    try:
        logger.info(f"Received project description: {request.description[:50]}...")
        
        # Call the Gemini service to generate the files
        file_dicts = await generate_project_files(request.description)
        
        # Convert dictionaries to ProjectFile objects
        files = [ProjectFile(**file_dict) for file_dict in file_dicts]
        
        return ProjectResponse(files=files)
    except Exception as e:
        logger.error(f"Error generating project files: {str(e)}")
        # Include the error details in the response
        raise HTTPException(
            status_code=500, 
            detail=f"Error generating project files: {str(e)}. Check if the Google API key is valid and properly set in the .env file."
        )

@app.post("/chat-edit", response_model=ChatEditResponse)
async def chat_edit(request: ChatEditRequest):
    try:
        logger.info(f"Received chat edit request for file: {request.file_name}")
        
        # Call the Gemini service to edit the file based on the chat message
        updated_content = await edit_file_with_chat(
            file_name=request.file_name,
            file_content=request.file_content,
            chat_message=request.chat_message
        )
        
        return ChatEditResponse(updated_content=updated_content)
    except Exception as e:
        logger.error(f"Error editing file with chat: {str(e)}")
        # Include the error details in the response
        raise HTTPException(
            status_code=500, 
            detail=f"Error editing file with chat: {str(e)}. Check if the Google API key is valid and properly set in the .env file."
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)
