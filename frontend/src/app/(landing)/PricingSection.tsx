import { PricingCard } from "@/components/PricingCard";
import { TextShimmer } from "@/components/TextShimmer";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-8 sm:py-12 md:py-16">
      <div className="text-center px-4">
        <TextShimmer className="font-montserrat text-3xl/tight sm:text-4xl/normal md:text-5xl/relaxed lg:text-6xl/relaxed font-bold">
          Pricing
        </TextShimmer>
        <p className="mb-8 sm:mb-10 md:mb-12 text-sm sm:text-base text-neutral-100/60 max-w-xl mx-auto">
          Flexible plans designed to scale with your development needs
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 mx-auto max-w-xs sm:max-w-lg md:max-w-4xl px-4 sm:px-6">
        <PricingCard
          tier="Free"
          price="$0/mo"
          bestFor="Best for 1-5 users"
          CTA="Get started free"
          benefits={[
            { text: "One workspace", checked: true },
            { text: "Email support", checked: true },
            { text: "1 day data retention", checked: false },
            { text: "Custom roles", checked: false },
            { text: "Priority support", checked: false },
            { text: "SSO", checked: false },
          ]}
        />
        <PricingCard
          tier="Pro"
          price="$79/mo"
          bestFor="Best for 5-50 users"
          CTA="14-day free trial"
          benefits={[
            { text: "Five workspaces", checked: true },
            { text: "Email support", checked: true },
            { text: "7 day data retention", checked: true },
            { text: "Custom roles", checked: true },
            { text: "Priority support", checked: false },
            { text: "SSO", checked: false },
          ]}
        />
        <PricingCard
          tier="Enterprise"
          price="Contact us"
          bestFor="Best for 50+ users"
          CTA="Contact us"
          benefits={[
            { text: "Unlimited workspaces", checked: true },
            { text: "Email support", checked: true },
            { text: "30 day data retention", checked: true },
            { text: "Custom roles", checked: true },
            { text: "Priority support", checked: true },
            { text: "SSO", checked: true },
          ]}
        />
      </div>
    </section>
  );
}
