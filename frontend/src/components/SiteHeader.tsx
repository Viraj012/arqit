"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

// Shared transition config
const transition = { duration: 0.4, ease: "easeInOut" };

// Framer Motion variants
const wrapperVariants = {
  top: { width: "100%" },
  scrolled: { width: "90%" },
};

const backgroundVariants = {
  top: { opacity: 0 },
  scrolled: { opacity: 1 },
};

const headerVariants = {
  top: { padding: "0" },
  scrolled: { padding: "0.5rem 1rem" },
};

const authVariants = {
  top: { gap: "1rem" },
  scrolled: { gap: "0.75rem" },
};

export default function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const state = scrolled ? "scrolled" : "top";

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 px-20 py-6 flex items-center justify-center"
      animate={state}
      transition={transition}
    >
      <motion.div
        className="relative"
        variants={wrapperVariants}
        transition={transition}
      >
        <motion.div
          className="absolute inset-0 -z-10 rounded-xl bg-neutral-800/60 backdrop-blur-xl p-4"
          variants={backgroundVariants}
          initial="top"
          animate={state}
          transition={transition}
        />

        <motion.div
          className="flex items-center justify-between"
          variants={headerVariants}
          transition={transition}
        >
          {/* Logo */}
          <div className="text-2xl font-normal text-neutral-50">arqit</div>

          {/* Navigation Links */}
          <div className="flex flex-1 justify-center text-base text-neutral-200/60 transition-colors">
            <div className="flex items-center gap-6">
              <Link href="#process" className="hover:text-neutral-50">
                Process
              </Link>
              <Link href="#why" className="hover:text-neutral-50">
                Why arqit
              </Link>
              <Link href="#pricing" className="hover:text-neutral-50">
                Pricing
              </Link>
              <Link href="#faq" className="hover:text-neutral-50">
                FAQ
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <motion.div
            className="flex items-center"
            variants={authVariants}
            transition={transition}
          >
            <Link
              href="/login"
              className={`rounded-xl px-5 py-1.5 text-sm text-neutral-50 transition-colors ${
                scrolled
                  ? "border border-neutral-50"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={`rounded-xl px-5 py-1.5 text-sm text-neutral-50 transition-colors ${
                scrolled
                  ? "bg-neutral-800"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              Signup
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}
