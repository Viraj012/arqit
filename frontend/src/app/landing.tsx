"use client";

import ImageTilt from "@/components/ImageTilt";
import { PricingCard } from "@/components/PricingCard";
import { PromptsMarquee } from "@/components/PromptsMarquee";
import { TextShimmer } from "@/components/TextShimmer";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileCode,
  ListTodo,
  FileText,
  Rocket,
  Server,
  Database,
  Code2,
  GitBranch,
  Terminal,
  Code,
  ClipboardList,
  Lightbulb,
  DollarSign,
  CheckCircle,
  Clock,
} from "lucide-react";
import Image from "next/image";
import FAQSection from "@/components/FAQSection";

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

      <section className="py-16">
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

function PricingSection() {
  return (
    <section id="pricing" className="py-16">
      <div className="text-center">
        <TextShimmer className="font-montserrat text-6xl/relaxed font-bold ">
          Pricing
        </TextShimmer>
        <p className="mb-12 text-neutral-100/60">
          Flexible plans designed to scale with your development needs
        </p>
      </div>
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
  );
}

function ProcessSection() {
  return (
    <section id="process" className="py-16">
      <div className="text-center">
        <TextShimmer className="font-montserrat text-6xl/relaxed font-bold ">
          Our Process
        </TextShimmer>
        <p className="mb-12 text-neutral-100/60">
          From concept to code in four simple steps
        </p>
      </div>
      <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
        <div className="relative">
          <div className="relative z-10 grid grid-cols-6 gap-3">
            <Card className="relative col-span-full flex overflow-hidden lg:col-span-2 bg-neutral-900 border-neutral-700">
              <CardContent className="relative w-full h-full flex items-center pl-6 py-6">
                <div className="flex flex-col items-start">
                  <span className="block text-8xl font-bold text-neutral-100 leading-none">
                    10x
                  </span>
                  <h2 className="mt-2 text-2xl font-semibold text-neutral-100/60">
                    Faster Development
                  </h2>
                </div>
              </CardContent>
            </Card>

            <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 bg-neutral-900 border-neutral-700">
              <CardContent className="pt-6">
                <div className="relative mx-auto flex aspect-square size-32 rounded-full border border-neutral-700 before:absolute before:-inset-2 before:rounded-full before:border before:border-neutral-600">
                  <Lightbulb className="m-auto size-16 text-neutral-400" />
                </div>
                <div className="relative z-10 mt-6 space-y-2">
                  <h2 className="text-lg font-medium text-neutral-100">
                    Dream It
                  </h2>
                  <p className="text-neutral-100/60 text-sm">
                    Transform your idea into reality. Simply describe what you
                    want to build in everyday language - no technical jargon
                    required.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 bg-neutral-900 border-neutral-700">
              <CardContent className="pt-6">
                <div className="relative mx-auto flex aspect-square size-32 rounded-full border border-neutral-700 before:absolute before:-inset-2 before:rounded-full before:border before:border-neutral-600">
                  <ClipboardList className="m-auto size-16 text-neutral-400" />
                </div>
                <div className="relative z-10 mt-6 space-y-2">
                  <h2 className="text-lg font-medium text-neutral-100">
                    Define it
                  </h2>
                  <p className="text-neutral-100/60 text-sm">
                    Answer a few quick questions about your project name,
                    pricing preferences, and other essential details to
                    customize your plan.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="relative col-span-full overflow-hidden lg:col-span-3 bg-neutral-900 border-neutral-700">
              <CardContent className="grid pt-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                  <div className="relative flex aspect-square size-12 rounded-full border border-neutral-700 before:absolute before:-inset-2 before:rounded-full before:border before:border-neutral-600">
                    <Code
                      className="m-auto size-5 text-neutral-300"
                      strokeWidth={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-lg font-medium text-neutral-100">
                      Tech It
                    </h2>
                    <p className="text-neutral-100/60 text-sm">
                      Select your preferred tech stack or let us recommend the
                      optimal technologies for your specific project needs.
                    </p>
                  </div>
                </div>
                <div className="rounded-tl-(--radius) relative -mb-6 -mr-6 mt-6 h-fit border-l border-t border-neutral-700 p-6 py-6 sm:ml-6">
                  <div className="absolute left-3 top-2 flex gap-1">
                    <span className="block size-2 rounded-full border border-neutral-600 bg-neutral-700"></span>
                    <span className="block size-2 rounded-full border border-neutral-600 bg-neutral-700"></span>
                    <span className="block size-2 rounded-full border border-neutral-600 bg-neutral-700"></span>
                  </div>
                  <div className="h-48 w-full flex items-center justify-center text-neutral-500">
                    <div className="flex flex-col items-center gap-2">
                      <Server className="size-12 text-neutral-400" />
                      <Database className="size-8 text-neutral-400" />
                      <div className="flex gap-4">
                        <Code2 className="size-6 text-neutral-400" />
                        <GitBranch className="size-6 text-neutral-400" />
                        <Terminal className="size-6 text-neutral-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative col-span-full overflow-hidden lg:col-span-3 bg-neutral-900 border-neutral-700">
              <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                  <div className="relative flex aspect-square size-12 rounded-full border border-neutral-700 before:absolute before:-inset-2 before:rounded-full before:border before:border-neutral-600">
                    <Rocket
                      className="m-auto size-6 text-neutral-300"
                      strokeWidth={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-lg font-medium text-neutral-100">
                      Build It
                    </h2>
                    <p className="text-neutral-100/60 text-sm">
                      Receive comprehensive, AI-ready markdown files with
                      detailed plans and task blueprints that accelerate your
                      development process.
                    </p>
                  </div>
                </div>
                <div className="before:bg-neutral-700 relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px sm:-my-6 sm:-mr-6">
                  <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                    <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                      <span className="block h-fit rounded border border-neutral-700 px-2 py-1 text-xs text-neutral-300 shadow-sm">
                        Project Plan
                      </span>
                      <div className="ring-neutral-800 size-7 ring-4">
                        <div className="size-full rounded-full bg-neutral-700 flex items-center justify-center">
                          <FileText className="size-4 text-neutral-400" />
                        </div>
                      </div>
                    </div>
                    <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                      <div className="ring-neutral-800 size-8 ring-4">
                        <div className="size-full rounded-full bg-neutral-700 flex items-center justify-center">
                          <ListTodo className="size-4 text-neutral-400" />
                        </div>
                      </div>
                      <span className="block h-fit rounded border border-neutral-700 px-2 py-1 text-xs text-neutral-300 shadow-sm">
                        Task Blueprint
                      </span>
                    </div>
                    <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                      <span className="block h-fit rounded border border-neutral-700 px-2 py-1 text-xs text-neutral-300 shadow-sm">
                        Technical Specs
                      </span>
                      <div className="ring-neutral-800 size-7 ring-4">
                        <div className="size-full rounded-full bg-neutral-700 flex items-center justify-center">
                          <FileCode className="size-4 text-neutral-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section id="why" className="py-16">
      <div className="text-center">
        <TextShimmer className="font-montserrat text-6xl/relaxed font-bold ">
          Why arqit
        </TextShimmer>
        <p className="mb-12 text-neutral-100/60">
          Our AI-ready blueprint system revolutionizes how you build software
        </p>
      </div>
      <div className="mx-auto max-w-xl md:max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
          <div className="lg:col-span-2">
            <div className="md:pr-6 lg:pr-0">
              <p className="mt-6 text-neutral-100/60">
                Turn ideas into production-ready applications with AI-driven
                blueprints that streamline every step of the development
                process.
              </p>
            </div>
            <ul className="mt-8 divide-y divide-neutral-700 border-y border-neutral-700 *:py-5">
              <li className="flex flex-col">
                <div className="flex items-center gap-3 mb-1">
                  <Clock className="size-5 text-neutral-400" />
                  <span className="text-6xl font-bold text-neutral-50">
                    78%
                  </span>
                </div>
                <span className="pl-8 text-neutral-300">
                  Less Development Time
                </span>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-3 mb-1">
                  <CheckCircle className="size-5 text-neutral-400" />
                  <span className="text-6xl font-bold text-neutral-50">
                    91%
                  </span>
                </div>
                <span className="pl-8 text-neutral-300">
                  Higher Success Rate
                </span>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-3 mb-1">
                  <DollarSign className="size-5 text-neutral-400" />
                  <span className="text-6xl font-bold text-neutral-50">
                    64%
                  </span>
                </div>
                <span className="pl-8 text-neutral-300">Cost Reduction</span>
              </li>
            </ul>
          </div>
          <div className="border-neutral-700/50 relative rounded-3xl border p-3 lg:col-span-3">
            <div className="bg-gradient-to-b aspect-76/59 relative rounded-2xl from-neutral-700 to-transparent p-px">
              <Image
                src="/results-page.png"
                className="rounded-[15px]"
                alt="AI blueprint visualization"
                width={1200}
                height={900}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
