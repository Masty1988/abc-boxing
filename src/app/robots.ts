import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://abc-boxing.fr";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/taz/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
