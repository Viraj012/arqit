"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { TextShimmer } from "./TextShimmer";

export default function ImageTilt() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["center end", "end start"],
  });

  const rotationX = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  return (
    <section ref={containerRef} className="relative py-16">
      <div className="text-center">
        <TextShimmer className="font-montserrat text-6xl/relaxed font-bold">
          At a glance
        </TextShimmer>
        <p className="mb-6 text-neutral-100/60">
          Transform simple project ideas into comprehensive development
          blueprints
        </p>
      </div>

      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{ rotateX: rotationX }}
          className="relative w-full max-w-4xl mx-auto shadow-[0_10px_40px_theme(colors.neutral.800/15)] rounded-xl"
        >
          {/* Wrapper to control size and rounded corners */}
          <div className="relative w-full h-[90vh] rounded-xl overflow-hidden">
            <Image
              src="/results-page.png"
              alt="Your image"
              fill
              className="object-contain object-top rounded-xl" // Change to 'object-contain object-top' if you want the full image
              priority
            />
          </div>

          {/* Dark fade overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
