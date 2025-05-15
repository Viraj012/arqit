export default function SiteFooter() {
  return (
    <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-100/40 pt-6 sm:pt-8 pb-8 sm:pb-10 text-center md:flex-row px-4 sm:px-6 md:px-10 lg:px-20">
      <p className="text-xs sm:text-sm text-neutral-100/40">
        © 2025 arqit. All rights reserved.
      </p>
      <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-xs sm:text-sm">
        <a
          href="#"
          className="transition-colors hover:text-primary py-1 sm:py-0"
        >
          Privacy Policy
        </a>
        <span className="hidden sm:inline text-neutral-100/40">•</span>
        <a
          href="#"
          className="transition-colors hover:text-primary py-1 sm:py-0"
        >
          Terms of Service
        </a>
        <span className="hidden sm:inline text-neutral-100/40">•</span>
        <a
          href="#"
          className="transition-colors hover:text-primary py-1 sm:py-0"
        >
          Cookie Settings
        </a>
      </nav>
    </div>
  );
}
