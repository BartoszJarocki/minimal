// Public env values — safe to import from anywhere (client or server).
// Server-only secrets live in env.server.ts.
//
// IMPORTANT: NEXT_PUBLIC_* envs must be accessed as STATIC property reads
// (e.g. `process.env.NEXT_PUBLIC_X`) for Next.js to inline them at build
// time. Dynamic bracket-key access (`process.env[name]`) produces undefined
// in the client bundle.

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
  polarProductId: process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID || "",
  gumroadUrl:
    process.env.NEXT_PUBLIC_GUMROAD_URL || "https://bjarocki.gumroad.com",
  isProduction: process.env.NODE_ENV === "production",
};
