export const ValueProp = () => {
  const benefits = [
    { title: "26 languages", proof: "localized names, switch in one click" },
    { title: "Future years included", proof: "no renewals, no extra cost" },
    { title: "Ink-light PDFs", proof: "optimized for home printers" },
    { title: "All formats", proof: "A4, A5, portrait, landscape" },
  ];

  return (
    <section className="py-12 md:py-16">
      <ul className="max-w-xl space-y-3">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="text-base">
            <span className="font-medium">{benefit.title}</span>
            <span className="text-muted-foreground"> — {benefit.proof}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
