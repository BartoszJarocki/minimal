import { JsonLd } from "./JsonLd";

export const OrganizationSchema = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Minimal",
    url: "https://useminimal.com",
    logo: "https://useminimal.com/logo.png",
    sameAs: ["https://twitter.com/UseMinimal"],
    description:
      "Minimal creates beautiful, minimalist printable calendars and habit trackers.",
  };

  return <JsonLd data={data} />;
};
