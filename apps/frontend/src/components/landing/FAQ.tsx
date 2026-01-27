"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const FAQ_ITEMS: { question: string; answer: React.ReactNode }[] = [
  {
    question: "What file formats do I get?",
    answer: "PDF files, ready to print on any standard printer.",
  },
  {
    question: "Will this work with my printer?",
    answer: "Yes. Works with any home or office printer using A4 or A5 paper.",
  },
  {
    question: "Do future years cost extra?",
    answer: "No. Lifetime means all future years are included at no extra cost.",
  },
  {
    question: "What's your refund policy?",
    answer: "Digital product, no refunds.",
  },
  {
    question: "How do I get the files?",
    answer: (
      <>
        After purchase, you'll receive an email from Polar (our payment
        provider) with a link to your Polar account. There you'll find your
        license number—use it to access our customer portal at{" "}
        <Link href="/portal" className="underline hover:text-foreground">
          useminimal.com/portal
        </Link>{" "}
        where all downloads and habit tracker creators are available.
      </>
    ),
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section>
      <h2 className="mb-8 text-xl font-semibold tracking-tight md:text-2xl">
        Questions
      </h2>
      <div className="divide-y divide-foreground/10">
        {FAQ_ITEMS.map((item, index) => (
          <div key={index} className="py-4">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-base font-medium">{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
