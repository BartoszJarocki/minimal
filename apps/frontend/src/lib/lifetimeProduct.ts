import { env } from "./env";

const PRICE_AMOUNT = 19;
const PRICE_CURRENCY = "USD" as const;

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const LIFETIME_PRODUCT = {
  polarProductId: env.polarProductId,
  priceAmount: PRICE_AMOUNT,
  priceCurrency: PRICE_CURRENCY,
  displayPrice: formatPrice(PRICE_AMOUNT, PRICE_CURRENCY),
};

export async function startCheckout(eventTag?: string) {
  if (eventTag) {
    const { track } = await import("@vercel/analytics");
    track("buy_attempt", { variant: eventTag });
  }
  window.location.href = `/api/checkout?products=${LIFETIME_PRODUCT.polarProductId}`;
}
