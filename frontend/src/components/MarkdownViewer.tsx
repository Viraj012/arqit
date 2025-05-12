import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none w-full prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:my-3 prose-a:text-blue-600 prose-li:my-0.5">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}