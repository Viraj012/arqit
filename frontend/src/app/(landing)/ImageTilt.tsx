"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { TextShimmer } from "../../components/TextShimmer";

export default function ImageTilt() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["center end", "end start"],
  });

  const rotationX = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  return (
    <section ref={containerRef} className="relative py-8 sm:py-12 md:py-16">
      <div className="text-center px-4 sm:px-6">
        <TextShimmer className="font-montserrat text-3xl/tight sm:text-4xl/normal md:text-5xl/relaxed lg:text-6xl/relaxed font-bold">
          At a glance
        </TextShimmer>
        <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg text-neutral-100/60 max-w-2xl mx-auto">
          Transform simple project ideas into comprehensive development
          blueprints
        </p>
      </div>

      <div
        className="sticky top-0 h-[70vh] sm:h-[80vh] md:h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{ rotateX: rotationX }}
          className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto shadow-[0_10px_40px_theme(colors.neutral.800/15)] rounded-lg sm:rounded-xl"
        >
          {/* Wrapper to control size and rounded corners */}
          <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh] rounded-lg sm:rounded-xl overflow-hidden">
            <Image
              src="/results-page.png"
              alt="Your image"
              fill
              className="object-contain object-top rounded-lg sm:rounded-xl"
              priority
            />
          </div>

          {/* Dark fade overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 rounded-lg sm:rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
