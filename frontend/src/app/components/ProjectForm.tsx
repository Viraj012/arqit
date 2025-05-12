'use client';

import { useState } from 'react';

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
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Project Description</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
          Describe your project in detail and we&apos;ll generate structured files to help you get started.
        </p>
        
        <div className="mb-4">
          <label 
            htmlFor="projectDescription" 
            className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
          >
            Project Description
          </label>
          <textarea
            id="projectDescription"
            className={`shadow appearance-none border ${error ? 'border-red-500' : 'border-gray-300'} 
                      rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 
                      leading-tight focus:outline-none focus:shadow-outline min-h-[150px]`}
            placeholder="Enter a detailed description of your project here..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
        </div>
        
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none 
                      focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Generating...' : 'Generate Project Files'}
          </button>
        </div>
      </form>
    </div>
  );
}
