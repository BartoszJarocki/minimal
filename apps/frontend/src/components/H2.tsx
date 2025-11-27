import React from "react";
import { cn } from "../lib/utils";

export const H2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-left text-2xl font-semibold tracking-tight md:text-3xl",
        className
      )}
    >
      {children}
    </h2>
  );
};
