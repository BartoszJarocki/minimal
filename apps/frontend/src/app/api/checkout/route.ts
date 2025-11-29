import { Checkout } from "@polar-sh/nextjs";

const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  successUrl: `${baseUrl}/portal?success=true`,
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
});
