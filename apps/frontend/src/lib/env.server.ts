// NOTE: do NOT add `import "server-only"` here. This module is imported by
// Pages Router API routes (pages/api/portal/*), and the server-only package's
// RSC detection misfires in that bundling context — it throws "This module
// cannot be imported from a Client Component module" and 500s the route.
// These getters are only ever called from server code anyway.

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function optional(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}

export const serverEnv = {
  polarAccessToken: () => required("POLAR_ACCESS_TOKEN"),
  polarOrganizationId: () => required("POLAR_ORGANIZATION_ID"),

  r2: () => ({
    accountId: required("R2_ACCOUNT_ID"),
    accessKeyId: required("R2_ACCESS_KEY_ID"),
    secretAccessKey: required("R2_SECRET_ACCESS_KEY"),
    bucketName: optional("R2_BUCKET_NAME", "minimal-downloads"),
  }),
};
