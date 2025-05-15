"use client";

import { PricingCard } from "@/components/PricingCard";
import { PromptsMarquee } from "@/components/PromptsMarquee";
import { TextShimmer } from "@/components/TextShimmer";
import { useState } from "react";

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
      <section className="flex flex-col items-center justify-center text-center mx-auto max-w-2xl">
        {/* Logo/Brand */}
        <TextShimmer className="mb-4 font-poppins text-6xl font-bold text-neutral-50">
          arqit
        </TextShimmer>

        {/* Tagline */}
        <p className="mb-8 max-w-xl text-base font-normal text-neutral-200/60">
          Describe your app. Get a full build plan for your AI tools.
        </p>

        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="relative mb-4 rounded-xl bg-neutral-800 p-4 w-full">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What do you want to build..."
              className="min-h-24 w-full resize-none bg-transparent text-sm text-neutral-200 placeholder-neutral-500 outline-none"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="flex items-center justify-center rounded-xl bg-neutral-50 px-6 py-3 font-montserrat text-sm font-bold text-neutral-900 transition-colors hover:bg-neutral-200"
          >
            GENERATE
          </button>
        </form>
      </section>

      <section id="pricing" className="my-16">
        <PromptsMarquee prompts={prompts} direction="left" />
        <PromptsMarquee prompts={prompts} direction="right" />
      </section>

      <section className="text-center">
        <TextShimmer className="font-montserrat text-6xl/relaxed font-bold ">
          Pricing
        </TextShimmer>
        <p className="mb-12 mt-2">
          Free for individual use; upgrade for advanced features.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mx-auto max-w-4xl">
          <PricingCard
            tier="Free"
            price="$0/mo"
            bestFor="Best for 1-5 users"
            CTA="Get started free"
            benefits={[
              { text: "One workspace", checked: true },
              { text: "Email support", checked: true },
              { text: "1 day data retention", checked: false },
              { text: "Custom roles", checked: false },
              { text: "Priority support", checked: false },
              { text: "SSO", checked: false },
            ]}
          />
          <PricingCard
            tier="Pro"
            price="$79/mo"
            bestFor="Best for 5-50 users"
            CTA="14-day free trial"
            benefits={[
              { text: "Five workspaces", checked: true },
              { text: "Email support", checked: true },
              { text: "7 day data retention", checked: true },
              { text: "Custom roles", checked: true },
              { text: "Priority support", checked: false },
              { text: "SSO", checked: false },
            ]}
          />
          <PricingCard
            tier="Enterprise"
            price="Contact us"
            bestFor="Best for 50+ users"
            CTA="Contact us"
            benefits={[
              { text: "Unlimited workspaces", checked: true },
              { text: "Email support", checked: true },
              { text: "30 day data retention", checked: true },
              { text: "Custom roles", checked: true },
              { text: "Priority support", checked: true },
              { text: "SSO", checked: true },
            ]}
          />
        </div>
      </section>
    </>
  );
}
