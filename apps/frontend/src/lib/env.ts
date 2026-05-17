// Public env values — safe to import from anywhere (client or server).
// Server-only secrets live in env.server.ts.

function optional(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}

export const env = {
  siteUrl: optional("NEXT_PUBLIC_URL", "http://localhost:3000"),
  polarProductId: optional("NEXT_PUBLIC_POLAR_PRODUCT_ID"),
  isProduction: process.env.NODE_ENV === "production",
};
