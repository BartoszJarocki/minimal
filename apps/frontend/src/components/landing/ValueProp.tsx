export const ValueProp = () => {
  const benefits = [
    "All current and future calendars",
    "Habit trackers included",
    "26 languages, multiple formats",
    "Lifetime updates",
  ];

  return (
    <section className="py-12 md:py-16">
      <ul className="max-w-xl space-y-3 text-muted-foreground">
        {benefits.map((benefit) => (
          <li key={benefit} className="text-base">
            {benefit}
          </li>
        ))}
      </ul>
    </section>
  );
};
