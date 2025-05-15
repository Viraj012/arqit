"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, Variants } from "motion/react";
import { Menu, X } from "lucide-react";

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

// Fixed variants using proper TypeScript types
const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -20,
  },
  open: {
    opacity: 1,
    y: 0,
  },
};

export default function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if current viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const state = scrolled ? "scrolled" : "top";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 px-4 sm:px-6 md:px-10 lg:px-20 py-4 sm:py-6 flex items-center justify-center"
      animate={state}
      transition={transition}
    >
      <motion.div
        className="relative w-full"
        variants={wrapperVariants}
        transition={transition}
      >
        <motion.div
          className="absolute inset-0 -z-10 rounded-lg md:rounded-xl bg-neutral-800/60 backdrop-blur-xl"
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
          <div className="text-xl sm:text-2xl font-normal text-neutral-50">
            arqit
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex flex-1 justify-center text-sm sm:text-base text-neutral-200/60 transition-colors">
            <div className="flex items-center gap-4 lg:gap-6">
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

          {/* Desktop Auth Buttons */}
          <motion.div
            className="hidden md:flex items-center"
            variants={authVariants}
            transition={transition}
          >
            <Link
              href="/login"
              className={`rounded-lg md:rounded-xl px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 text-xs sm:text-sm text-neutral-50 transition-colors ${
                scrolled
                  ? "border border-neutral-50"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={`rounded-lg md:rounded-xl px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 text-xs sm:text-sm text-neutral-50 transition-colors ${
                scrolled
                  ? "bg-neutral-800"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              Signup
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-neutral-50 p-1"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </motion.div>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 right-0 top-full mt-2 flex-col rounded-lg bg-neutral-800/90 backdrop-blur-xl p-4 md:hidden ${
            mobileMenuOpen ? "flex" : "hidden"
          }`}
        >
          <motion.div
            className="flex flex-col w-full"
            initial="closed"
            animate={mobileMenuOpen ? "open" : "closed"}
            variants={mobileMenuVariants}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-4 mb-4">
              <Link
                href="#process"
                className="text-neutral-200/60 hover:text-neutral-50 py-2"
                onClick={handleLinkClick}
              >
                Process
              </Link>
              <Link
                href="#why"
                className="text-neutral-200/60 hover:text-neutral-50 py-2"
                onClick={handleLinkClick}
              >
                Why arqit
              </Link>
              <Link
                href="#pricing"
                className="text-neutral-200/60 hover:text-neutral-50 py-2"
                onClick={handleLinkClick}
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="text-neutral-200/60 hover:text-neutral-50 py-2"
                onClick={handleLinkClick}
              >
                FAQ
              </Link>
            </div>
            <div className="flex flex-col space-y-3">
              <Link
                href="/login"
                className="rounded-lg bg-transparent border border-neutral-50 py-2 text-center text-neutral-50"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-neutral-700 py-2 text-center text-neutral-50"
                onClick={handleLinkClick}
              >
                Signup
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
