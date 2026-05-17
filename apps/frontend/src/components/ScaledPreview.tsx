import { cn } from "../lib/utils";
import { toPrintClassName } from "../pages/print";
import { Format, Orientation } from "@minimal/config";

const scaledStylesLookup = {
  a4: {
    portrait: "h-[448px] w-[320px]",
    landscape: "h-[320px] w-[448px]",
  },
  a5: {
    portrait: "h-[320px] w-[224px]",
    landscape: "h-[224px] w-[320px]",
  },
  letter: {
    portrait: "h-[422px] w-[326px]",
    landscape: "h-[326px] w-[422px]",
  },
};

export const ScaledPreview = ({
  className,
  format,
  orientation,
  children,
  alt,
}: {
  className?: string;
  format: Format;
  orientation: Orientation;
  children: React.ReactNode;
  alt?: string;
}) => {
  return (
    <div
      className={scaledStylesLookup[format][orientation]}
      role="img"
      aria-label={alt}
    >
      <div
        className={cn(
          toPrintClassName(format, orientation),
          "m-auto origin-top-left scale-[40%] overflow-hidden bg-white p-4 text-foreground shadow-card transition-shadow hover:shadow-lg",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
