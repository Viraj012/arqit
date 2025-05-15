"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface TextShimmerProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
}

export function TextShimmer({
  children,
  as: Component = "span",
  className = "",
  duration = 4,
  spread = 10,
}: TextShimmerProps) {
  const MotionComponent = motion(Component);

  const shimmerSpread = useMemo(() => {
    return `${children.length * spread}px`;
  }, [children, spread]);

  return (
    <MotionComponent
      className={`relative inline-block text-transparent bg-clip-text bg-no-repeat bg-[length:250%_100%] ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(
            90deg,
            transparent calc(50% - ${shimmerSpread}),
            white,
            transparent calc(50% + ${shimmerSpread})
          ),
          linear-gradient(#a1a1aa, #a1a1aa)
        `,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear",
      }}
    >
      {children}
    </MotionComponent>
  );
}
