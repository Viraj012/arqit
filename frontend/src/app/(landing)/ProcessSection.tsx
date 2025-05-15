import { TextShimmer } from "@/components/TextShimmer";
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
} from "lucide-react";

export default function ProcessSection() {
  return (
    <section id="process" className="py-8 sm:py-12 md:py-16">
      <div className="text-center px-4">
        <TextShimmer className="font-montserrat text-3xl/tight sm:text-4xl/normal md:text-5xl/relaxed lg:text-6xl/relaxed font-bold">
          Our Process
        </TextShimmer>
        <p className="mb-8 sm:mb-12 text-sm sm:text-base text-neutral-100/60 max-w-xl mx-auto">
          From concept to code in four simple steps
        </p>
      </div>
      <div className="mx-auto max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl px-4 sm:px-6">
        <div className="relative">
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-6 gap-3">
            <Card className="relative col-span-full flex overflow-hidden lg:col-span-2 bg-neutral-900 border-neutral-700">
              <CardContent className="relative w-full h-full flex items-center pl-4 sm:pl-6 py-4 sm:py-6">
                <div className="flex flex-col items-start">
                  <span className="block text-5xl sm:text-6xl md:text-8xl font-bold text-neutral-100 leading-none">
                    10x
                  </span>
                  <h2 className="mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl font-semibold text-neutral-100/60">
                    Faster Development
                  </h2>
                </div>
              </CardContent>
            </Card>

            <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 bg-neutral-900 border-neutral-700">
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="relative mx-auto flex aspect-square size-24 sm:size-28 md:size-32 rounded-full border border-neutral-700 before:absolute before:-inset-2 before:rounded-full before:border before:border-neutral-600">
                  <Lightbulb className="m-auto size-12 sm:size-14 md:size-16 text-neutral-400" />
                </div>
                <div className="relative z-10 mt-4 sm:mt-6 space-y-1 sm:space-y-2">
                  <h2 className="text-base sm:text-lg font-medium text-neutral-100">
                    Dream It
                  </h2>
                  <p className="text-neutral-100/60 text-xs sm:text-sm">
                    Transform your idea into reality. Simply describe what you
                    want to build in everyday language - no technical jargon
                    required.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 bg-neutral-900 border-neutral-700">
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="relative mx-auto flex aspect-square size-24 sm:size-28 md:size-32 rounded-full border border-neutral-700 before:absolute before:-inset-2 before:rounded-full before:border before:border-neutral-600">
                  <ClipboardList className="m-auto size-12 sm:size-14 md:size-16 text-neutral-400" />
                </div>
                <div className="relative z-10 mt-4 sm:mt-6 space-y-1 sm:space-y-2">
                  <h2 className="text-base sm:text-lg font-medium text-neutral-100">
                    Define it
                  </h2>
                  <p className="text-neutral-100/60 text-xs sm:text-sm">
                    Answer a few quick questions about your project name,
                    pricing preferences, and other essential details to
                    customize your plan.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="relative col-span-full overflow-hidden lg:col-span-3 bg-neutral-900 border-neutral-700">
              <CardContent className="grid pt-4 sm:pt-6 px-4 sm:px-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-6 lg:space-y-6">
                  <div className="relative flex aspect-square size-10 sm:size-12 rounded-full border border-neutral-700 before:absolute before:-inset-2 before:rounded-full before:border before:border-neutral-600">
                    <Code
                      className="m-auto size-4 sm:size-5 text-neutral-300"
                      strokeWidth={1}
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h2 className="text-base sm:text-lg font-medium text-neutral-100">
                      Tech It
                    </h2>
                    <p className="text-neutral-100/60 text-xs sm:text-sm">
                      Select your preferred tech stack or let us recommend the
                      optimal technologies for your specific project needs.
                    </p>
                  </div>
                </div>
                <div className="rounded-tl-(--radius) relative -mb-6 -mr-6 mt-6 h-fit border-l border-t border-neutral-700 p-4 sm:p-6 py-4 sm:py-6 sm:ml-6">
                  <div className="absolute left-3 top-2 flex gap-1">
                    <span className="block size-2 rounded-full border border-neutral-600 bg-neutral-700"></span>
                    <span className="block size-2 rounded-full border border-neutral-600 bg-neutral-700"></span>
                    <span className="block size-2 rounded-full border border-neutral-600 bg-neutral-700"></span>
                  </div>
                  <div className="h-36 sm:h-48 w-full flex items-center justify-center text-neutral-500">
                    <div className="flex flex-col items-center gap-2">
                      <Server className="size-8 sm:size-12 text-neutral-400" />
                      <Database className="size-6 sm:size-8 text-neutral-400" />
                      <div className="flex gap-4">
                        <Code2 className="size-4 sm:size-6 text-neutral-400" />
                        <GitBranch className="size-4 sm:size-6 text-neutral-400" />
                        <Terminal className="size-4 sm:size-6 text-neutral-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative col-span-full overflow-hidden lg:col-span-3 bg-neutral-900 border-neutral-700">
              <CardContent className="grid h-full pt-4 sm:pt-6 px-4 sm:px-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-6 lg:space-y-6">
                  <div className="relative flex aspect-square size-10 sm:size-12 rounded-full border border-neutral-700 before:absolute before:-inset-2 before:rounded-full before:border before:border-neutral-600">
                    <Rocket
                      className="m-auto size-5 sm:size-6 text-neutral-300"
                      strokeWidth={1}
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h2 className="text-base sm:text-lg font-medium text-neutral-100">
                      Build It
                    </h2>
                    <p className="text-neutral-100/60 text-xs sm:text-sm">
                      Receive comprehensive, AI-ready markdown files with
                      detailed plans and task blueprints that accelerate your
                      development process.
                    </p>
                  </div>
                </div>
                <div className="before:bg-neutral-700 relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px sm:-my-6 sm:-mr-6">
                  <div className="relative flex h-full flex-col justify-center space-y-4 sm:space-y-6 py-4 sm:py-6">
                    <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                      <span className="block h-fit rounded border border-neutral-700 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs text-neutral-300 shadow-sm">
                        Project Plan
                      </span>
                      <div className="ring-neutral-800 size-6 sm:size-7 ring-4">
                        <div className="size-full rounded-full bg-neutral-700 flex items-center justify-center">
                          <FileText className="size-3 sm:size-4 text-neutral-400" />
                        </div>
                      </div>
                    </div>
                    <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                      <div className="ring-neutral-800 size-6 sm:size-8 ring-4">
                        <div className="size-full rounded-full bg-neutral-700 flex items-center justify-center">
                          <ListTodo className="size-3 sm:size-4 text-neutral-400" />
                        </div>
                      </div>
                      <span className="block h-fit rounded border border-neutral-700 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs text-neutral-300 shadow-sm">
                        Task Blueprint
                      </span>
                    </div>
                    <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                      <span className="block h-fit rounded border border-neutral-700 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs text-neutral-300 shadow-sm">
                        Technical Specs
                      </span>
                      <div className="ring-neutral-800 size-6 sm:size-7 ring-4">
                        <div className="size-full rounded-full bg-neutral-700 flex items-center justify-center">
                          <FileCode className="size-3 sm:size-4 text-neutral-400" />
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
