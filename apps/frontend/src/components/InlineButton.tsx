import React from "react";
import { cn } from "../lib/utils";

export const InlineButton = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={cn(
        "inline text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
