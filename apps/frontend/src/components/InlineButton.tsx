import React from "react";

export const InlineButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      className="inline text-zinc-700 underline hover:text-zinc-900"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
