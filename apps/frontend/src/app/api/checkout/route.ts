import { Checkout } from "@polar-sh/nextjs";
import { env } from "../../../lib/env";
import { serverEnv } from "../../../lib/env.server";

export const GET = Checkout({
  accessToken: serverEnv.polarAccessToken(),
  successUrl: `${env.siteUrl}/portal?success=true`,
  server: env.isProduction ? "production" : "sandbox",
});
