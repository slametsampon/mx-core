// plugins/mx-core-docs/src/app/sitemap.ts

import { allBlogs } from '../../.contentlayer/generated';
import type { MetadataRoute } from 'next';
import siteMetadata from '@/data/siteMetadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteMetadata.siteUrl.replace(/\/$/, '');

  const blogs = allBlogs
    .filter((blog) => blog.draft !== true)
    .map((blog) => ({
      url: `${baseUrl}/${blog._raw.flattenedPath}`,
      lastModified: blog.lastmod ?? blog.date,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...blogs,
  ];
}
