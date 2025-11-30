import { JsonLd } from "./JsonLd";
import { LIFETIME_PRICE } from "../../lib/config";

interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
  image: string;
  inLanguage?: string;
}

export const ProductSchema = ({
  name,
  description,
  url,
  image,
  inLanguage,
}: ProductSchemaProps) => {
  // Extract numeric price from "$29"
  const price = LIFETIME_PRICE.replace(/[^0-9.]/g, "");

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    ...(inLanguage && { inLanguage }),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
    },
  };

  return <JsonLd data={data} />;
};
