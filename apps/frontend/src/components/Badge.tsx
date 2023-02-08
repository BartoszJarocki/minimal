import { PropsWithChildren } from "react";

export const Badge = ({ children }: PropsWithChildren) => {
  return (
    <span className="inline-flex items-center rounded-md bg-gray-300 px-2.5 py-0.5 text-sm font-medium text-gray-800">
      {children}
    </span>
  );
};
