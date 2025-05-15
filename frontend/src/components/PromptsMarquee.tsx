"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface PromptsMarqueeProps {
  prompts: string[];
  direction?: "left" | "right";
}

export function PromptsMarquee({
  prompts,
  direction = "left",
}: PromptsMarqueeProps) {
  const repeatedPrompts = [...Array(3)].flatMap(() => prompts);
  const isRight = direction === "right";

  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (hoveredIndex === null) {
      controls.start({
        x: isRight ? ["-33.333%", "0%"] : ["0%", "-33.333%"],
        transition: { duration: 30, repeat: Infinity, ease: "linear" },
      });
    } else {
      controls.stop();
    }
  }, [hoveredIndex, controls, isRight]);

  return (
    <div className="relative overflow-hidden bg-neutral-900 py-6 opacity-50">
      <motion.div
        className={`flex gap-6 text-neutral-100 text-xs ${
          isRight ? "flex-row-reverse" : ""
        }`}
        animate={controls}
        style={{ cursor: hoveredIndex !== null ? "default" : "grab" }}
      >
        {repeatedPrompts.map((prompt, i) => (
          <motion.span
            key={i}
            className="cursor-pointer bg-neutral-800 rounded-md p-6 select-none shrink-0 max-w-[20rem] break-words"
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            animate={{
              opacity:
                hoveredIndex === null ? 0.8 : hoveredIndex === i ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          >
            {prompt}
          </motion.span>
        ))}
      </motion.div>
      {/* Gradient fades */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-neutral-900 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none" />
    </div>
  );
}
