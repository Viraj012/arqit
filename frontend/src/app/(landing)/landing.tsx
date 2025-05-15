"use client";

import ImageTilt from "@/app/(landing)/ImageTilt";
import { PromptsMarquee } from "@/components/PromptsMarquee";
import { TextShimmer } from "@/components/TextShimmer";
import { useState } from "react";

import WhySection from "./WhySection";
import ProcessSection from "./ProcessSection";
import PricingSection from "./PricingSection";
import FAQSection from "./FAQSection";

const prompts = [
  "Create a todo application that has a sleek UI and features to add, remove, and mark todos as completed with smooth animations.",
  "Build a multi-language translation tool that can translate text from English to French, Spanish, and German with an intuitive user interface.",
  "Design an email marketing platform that automatically generates catchy subject lines and personalized content based on user data.",
  "Develop a paragraph summarizer that extracts key points and provides concise summaries suitable for quick reading on mobile devices.",
  "Explain complex scientific concepts in simple terms suitable for a 5-year-old, using relatable analogies and engaging visuals.",
  "Create a recipe manager app that allows users to add, edit, and organize recipes with step-by-step cooking instructions and timers.",
  "Build a fitness tracker that records workouts, tracks progress over time, and suggests personalized training plans based on goals.",
  "Design a chatbot interface that can handle customer service queries and escalate issues to human agents when necessary.",
  "Develop a portfolio website with responsive design, smooth navigation, and integrated contact forms for potential clients.",
  "Create a note-taking app that supports rich text formatting, tagging, and quick search with offline capabilities.",
];

export default function LandingPage() {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for submission logic
    console.log("Generating plan for:", prompt);
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center text-center mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-4 sm:pb-6 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl">
        {/* Logo/Brand */}
        <TextShimmer className="mb-2 sm:mb-4 font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-50">
          arqit
        </TextShimmer>

        {/* Tagline */}
        <p className="mb-4 sm:mb-6 md:mb-8 max-w-md sm:max-w-lg md:max-w-xl text-sm sm:text-base font-normal text-neutral-200/60">
          Describe your app. Get a full build plan for your AI tools.
        </p>

        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="relative mb-3 sm:mb-4 rounded-lg sm:rounded-xl bg-neutral-800 p-3 sm:p-4 w-full">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What do you want to build..."
              className="min-h-20 sm:min-h-24 w-full resize-none bg-transparent text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 outline-none"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="flex items-center justify-center rounded-lg sm:rounded-xl bg-neutral-50 px-4 sm:px-6 py-2 sm:py-3 font-montserrat text-xs sm:text-sm font-bold text-neutral-900 transition-colors hover:bg-neutral-200"
          >
            GENERATE
          </button>
        </form>
      </section>

      <section className="py-8 sm:py-12 md:py-16">
        <PromptsMarquee prompts={prompts} direction="left" />
        <PromptsMarquee prompts={prompts} direction="right" />
      </section>

      <ImageTilt />
      <ProcessSection />
      <WhySection />
      <PricingSection />
      <FAQSection />
    </>
  );
}
