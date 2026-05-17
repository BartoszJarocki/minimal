function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function optional(name: string, fallback = ''): string {
  return process.env[name] ?? fallback;
}

export const env = {
  frontendUrl: optional('FRONTEND_URL', 'http://localhost:3000'),

  r2: () => ({
    accountId: required('R2_ACCOUNT_ID'),
    accessKeyId: required('R2_ACCESS_KEY_ID'),
    secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
    bucketName: optional('R2_BUCKET_NAME', 'minimal-downloads'),
  }),

  /**
   * Gumroad config. Returns null if not configured so callers can silently
   * skip uploads on machines without Gumroad set up.
   * GUMROAD_PRODUCTS_JSON is a JSON object mapping year → product id, e.g.
   *   {"2026":"abc","2027":"def","2028":"ghi"}
   */
  gumroad: (): {
    accessToken: string;
    productsByYear: Record<string, string>;
  } | null => {
    const token = process.env.GUMROAD_ACCESS_TOKEN;
    const productsJson = process.env.GUMROAD_PRODUCTS_JSON;
    if (!token || !productsJson) return null;
    try {
      const productsByYear = JSON.parse(productsJson) as Record<string, string>;
      return { accessToken: token, productsByYear };
    } catch {
      throw new Error('GUMROAD_PRODUCTS_JSON must be valid JSON: {"2026":"<id>",...}');
    }
  },
};
