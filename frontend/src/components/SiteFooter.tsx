export default function SiteFooter() {
  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-100/40 pt-8 text-center md:flex-row">
      <p className="text-sm text-neutral-100/40">
        © 2025 arqit. All rights reserved.
      </p>
      <nav className="flex gap-4 text-sm">
        <a href="#" className="transition-colors hover:text-primary">
          Privacy Policy
        </a>
        <a href="#" className="transition-colors hover:text-primary">
          Terms of Service
        </a>
        <a href="#" className="transition-colors hover:text-primary">
          Cookie Settings
        </a>
      </nav>
    </div>
  );
}
