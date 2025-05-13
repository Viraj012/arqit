'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from 'lucide-react';
import MarkdownViewer from '@/components/MarkdownViewer';

interface OutputFile {
  name: string;
  content: string;
}

// Get backend URL from environment variables or use default
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export default function ResultsPage() {
  const router = useRouter();
  const [files, setFiles] = useState<OutputFile[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage when component mounts
  useEffect(() => {
    // Function to retrieve data from localStorage
    const loadResultsFromStorage = () => {
      try {
        // Get the stored results data
        const storedData = localStorage.getItem('planAiResults');
        
        if (storedData) {
          // Parse the JSON data
          const parsedData = JSON.parse(storedData);
          
          // Set the files state with the parsed data
          setFiles(parsedData);
          setIsLoading(false);
        } else {
          // If no data is found, redirect back to home
          console.error('No results data found');
          router.push('/');
        }
      } catch (error) {
        console.error('Error loading results:', error);
        router.push('/');
      }
    };

    // Add a small delay to ensure the component is fully mounted
    // This is especially important for Next.js client components
    const timer = setTimeout(() => {
      loadResultsFromStorage();
    }, 300);

    return () => clearTimeout(timer);
  }, [router]);

  const handleDownload = (fileName: string, content: string) => {
    // Create a blob of the text content
    const blob = new Blob([content], { type: 'text/markdown' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create an anchor element and set properties
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    
    // Trigger a click on the anchor element
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for chat functionality
    console.log(`Submitted chat for ${files[activeTab]?.name}: ${chatInput}`);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/')}
            className="hover:bg-transparent"
          >
            ← Back to Home
          </Button>
          <h1 className="text-2xl font-bold">Plan AI Results</h1>
          <div></div> {/* Empty div for flex spacing */}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[70vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="ml-4 text-muted-foreground">Loading results...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-150px)] flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-gray-50 border-r flex-shrink-0">
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-4">Files</h2>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <button
                      key={file.name}
                      className={`w-full flex justify-between items-center p-2 rounded-md ${
                        activeTab === index
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab(index)}
                    >
                      <span>{file.name}</span>
                      <Download 
                        className="h-4 w-4 cursor-pointer" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(file.name, file.content);
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* File Content Area - This will take remaining height and scroll independently */}
              <div className="flex-1 overflow-auto p-6 bg-gray-100">
                {files.length > 0 && (
                  <MarkdownViewer content={files[activeTab]?.content || ''} />
                )}
              </div>

              {/* Chat Input - Fixed at bottom */}
              <div className="border-t p-4 bg-white">
                <form onSubmit={handleChatSubmit} className="flex space-x-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Chat to edit this file..."
                    className="flex-1"
                  />
                  <Button type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}