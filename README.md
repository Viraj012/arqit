# PlanAI Project

PlanAI is a platform that enables users to input a project description and obtain AI-generated structured project files.

## Project Structure

The project is divided into two main parts:

- **Frontend**: A Next.js application with Tailwind CSS for the user interface
- **Backend**: A FastAPI application that uses Google Gemini AI to generate project files

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Python (v3.8 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd planai
```

2. Install all dependencies (frontend and backend):
```bash
npm run install:all
```

### Running the Application

If you want to run only the frontend:
```bash
npm run frontend
```

If you want to run only the backend:
```bash
npm run backend
```

## Development

- Frontend code is located in the `frontend/` directory
- Backend code is located in the `backend/` directory

## Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_PORT`: Port for the frontend server (default: 3000)
- `NEXT_PUBLIC_BACKEND_URL`: URL for the backend API (default: http://localhost:8000)

### Backend (.env)
- `PORT`: Port for the backend server (default: 8000)
- `GOOGLE_API_KEY`: Google Gemini API key for AI generation
- `GEMINI_API_URL`: URL for the Gemini API
- `FRONTEND_URL`: URL for the frontend (for CORS configuration)
