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
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [editedFiles, setEditedFiles] = useState<Set<number>>(new Set());
  const [lastEditTime, setLastEditTime] = useState<number>(Date.now());

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

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatInput.trim() || !files[activeTab]) return;
    
    try {
      setIsChatLoading(true);
      setChatError(null);
      
      const currentFile = files[activeTab];
      
      // Make API call to the chat-edit endpoint
      const response = await fetch(`${BACKEND_URL}/chat-edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_name: currentFile.name,
          file_content: currentFile.content,
          chat_message: chatInput
        }),
        mode: 'cors',
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Parse the response
      const data = await response.json();
      
      // Get the updated content and ensure it's properly formatted
      let updatedContent = data.updated_content;
      
      // Remove any markdown code block markers that might be in the response
      updatedContent = updatedContent.replace(/^```markdown\s*|\s*```$/g, '');
      
      // Trim any leading/trailing whitespace
      updatedContent = updatedContent.trim();
      
      // Update the file content with the edited content
      const updatedFiles = [...files];
      updatedFiles[activeTab] = {
        ...updatedFiles[activeTab],
        content: updatedContent
      };
      
      // Update the files state
      setFiles(updatedFiles);
      
      // Mark this file as edited
      const newEditedFiles = new Set(editedFiles);
      newEditedFiles.add(activeTab);
      setEditedFiles(newEditedFiles);
      
      // Update timestamp to force MarkdownViewer refresh
      setLastEditTime(Date.now());
      
      // Update localStorage with the new files
      localStorage.setItem('planAiResults', JSON.stringify(updatedFiles));
      
      // Clear the chat input
      setChatInput('');
      
      // Show success message
      console.log('Successfully edited file:', files[activeTab]?.name);
    } catch (error) {
      console.error('Error editing file with chat:', error);
      setChatError('Failed to edit file. Please try again.');
    } finally {
      setIsChatLoading(false);
    }
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
                  <div>
                    {editedFiles.has(activeTab) && (
                      <div className="mb-4 p-2 bg-green-50 text-green-700 rounded-md text-sm flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                        <span>This file has been edited using AI</span>
                      </div>
                    )}
                    {/* Using key prop to force re-render when content changes */}
                    <MarkdownViewer 
                      key={`${activeTab}-${lastEditTime}`} 
                      content={files[activeTab]?.content || ''} 
                    />
                  </div>
                )}
              </div>

              {/* Chat Input - Fixed at bottom */}
              <div className="border-t p-4 bg-white">
                {chatError && (
                  <div className="mb-3 p-2 bg-red-50 text-red-600 rounded-md text-sm">
                    {chatError}
                  </div>
                )}
                <form onSubmit={handleChatSubmit} className="flex space-x-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Chat to edit this file..."
                    className="flex-1"
                    disabled={isChatLoading}
                  />
                  <Button 
                    type="submit" 
                    disabled={isChatLoading || !files.length}
                  >
                    {isChatLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent border-white" />
                    ) : (
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
                    )}
                  </Button>
                </form>
                <p className="mt-2 text-xs text-gray-500">
                  Ask the AI to make changes to the current file. For example: "Add a new section about deployment" or "Reorganize the tasks".
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}