import clsx from "clsx";
import React from "react";

export const P = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={clsx("text-left text-lg opacity-80", className)}>
      {children}
    </p>
  );
};
