import { Globe, CalendarDays, Printer, Layers } from "lucide-react";
import { H2 } from "../H2";

const features = [
  {
    icon: Globe,
    title: "26 languages",
    description: "Localized names, switch in one click",
  },
  {
    icon: CalendarDays,
    title: "Future years included",
    description: "No renewals, no extra cost",
  },
  {
    icon: Printer,
    title: "Ink-light PDFs",
    description: "Optimized for home printers",
  },
  {
    icon: Layers,
    title: "All formats",
    description: "A4, A5, Letter, portrait & landscape",
  },
];

export const ValueProp = () => {
  return (
    <section className="max-w-3xl">
      <H2>Everything included</H2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.title} className="space-y-1">
            <div className="flex items-center gap-2">
              <feature.icon className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{feature.title}</span>
            </div>
            <p className="pl-7 text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
