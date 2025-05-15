import { TextShimmer } from "@/components/TextShimmer";
import { CheckCircle, Clock, DollarSign } from "lucide-react";
import Image from "next/image";

export default function WhySection() {
  return (
    <section id="why" className="py-8 sm:py-12 md:py-16">
      <div className="text-center px-4">
        <TextShimmer className="font-montserrat text-3xl/tight sm:text-4xl/normal md:text-5xl/relaxed lg:text-6xl/relaxed font-bold">
          Why arqit
        </TextShimmer>
        <p className="mb-8 sm:mb-12 text-sm sm:text-base text-neutral-100/60 max-w-xl mx-auto">
          Our AI-ready blueprint system revolutionizes how you build software
        </p>
      </div>
      <div className="mx-auto max-w-xs sm:max-w-xl md:max-w-4xl lg:max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 sm:gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-16 xl:gap-24">
          <div className="lg:col-span-2">
            <div className="md:pr-6 lg:pr-0">
              <p className="mt-4 sm:mt-6 text-sm sm:text-base text-neutral-100/60">
                Turn ideas into production-ready applications with AI-driven
                blueprints that streamline every step of the development
                process.
              </p>
            </div>
            <ul className="mt-6 sm:mt-8 divide-y divide-neutral-700 border-y border-neutral-700 *:py-3 sm:*:py-4 md:*:py-5">
              <li className="flex flex-col">
                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                  <Clock className="size-4 sm:size-5 text-neutral-400" />
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-50">
                    78%
                  </span>
                </div>
                <span className="pl-6 sm:pl-8 text-sm sm:text-base text-neutral-300">
                  Less Development Time
                </span>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                  <CheckCircle className="size-4 sm:size-5 text-neutral-400" />
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-50">
                    91%
                  </span>
                </div>
                <span className="pl-6 sm:pl-8 text-sm sm:text-base text-neutral-300">
                  Higher Success Rate
                </span>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                  <DollarSign className="size-4 sm:size-5 text-neutral-400" />
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-50">
                    64%
                  </span>
                </div>
                <span className="pl-6 sm:pl-8 text-sm sm:text-base text-neutral-300">
                  Cost Reduction
                </span>
              </li>
            </ul>
          </div>
          <div className="border-neutral-700/50 relative rounded-xl sm:rounded-2xl md:rounded-3xl border p-2 sm:p-3 lg:col-span-3">
            <div className="bg-gradient-to-b aspect-76/59 relative rounded-lg sm:rounded-xl md:rounded-2xl from-neutral-700 to-transparent p-px">
              <Image
                src="/results-page.png"
                className="rounded-[10px] sm:rounded-[15px]"
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
