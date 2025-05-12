'use client';

import { useState } from 'react';
import ProjectForm from './components/ProjectForm';
import OutputDisplay from './components/OutputDisplay';

interface OutputFile {
  name: string;
  content: string;
}

// Get backend URL from environment variables or use default
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState<OutputFile[]>([]);

  const handleSubmit = async (projectDescription: string) => {
    setIsLoading(true);
    
    try {
      // Make API call to the FastAPI backend using environment variable
      const response = await fetch(`${BACKEND_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: projectDescription }),
        mode: 'cors', // Add CORS mode to ensure proper CORS handling
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setGeneratedFiles(data.files);
    } catch (error) {
      console.error('Error generating files:', error);
      // Display a simplified error to the user
      alert(`Error connecting to the backend server. Please make sure the backend is running on ${BACKEND_URL}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            PlanAI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Generate structured project files from your description.
          </p>
        </header>
        
        <main className="flex flex-col items-center justify-center">
          <ProjectForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          {isLoading && (
            <div className="mt-8 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Generating your project files...
              </p>
            </div>
          )}
          
          {!isLoading && generatedFiles.length > 0 && (
            <OutputDisplay files={generatedFiles} />
          )}
        </main>
        
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2025 PlanAI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
