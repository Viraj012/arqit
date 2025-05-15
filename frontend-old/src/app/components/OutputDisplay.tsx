'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

interface OutputFile {
  name: string;
  content: string;
}

interface OutputDisplayProps {
  files: OutputFile[];
}

export default function OutputDisplay({ files }: OutputDisplayProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [chatInput, setChatInput] = useState('');

  if (files.length === 0) {
    return null;
  }

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
    console.log(`Submitted chat for ${files[activeTab].name}: ${chatInput}`);
    setChatInput('');
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-50 border-r">
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
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-[calc(100vh-200px)]">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {files[activeTab].content}
            </pre>
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t p-4">
          <form onSubmit={handleChatSubmit} className="flex space-x-2">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Edit this file..."
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
  );
}