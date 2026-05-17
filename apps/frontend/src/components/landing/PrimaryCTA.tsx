import { Button } from "../ui/button";
import { LIFETIME_PRODUCT, startCheckout } from "../../lib/lifetimeProduct";

interface PrimaryCTAProps {
  variant?: "hero" | "bottom";
}

export const PrimaryCTA = ({ variant = "hero" }: PrimaryCTAProps) => {
  return (
    <section>
      <div className="max-w-2xl space-y-6">
        {variant === "bottom" && (
          <>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              One purchase. Every calendar. Forever.
            </h2>
            <p className="text-lg text-muted-foreground">
              All calendars, habit trackers, and future years included. Instant
              PDF download. Digital product — no refunds.
            </p>
          </>
        )}

        <div>
          <Button
            variant="cta"
            size="cta"
            onClick={() => startCheckout(variant)}
            className="flex flex-col"
          >
            <span>Get lifetime access — {LIFETIME_PRODUCT.displayPrice}</span>
            <span className="font-mono text-xs font-normal opacity-80">
              One-time payment, no subscription
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
