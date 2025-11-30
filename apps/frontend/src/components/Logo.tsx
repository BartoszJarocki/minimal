import { cn } from "../lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <svg
    className={cn("text-foreground", className)}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" fill="currentColor" />
    <text
      x="24"
      y="24"
      dominantBaseline="central"
      textAnchor="middle"
      fill="hsl(var(--background))"
      style={{ fontFamily: "var(--font-sans)", fontWeight: 900, fontSize: 32 }}
    >
      M
    </text>
  </svg>
);
