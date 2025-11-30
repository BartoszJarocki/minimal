import React from "react";
import { cn } from "../lib/utils";

export const P = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-balance text-left text-lg leading-relaxed text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
};
