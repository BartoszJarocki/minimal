import { cn } from "../lib/utils";
import { toPrintClassName } from "../pages/print";
import { Format, FormatVariant } from "./calendar/Calendar";

const scaledStylesLookup = {
  a4: {
    portrait: "h-[448px] w-[320px]",
    landscape: "h-[320px] w-[448px]",
  },
  a5: {
    portrait: "h-[320px] w-[224px]",
    landscape: "h-[224px] w-[320px]",
  },
};

export const ScaledPreview = ({
  className,
  format,
  variant,
  children,
}: {
  className?: string;
  format: Format;
  variant: FormatVariant;
  children: React.ReactNode;
}) => {
  return (
    <div className={scaledStylesLookup[format][variant]}>
      <div
        className={cn(
          toPrintClassName(format, variant),
          "m-auto origin-top-left scale-[40%] overflow-hidden bg-white p-4 text-foreground shadow-card transition-shadow hover:shadow-lg",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
