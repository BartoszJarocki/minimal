import { getPSEOContent } from "../pseoContent";

describe("getPSEOContent", () => {
  it("returns complete content for canonical (year, locale)", () => {
    const content = getPSEOContent({ year: 2027, locale: "en" });
    expect(content.pageTitle).toBeTruthy();
    expect(content.metaDescription).toBeTruthy();
    expect(content.h1).toBeTruthy();
    expect(content.bestFor).toBeTruthy();
    expect(content.cta).toBeTruthy();
    expect(content.bullets.length).toBeGreaterThan(0);
  });

  it("interpolates year and language", () => {
    const content = getPSEOContent({ year: 2028, locale: "fr" });
    expect(content.pageTitle).toContain("2028");
    expect(content.metaDescription).toContain("2028");
  });

  it("handles unknown locales by falling back to default content", () => {
    const content = getPSEOContent({ year: 2027, locale: "xx" });
    expect(content.pageTitle).toBeTruthy();
    expect(content.h1).toBeTruthy();
  });

  it("returns FAQ entries", () => {
    const content = getPSEOContent({ year: 2027, locale: "en" });
    expect(Array.isArray(content.faq)).toBe(true);
    expect(content.faq.length).toBeGreaterThan(0);
  });

  it("merges intent overrides", () => {
    const monthly = getPSEOContent({ year: 2027, locale: "en", intent: "monthly" });
    const baseline = getPSEOContent({ year: 2027, locale: "en" });
    // Intent should change something — at minimum pageTitle or h1
    expect(
      monthly.pageTitle !== baseline.pageTitle || monthly.h1 !== baseline.h1
    ).toBe(true);
  });
});
