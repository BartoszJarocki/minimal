import {
  CalendarVariant,
  parseVariant,
  variantToQuery,
  printUrl,
  effectiveWeekStartsOn,
  leadingBlankCount,
  trailingBlankCount,
  rotateWeekdays,
} from "@minimal/config";

const canonical: CalendarVariant = {
  type: "month",
  year: 2027,
  month: 6,
  locale: "fr",
  format: "a5",
  orientation: "landscape",
  weekStartsOn: 7,
  style: "frame",
  theme: "pixel",
};

describe("parseVariant / variantToQuery round-trip", () => {
  it("survives query encoding", () => {
    const query = variantToQuery(canonical);
    expect(parseVariant(query)).toEqual(canonical);
  });

  it("survives URLSearchParams round-trip", () => {
    const params = new URLSearchParams(variantToQuery(canonical));
    const parsed = Object.fromEntries(params.entries());
    expect(parseVariant(parsed)).toEqual(canonical);
  });
});

describe("parseVariant defaults (tolerant mode)", () => {
  it("returns sane defaults on empty input", () => {
    const v = parseVariant({});
    expect(v.type).toBe("year");
    expect(v.month).toBe(1);
    expect(v.locale).toBe("en");
    expect(v.format).toBe("a4");
    expect(v.orientation).toBe("portrait");
    expect(v.weekStartsOn).toBe(1);
    expect(v.style).toBe("default");
    expect(v.theme).toBe("editorial");
  });

  it("accepts known themes", () => {
    expect(parseVariant({ theme: "pixel" }).theme).toBe("pixel");
    expect(parseVariant({ theme: "editorial" }).theme).toBe("editorial");
    expect(parseVariant({ theme: "mono" }).theme).toBe("mono");
  });

  it("coerces unknown theme to editorial", () => {
    expect(parseVariant({ theme: "wireframe" }).theme).toBe("editorial");
  });

  it("accepts legacy 'simple' as editorial alias", () => {
    expect(parseVariant({ theme: "simple" }).theme).toBe("editorial");
  });

  it("rejects legacy 'simple' in strict mode", () => {
    expect(() => parseVariant({ theme: "simple" }, { strict: true })).toThrow(/theme/);
  });

  it("coerces invalid format to a4", () => {
    expect(parseVariant({ format: "a3" }).format).toBe("a4");
  });

  it("coerces invalid style to default", () => {
    expect(parseVariant({ style: "outline" }).style).toBe("default");
  });

  it("coerces invalid weekStartsOn to 1", () => {
    expect(parseVariant({ weekStartsOn: 0 }).weekStartsOn).toBe(1);
    expect(parseVariant({ weekStartsOn: "3" }).weekStartsOn).toBe(1);
  });

  it("falls back to en on unknown locale", () => {
    expect(parseVariant({ locale: "klingon" }).locale).toBe("en");
  });

  it("clamps out-of-range year to default", () => {
    expect(parseVariant({ year: 1999 }, { defaultYear: 2026 }).year).toBe(2026);
    expect(parseVariant({ year: 99999 }, { defaultYear: 2026 }).year).toBe(2026);
  });

  it("accepts month as numeric string", () => {
    expect(parseVariant({ month: "7" }).month).toBe(7);
  });
});

describe("parseVariant strict mode", () => {
  it("throws on invalid format", () => {
    expect(() => parseVariant({ format: "a3" }, { strict: true })).toThrow(/format/);
  });

  it("throws on invalid style", () => {
    expect(() => parseVariant({ style: "outline" }, { strict: true })).toThrow(/style/);
  });

  it("throws on invalid weekStartsOn", () => {
    expect(() => parseVariant({ weekStartsOn: 3 }, { strict: true })).toThrow(/weekStartsOn/);
  });

  it("throws on out-of-range year", () => {
    expect(() => parseVariant({ year: 1999 }, { strict: true })).toThrow(/year/);
  });

  it("throws on unknown locale", () => {
    expect(() => parseVariant({ locale: "klingon" }, { strict: true })).toThrow(/locale/);
  });

  it("throws on unknown theme", () => {
    expect(() => parseVariant({ theme: "wireframe" }, { strict: true })).toThrow(/theme/);
  });

  it("does not throw on omitted fields (uses defaults)", () => {
    expect(() => parseVariant({}, { strict: true })).not.toThrow();
  });
});

describe("parseVariant legacy `variant` alias", () => {
  it("accepts ?variant=portrait as orientation", () => {
    expect(parseVariant({ variant: "landscape" }).orientation).toBe("landscape");
  });

  it("prefers explicit orientation over legacy variant", () => {
    expect(
      parseVariant({ variant: "landscape", orientation: "portrait" }).orientation
    ).toBe("portrait");
  });
});

describe("printUrl", () => {
  it("builds expected URL", () => {
    const url = printUrl("http://localhost:3000", canonical);
    expect(url).toContain("http://localhost:3000/print?");
    expect(url).toContain("type=month");
    expect(url).toContain("year=2027");
    expect(url).toContain("orientation=landscape");
    expect(url).toContain("weekStartsOn=7");
    expect(url).toContain("style=frame");
  });
});

describe("effectiveWeekStartsOn", () => {
  it("uses override when present", () => {
    expect(
      effectiveWeekStartsOn(7, { weekStartsOn: 1 } as any)
    ).toBe(7);
  });

  it("falls back to locale default", () => {
    expect(effectiveWeekStartsOn(undefined, { weekStartsOn: 7 } as any)).toBe(7);
  });

  it("defaults to 1 when neither available", () => {
    expect(effectiveWeekStartsOn(undefined, undefined)).toBe(1);
  });
});

describe("weekday helpers", () => {
  // Luxon weekday: 1=Mon..7=Sun
  it("leadingBlankCount: Monday-start", () => {
    expect(leadingBlankCount(1, 1)).toBe(0); // Mon is column 0
    expect(leadingBlankCount(7, 1)).toBe(6); // Sun is column 6
  });

  it("leadingBlankCount: Sunday-start", () => {
    expect(leadingBlankCount(7, 7)).toBe(0); // Sun is column 0
    expect(leadingBlankCount(1, 7)).toBe(1); // Mon is column 1
    expect(leadingBlankCount(6, 7)).toBe(6); // Sat is column 6
  });

  it("trailingBlankCount complements leading", () => {
    for (let wd = 1; wd <= 7; wd++) {
      expect(leadingBlankCount(wd, 1) + trailingBlankCount(wd, 1)).toBe(6);
      expect(leadingBlankCount(wd, 7) + trailingBlankCount(wd, 7)).toBe(6);
    }
  });

  it("rotateWeekdays: Monday-start preserves order", () => {
    expect(rotateWeekdays(["M", "T", "W", "T", "F", "S", "S"], 1)).toEqual([
      "M", "T", "W", "T", "F", "S", "S",
    ]);
  });

  it("rotateWeekdays: Sunday-start moves Sunday to front", () => {
    expect(rotateWeekdays(["M", "T", "W", "T", "F", "S", "S"], 7)).toEqual([
      "S", "M", "T", "W", "T", "F", "S",
    ]);
  });
});
