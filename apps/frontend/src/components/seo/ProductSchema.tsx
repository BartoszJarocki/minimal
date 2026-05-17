import { JsonLd } from "./JsonLd";
import { LIFETIME_PRODUCT } from "../../lib/lifetimeProduct";

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
      price: LIFETIME_PRODUCT.priceAmount,
      priceCurrency: LIFETIME_PRODUCT.priceCurrency,
      availability: "https://schema.org/InStock",
      url,
    },
  };

  return <JsonLd data={data} />;
};
