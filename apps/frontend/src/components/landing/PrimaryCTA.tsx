import Link from "next/link";
import { Button } from "../ui/button";
import { LIFETIME_BUY_URL, LIFETIME_PRICE } from "../../lib/config";

interface PrimaryCTAProps {
  variant?: "hero" | "bottom";
}

export const PrimaryCTA = ({ variant = "hero" }: PrimaryCTAProps) => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-2xl space-y-6">
        {variant === "bottom" && (
          <>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              One purchase. Every calendar. Forever.
            </h2>
            <p className="text-lg text-muted-foreground">
              Get lifetime access to all calendars and habit trackers. Includes
              all future years and new products.
            </p>
          </>
        )}

        <div className="space-y-3">
          <Button variant="cta" size="cta" asChild>
            <Link href={LIFETIME_BUY_URL}>
              Get Lifetime Access — {LIFETIME_PRICE}
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">One-time payment</p>
        </div>
      </div>
    </section>
  );
};
