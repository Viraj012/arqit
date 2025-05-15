'use client';

interface DownloadButtonProps {
  fileName: string;
  content: string;
}

export default function DownloadButton({ fileName, content }: DownloadButtonProps) {
  const handleDownload = () => {
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

  return (
    <button
      onClick={handleDownload}
      className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded-md text-sm flex items-center"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4 mr-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
        />
      </svg>
      Download
    </button>
  );
}
