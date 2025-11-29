import { SOCIAL_PROOF } from "../../lib/config";

export const SocialProof = () => {
  return (
    <section>
      <div className="max-w-2xl space-y-10">
        <blockquote className="space-y-4 border-l-2 border-foreground/20 pl-6">
          <p className="text-xl leading-relaxed text-foreground md:text-2xl">
            &ldquo;{SOCIAL_PROOF.review.quote}&rdquo;
          </p>
          <footer className="text-sm text-muted-foreground">
            — {SOCIAL_PROOF.review.author}
          </footer>
        </blockquote>

        <div className="flex gap-12 md:gap-16">
          {SOCIAL_PROOF.metrics.map((metric) => (
            <div key={metric.label} className="space-y-0.5">
              <span className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {metric.value}
              </span>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
