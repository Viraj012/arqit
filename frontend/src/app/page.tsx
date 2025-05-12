'use client';

import { useState } from 'react';
import ProjectForm from './components/ProjectForm';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';

interface OutputFile {
  name: string;
  content: string;
}

// Get backend URL from environment variables or use default
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
      
      // In a real implementation, we might store the data in a global state
      // or pass it through the router
      router.push('/results');
      
    } catch (error) {
      console.error('Error generating files:', error);
      // Display a simplified error to the user
      alert(`Error connecting to the backend server. Please make sure the backend is running on ${BACKEND_URL}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Navbar */}
        <nav className="flex justify-between items-center mb-12 py-4 px-6 border-b">
          <div className="text-2xl font-bold">Plan AI</div>
          <div className="flex space-x-4">
            {/* Placeholder for navigation items if needed */}
          </div>
        </nav>
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Plan AI
          </h1>
          <p className="text-xl text-muted-foreground">
            Generate structured project files from your description.
          </p>
        </header>
        
        <main className="flex flex-col items-center justify-center">
          <ProjectForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          {isLoading && (
            <div className="mt-8 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">
                Generating your project files...
              </p>
            </div>
          )}
          
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
            <Card className="rounded-xl shadow-md">
              <CardHeader>
                <CardTitle>Project Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate detailed project plans with structured files and organized tasks.
                </p>
              </CardContent>
            </Card>
            
            <Card className="rounded-xl shadow-md">
              <CardHeader>
                <CardTitle>Task Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get a prioritized list of tasks with clear implementation steps.
                </p>
              </CardContent>
            </Card>
            
            <Card className="rounded-xl shadow-md">
              <CardHeader>
                <CardTitle>Technical Blueprint</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive a technical blueprint for your project with detailed specifications.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <footer className="mt-16 text-center text-muted-foreground text-sm py-4">
          <p>© 2025 Plan AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}