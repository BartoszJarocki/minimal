/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://useminimal.com",
  generateRobotsTxt: true,
  exclude: ["/print", "/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/print", "/api/"],
      },
    ],
  },
};
