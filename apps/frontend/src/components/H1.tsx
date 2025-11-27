import React from "react";
import { cn } from "../lib/utils";

export const H1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        "text-balance text-4xl font-semibold leading-none tracking-tight md:text-6xl",
        className
      )}
    >
      {children}
    </h1>
  );
};
