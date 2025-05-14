'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Moon, Sun, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';
import { SplashCursor } from "@/components/ui/splash-cursor";

// Get backend URL from environment variables or use default
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export default function Home() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [projectDescription, setProjectDescription] = useState('');
    const [error, setError] = useState('');

    // Theme toggle only works client-side
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
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
        setIsLoading(true);
        
        try {
            // Make API call to the FastAPI backend using environment variable
            const response = await fetch(`${BACKEND_URL}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description: projectDescription }),
                mode: 'cors', // Add CORS mode to ensure proper CORS handling
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            // Parse the JSON response
            const data = await response.json();
            
            // Store the response data in localStorage so it can be accessed by the results page
            if (data && data.files) {
                localStorage.setItem('planAiResults', JSON.stringify(data.files));
            }
            
            // Navigate to the results page
            router.push('/results');
            
        } catch (error) {
            console.error('Error generating files:', error);
            // Display a simplified error to the user
            alert(`Error connecting to the backend server. Please make sure the backend is running on ${BACKEND_URL}`);
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Fluid Animation Background with higher visibility */}
            <SplashCursor 
                SIM_RESOLUTION={128}
                DYE_RESOLUTION={1024}
                DENSITY_DISSIPATION={2.5}
                VELOCITY_DISSIPATION={1.8}
                CURL={5}
                SPLAT_RADIUS={0.25}
                SPLAT_FORCE={8000}
                COLOR_UPDATE_SPEED={10}
                opacity={0.6}
            />

            <div className="w-full min-h-screen">
                {/* Header */}
                <header className="w-full fixed top-0 z-50">
                    <div className="w-full max-w-screen-2xl mx-auto px-4 py-4 flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
                            {mounted && theme === 'dark' ? (
                                <Image 
                                    src="/logo_white.png" 
                                    alt="arcweave logo" 
                                    width={30} 
                                    height={30} 
                                    className="h-10 w-auto"
                                />
                            ) : (
                                <Image 
                                    src="/logo_black.png" 
                                    alt="arcweave logo" 
                                    width={30} 
                                    height={30} 
                                    className="h-10 w-auto"
                                />
                            )}
                            <span className="font-medium text-lg">arqit</span>
                        </Link>
                        
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="rounded-md p-2 transition-colors duration-300 hover:rotate-12 hover:bg-gray-100 dark:hover:bg-gray-800"
                                aria-label="Toggle theme"
                            >
                                {mounted && theme === 'dark' ? (
                                    <Sun className="h-5 w-5 transition-all duration-300" />
                                ) : (
                                    <Moon className="h-5 w-5 transition-all duration-300" />
                                )}
                            </button>
                            <Link 
                                href="#" 
                                className="hidden md:block text-sm font-medium text-foreground link-hover"
                            >
                                Docs
                            </Link>
                            <Button 
                                asChild 
                                size="sm" 
                                variant="outline" 
                                className="hidden md:inline-flex animate-scale-on-hover"
                            >
                                <Link href="#">Upgrade Tier</Link>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="pt-24 relative z-10 w-full">
                    <div className="w-full max-w-screen-lg mx-auto px-4 pt-16 flex flex-col items-center justify-center text-center">
                        <h1 className="text-6xl md:text-6xl font-bold mb-6 tracking-tight transition-all duration-700">arqit</h1>
                        <p className="text-md md:text-lg max-w-2xl mx-auto mb-10 transition-all duration-500 ease-in-out">Generate structured project files from your description, helping vibe coders and developers work with AI tools in a systematic way.</p>

                        {/* Simplified Form */}
                        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
                            <div className="relative overflow-hidden rounded-2xl mb-6 border shadow-sm bg-background/30 backdrop-blur-md transition-all duration-300 hover:shadow-lg">
                                <Textarea
                                    id="projectDescription"
                                    className="min-h-28 px-4 py-3 w-full bg-transparent border-0 resize-none focus:ring-0 placeholder-foreground/40 animate-border-pulse transition-colors duration-300"
                                    placeholder="Example: I want to build a React and Node.js web application for project management with user authentication, task tracking, and file uploading..."
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
                            
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary font-medium text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-full px-6 py-2 h-11 transition-all duration-300"
                            >
                                {isLoading ? 'Generating...' : 'Generate Project Files'}
                                {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                            </Button>
                            
                            {isLoading && (
                                <div className="mt-8 flex flex-col items-center">
                                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black dark:border-white"></div>
                                    <p className="mt-4 text-muted-foreground">
                                        Generating your project files...
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Feature Cards Section */}
                    <section id="features" className="w-full py-24 mt-12 relative z-10">
                        <div className="w-full max-w-screen-lg mx-auto px-4">
                            <h2 className="text-4xl font-bold text-center mb-4">How arcweave works</h2>
                            <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                                Our AI generates comprehensive project documentation to help you build better
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="card-hover bg-background/40 backdrop-blur-md p-6 rounded-xl border border-foreground/5 shadow-lg">
                                    <h3 className="text-xl font-semibold mb-3">Project Planning</h3>
                                    <p className="text-muted-foreground">
                                        Generate detailed project plans with structured files and organized tasks in plan.md.
                                    </p>
                                </div>
                                
                                <div className="card-hover bg-background/40 backdrop-blur-md p-6 rounded-xl border border-foreground/5 shadow-lg">
                                    <h3 className="text-xl font-semibold mb-3">Task Management</h3>
                                    <p className="text-muted-foreground">
                                        Get a prioritized list of tasks with clear implementation steps in task.md.
                                    </p>
                                </div>
                                
                                <div className="card-hover bg-background/40 backdrop-blur-md p-6 rounded-xl border border-foreground/5 shadow-lg">
                                    <h3 className="text-xl font-semibold mb-3">Technical Blueprint</h3>
                                    <p className="text-muted-foreground">
                                        Receive a technical blueprint for your project with detailed specifications in blueprint.md.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Footer */}
                    <footer className="py-12 text-center w-full relative z-10">
                        <div className="w-full max-w-screen-lg mx-auto px-4">
                            <div className="border-t border-foreground/10 pt-8">
                                <p className="text-sm text-muted-foreground">© 2025 arcweave. All rights reserved.</p>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </>
    );
}
