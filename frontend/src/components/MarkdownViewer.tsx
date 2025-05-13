import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { cn } from '../lib/utils';

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  // Detect dark mode based on CSS media query
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    // Check if dark mode is enabled using media query
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeQuery.matches);
    
    // Also check for dark class on document to support manual theme switching
    const isDarkMode = document.documentElement.classList.contains('dark');
    if (isDarkMode) setIsDark(true);
    
    // Listen for changes in the color scheme
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkModeQuery.addEventListener('change', handleChange);
    
    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={cn(
      "prose dark:prose-invert max-w-none w-full rounded-lg p-6",
      "prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
      "prose-p:my-4 prose-p:leading-relaxed",
      "prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
      "prose-li:my-1 prose-li:leading-relaxed",
      "prose-img:rounded-md prose-img:shadow-md",
      "prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700 prose-blockquote:pl-4 prose-blockquote:italic",
      "prose-hr:my-8 prose-hr:border-gray-200 dark:prose-hr:border-gray-800",
      "prose-table:border-collapse prose-table:w-full",
      "prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700 prose-th:p-2 prose-th:bg-gray-100 dark:prose-th:bg-gray-800",
      "prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:p-2",
      "bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800",
      "transition-all duration-200 ease-in-out"
    )}>
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            return !inline && language ? (
              <div className="my-4 rounded-md overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
                {language && (
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-1 text-xs font-mono text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                    {language}
                  </div>
                )}
                <SyntaxHighlighter
                  style={isDark ? vscDarkPlus : vs}
                  language={language}
                  PreTag="div"
                  className="!bg-gray-50 dark:!bg-gray-900 !m-0 !p-0 !rounded-none"
                  customStyle={{ margin: 0, padding: '1rem' } as React.CSSProperties}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-md text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          pre({ children }) {
            return <>{children}</>;
          },
          h1({ children }) {
            return <h1 className="text-3xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>;
          },
          ul({ children }) {
            return <ul className="list-disc pl-6 my-4">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-6 my-4">{children}</ol>;
          },
          li({ children }) {
            return <li className="mb-1">{children}</li>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4 text-gray-700 dark:text-gray-300">
                {children}
              </blockquote>
            );
          },
          a({ children, href }) {
            return (
              <a href={href} className="text-blue-600 dark:text-blue-400 font-medium hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
          img({ src, alt }) {
            return (
              <img 
                src={src || ''} 
                alt={alt || ''} 
                className="rounded-md shadow-md my-4 max-w-full h-auto"
              />
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6">
                <table className="border-collapse w-full">{children}</table>
              </div>
            );
          },
          th({ children }) {
            return <th className="border border-gray-300 dark:border-gray-700 p-2 bg-gray-100 dark:bg-gray-800 font-semibold text-left">{children}</th>;
          },
          td({ children }) {
            return <td className="border border-gray-300 dark:border-gray-700 p-2">{children}</td>;
          },
          hr() {
            return <hr className="my-8 border-gray-200 dark:border-gray-800" />;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}