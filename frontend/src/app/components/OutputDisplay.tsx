'use client';

import { useState } from 'react';
import DownloadButton from './DownloadButton';

interface OutputFile {
  name: string;
  content: string;
}

interface OutputDisplayProps {
  files: OutputFile[];
}

export default function OutputDisplay({ files }: OutputDisplayProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Generated Files</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        {files.map((file, index) => (
          <button
            key={file.name}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative">
        {files.map((file, index) => (
          <div 
            key={file.name} 
            className={`${activeTab === index ? 'block' : 'hidden'}`}
          >
            <div className="absolute top-0 right-0">
              <DownloadButton 
                fileName={file.name} 
                content={file.content} 
              />
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto max-h-[500px] mt-8">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-mono">
                {file.content}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
