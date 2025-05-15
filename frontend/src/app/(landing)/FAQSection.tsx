import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TextShimmer } from "../../components/TextShimmer";
import Link from "next/link";

const FAQSection = () => {
  const [faqItems] = useState([
    {
      id: "faq-1",
      question: "What is shadcnblocks?",
      answer:
        "shadcnblocks is a collection of ready-to-use block components built on top of shadcn/ui, designed to help you build beautiful websites faster.",
    },
    {
      id: "faq-2",
      question: "How do I install shadcnblocks?",
      answer:
        "shadcnblocks components are designed to be copied and pasted into your project. Simply browse the components, click on the one you want to use, and copy the code directly into your project. This gives you full control over the code and allows for easy customization.",
    },
    {
      id: "faq-3",
      question: "Is shadcnblocks free to use?",
      answer:
        "Yes, shadcnblocks is open-source and free to use in both personal and commercial projects. You can customize and modify the blocks to suit your needs.",
    },
    {
      id: "faq-4",
      question: "Can I customize the blocks?",
      answer:
        "Absolutely! All blocks are built with customization in mind. You can modify the styling, content, and behavior through props and Tailwind CSS classes.",
    },
    {
      id: "faq-5",
      question: "Do you offer support?",
      answer:
        "Yes, we provide support through our GitHub repository where you can report issues, suggest features, or ask questions about implementation.",
    },
  ]);

  return (
    <section id="faq" className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 space-y-8 sm:space-y-10 md:space-y-12">
        {/* Header */}
        <div className="text-center">
          <TextShimmer className="font-montserrat text-3xl/tight sm:text-4xl/normal md:text-5xl/relaxed lg:text-6xl/relaxed font-bold">
            Frequently Asked Questions
          </TextShimmer>
          <p className="mt-2 mb-4 sm:mb-6 text-sm sm:text-base text-neutral-100/60 max-w-xl mx-auto">
            Everything you need to know about arqit
          </p>
        </div>

        {/* FAQ Accordion - Modified: Added flex and items-center to AccordionTrigger */}
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
        >
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-neutral-700"
            >
              <AccordionTrigger className="flex items-center transition-opacity duration-200 hover:no-underline hover:opacity-70 py-3 sm:py-4">
                <div className="font-medium text-sm sm:text-base md:text-lg text-neutral-200 text-left">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base md:text-lg text-neutral-400">
                <div className="pb-3 sm:pb-4">{item.answer}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Support Section - Modified: Added gradient bg and shortened text with bigger font */}
        <div className="mx-auto flex max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl flex-col items-center rounded-md sm:rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 sm:p-8 text-center">
          <TextShimmer className="font-montserrat text-2xl/tight sm:text-3xl/normal md:text-4xl/relaxed font-semibold mb-4 sm:mb-6 md:mb-8">
            Build your app today
          </TextShimmer>

          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-neutral-200 text-neutral-900 hover:bg-neutral-300">
              <Link href="/">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
