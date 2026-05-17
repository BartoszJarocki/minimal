import { formatPrice, LIFETIME_PRODUCT } from "../lifetimeProduct";

describe("formatPrice", () => {
  it("formats integer USD with $ and no decimals", () => {
    expect(formatPrice(19, "USD")).toBe("$19");
  });

  it("respects different currencies", () => {
    expect(formatPrice(19, "EUR")).toMatch(/€/);
  });

  it("rounds half away from zero", () => {
    // maximumFractionDigits: 0
    expect(formatPrice(19.49, "USD")).toBe("$19");
    expect(formatPrice(19.5, "USD")).toBe("$20");
  });
});

describe("LIFETIME_PRODUCT", () => {
  it("has matching priceAmount and displayPrice", () => {
    expect(LIFETIME_PRODUCT.displayPrice).toBe(
      formatPrice(LIFETIME_PRODUCT.priceAmount, LIFETIME_PRODUCT.priceCurrency)
    );
  });

  it("priceAmount is 19 USD", () => {
    expect(LIFETIME_PRODUCT.priceAmount).toBe(19);
    expect(LIFETIME_PRODUCT.priceCurrency).toBe("USD");
  });
});
