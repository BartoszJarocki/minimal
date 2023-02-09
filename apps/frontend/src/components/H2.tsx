import clsx from "clsx";
import React from "react";

export const H2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={clsx("text-left text-3xl font-semibold", className)}>
      {children}
    </h2>
  );
};
