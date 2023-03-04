import clsx from "clsx";
import { toPrintClassName } from "../pages/print";
import { Format, FormatVariant } from "./calendar/Calendar";

const scaledStylesLookup = {
  a4: {
    portrait: "h-[336px] w-[240px]",
    landscape: "h-[240px] w-[336px]",
  },
  a5: {
    portrait: "h-[240px] w-[168px]",
    landscape: "h-[168px] w-[240px]",
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
        className={clsx(
          toPrintClassName(format, variant),
          "m-auto origin-top-left scale-[30%] overflow-hidden bg-white p-4 text-zinc-900 shadow-xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
