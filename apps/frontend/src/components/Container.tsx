import clsx from "clsx";
import { Fonts } from "../lib/fonts";

const font = Fonts["inter"];

export const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className={clsx(
        font.className,
        "mx-auto min-h-screen max-w-7xl overflow-x-hidden py-24 px-2"
      )}
    >
      {children}
    </div>
  );
};
