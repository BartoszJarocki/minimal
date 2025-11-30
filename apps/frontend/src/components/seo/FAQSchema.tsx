import { JsonLd } from "./JsonLd";
import type { FAQEntry } from "../../lib/pseoContent";

interface FAQSchemaProps {
  items: FAQEntry[];
}

export const FAQSchema = ({ items }: FAQSchemaProps) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
};
