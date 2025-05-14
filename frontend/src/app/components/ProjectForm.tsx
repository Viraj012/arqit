'use client';

import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ProjectFormProps {
  onSubmit: (projectDescription: string) => void;
  isLoading: boolean;
}

export default function ProjectForm({ onSubmit, isLoading }: ProjectFormProps) {
  const [projectDescription, setProjectDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!projectDescription.trim()) {
      setError('Please enter a project description');
      return;
    }
    
    if (projectDescription.trim().length < 10) {
      setError('Project description must be at least 10 characters long');
      return;
    }
    
    setError('');
    onSubmit(projectDescription);
  };

  return (
    <Card className="bg-white/5 dark:bg-gray-800/20 backdrop-blur-sm shadow-lg border border-foreground/5 rounded-xl">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-xl font-bold">Describe Your Project</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Textarea
              id="projectDescription"
              className={`min-h-[150px] resize-none bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm border-foreground/10 focus:border-foreground/20 focus:ring-foreground/10 ${error ? 'border-red-500 ring-red-500/20' : ''}`}
              placeholder="Example: I want to build a React and Node.js web application for project management with user authentication, task tracking, and file uploading..."
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="font-bold relative overflow-hidden group rounded-xl"
            >
              <span className="relative z-10">
                {isLoading ? 'Generating...' : 'Generate Project Files'}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}