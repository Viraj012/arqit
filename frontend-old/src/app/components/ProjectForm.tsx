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
    <div className="w-full max-w-2xl">
      <Card className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <CardHeader className="pb-4 text-center">
          <CardTitle className="text-2xl font-bold">Project Description</CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Textarea
                id="projectDescription"
                className={`min-h-[150px] resize-none ${error ? 'border-red-500 ring-red-500/20' : ''}`}
                placeholder="Enter your project idea here..."
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
                className="font-bold"
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}