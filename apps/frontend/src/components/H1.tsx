import clsx from "clsx";
import React from "react";

export const H1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={clsx(
        "text-4xl font-bold leading-none tracking-tighter md:text-7xl",
        className
      )}
    >
      {children}
    </h1>
  );
};
