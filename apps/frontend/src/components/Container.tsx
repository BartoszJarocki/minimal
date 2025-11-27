import { cn } from "../lib/utils";

export const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className={cn(
        "mx-auto min-h-screen max-w-5xl overflow-x-hidden px-4 py-20 md:px-8 md:py-32"
      )}
    >
      {children}
    </div>
  );
};
