module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@minimal/config"],
  experimental: {
    scrollRestoration: true,
  },
  rewrites: async () => [
    {
      source: "/sitemap.xml",
      destination: "/api/sitemap",
    },
  ],
};
