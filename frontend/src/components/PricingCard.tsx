import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface BenefitProps {
  text: string;
  checked: boolean;
}

const Benefit = ({ text, checked }: BenefitProps) => {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <span className="grid h-6 w-6 place-content-center rounded-full bg-neutral-200 text-sm text-neutral-900">
          <Check className="h-4 w-4" />
        </span>
      ) : (
        <span className="grid h-6 w-6 place-content-center rounded-full bg-neutral-700 text-sm text-neutral-400">
          <X className="h-4 w-4" />
        </span>
      )}
      <span className="text-sm text-neutral-300">{text}</span>
    </div>
  );
};

interface PricingCardProps {
  tier: string;
  price: string;
  bestFor: string;
  CTA: string;
  benefits: Array<{ text: string; checked: boolean }>;
  className?: string;
}

export const PricingCard = ({
  tier,
  price,
  bestFor,
  CTA,
  benefits,
  className = "",
}: PricingCardProps) => {
  return (
    <motion.div
      initial={{ filter: "blur(2px)" }}
      whileInView={{ filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.25 }}
      className="h-full w-full"
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-lg border border-neutral-700 bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 shadow-lg ${className}`}
      >
        <div className="flex flex-col items-center border-b border-neutral-700 pb-6">
          <span className="mb-6 inline-block text-neutral-100">{tier}</span>
          <span className="mb-3 inline-block text-4xl font-medium text-neutral-50">
            {price}
          </span>
          <span className="bg-gradient-to-br from-neutral-400 to-neutral-200 bg-clip-text text-center text-transparent">
            {bestFor}
          </span>
        </div>
        <div className="space-y-4 py-9">
          {benefits.map((benefit, idx) => (
            <Benefit key={idx} {...benefit} />
          ))}
        </div>
        <button
          className={`w-full rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tier === "Pro"
              ? "bg-neutral-50 text-neutral-900 hover:bg-neutral-200"
              : "bg-transparent text-neutral-300 hover:bg-neutral-600"
          }`}
        >
          {CTA}
        </button>
      </div>
    </motion.div>
  );
};
