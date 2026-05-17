import { Polar } from "@polar-sh/sdk";
import { env } from "./env";
import { serverEnv } from "./env.server";

export const polar = new Polar({
  accessToken: serverEnv.polarAccessToken(),
  server: env.isProduction ? "production" : "sandbox",
});
