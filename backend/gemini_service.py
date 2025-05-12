"""
Service to interact with the Google Gemini API.
"""

import os
import requests
import json
from dotenv import load_dotenv
from typing import List, Dict
import asyncio
import logging
from pydantic import BaseModel

from prompts import PLAN_PROMPT, TASKS_PROMPT, BLUEPRINT_PROMPT

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Configure Gemini API
API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable not set")

# Use the specified API URL from environment variables or use default
API_URL = os.getenv("GEMINI_API_URL", 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent')

class ProjectFile(BaseModel):
    name: str
    content: str

async def generate_with_gemini(prompt: str) -> str:
    """
    Generate text using the Google Gemini API.
    """
    headers = {
        'Content-Type': 'application/json',
    }
    
    payload = {
        'contents': [
            {
                'role': 'user',
                'parts': [{'text': prompt}]
            }
        ],
        'generationConfig': {
            'temperature': 0.7,
            'topK': 40,
            'topP': 0.95,
            'maxOutputTokens': 8192,
        }
    }
    
    # Add API key as a query parameter
    url = f"{API_URL}?key={API_KEY}"
    
    # Use a session for connection pooling
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Raise an exception if the request failed
        
        data = response.json()
        
        # Extract the generated text from the response
        generated_text = data['candidates'][0]['content']['parts'][0]['text']
        return generated_text
    except Exception as e:
        logger.error(f"Error calling Gemini API: {str(e)}")
        raise


async def generate_plan(description: str) -> str:
    """
    Generate a project plan using the Google Gemini API.
    """
    prompt = PLAN_PROMPT.format(description=description)
    return await generate_with_gemini(prompt)

async def generate_tasks(description: str) -> str:
    """
    Generate project tasks using the Google Gemini API.
    """
    prompt = TASKS_PROMPT.format(description=description)
    return await generate_with_gemini(prompt)

async def generate_blueprint(description: str) -> str:
    """
    Generate a project blueprint using the Google Gemini API.
    """
    prompt = BLUEPRINT_PROMPT.format(description=description)
    return await generate_with_gemini(prompt)

async def generate_project_files(description: str) -> List[Dict[str, str]]:
    """
    Generate all project files (plan, tasks, blueprint) using the Google Gemini API.
    """
    try:
        # Generate all files concurrently
        plan_task = asyncio.create_task(generate_plan(description))
        tasks_task = asyncio.create_task(generate_tasks(description))
        blueprint_task = asyncio.create_task(generate_blueprint(description))
        
        # Wait for all tasks to complete
        plan = await plan_task
        tasks = await tasks_task
        blueprint = await blueprint_task
        
        # Create ProjectFile objects as dictionaries instead of objects
        files = [
            {"name": "plan.md", "content": plan},
            {"name": "tasks.md", "content": tasks},
            {"name": "blueprint.md", "content": blueprint}
        ]
        
        logger.info(f"Successfully generated {len(files)} files")
        return files
    except Exception as e:
        logger.error(f"Error generating project files: {str(e)}")
        raise
