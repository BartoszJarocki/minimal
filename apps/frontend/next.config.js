module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => [
    {
      source: "/sitemap.xml",
      destination: "/api/sitemap",
    },
  ],
};
