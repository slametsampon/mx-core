// plugins/mx-core-docs/src/app/sitemap.ts

import { allBlogs } from '../../.contentlayer/generated';
import type { MetadataRoute } from 'next';
import siteMetadata from '@/data/siteMetadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteMetadata.siteUrl.replace(/\/$/, '');

  // 1️⃣ Dynamic routes (blog / contentlayer)
  const blogRoutes = allBlogs
    .filter((blog) => blog.draft !== true)
    .map((blog) => ({
      url: `${baseUrl}/${blog._raw.flattenedPath}`,
      lastModified: blog.lastmod ?? blog.date,
    }));

  // 2️⃣ Static routes (manual, sesuai app/)
  const staticRoutes = [
    '/', // home
    '/blog', // blog index
    '/posts',
    '/tags',
    '/author',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  // 3️⃣ Gabungkan
  return [...staticRoutes, ...blogRoutes];
}
