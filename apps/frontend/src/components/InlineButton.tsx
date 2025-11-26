import React from "react";
import clsx from "clsx";

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
      className={clsx("inline text-zinc-700 underline hover:text-zinc-900", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
