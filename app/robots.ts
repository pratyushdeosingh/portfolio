import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/_next/'
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: '/_next/'
      }
    ],
    sitemap: 'https://pratyushdeosingh.netlify.app/sitemap.xml'
  };
}
