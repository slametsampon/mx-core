// app/page.tsx

import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import siteMetadata from '@/data/siteMetadata';
import Tag from '@/components/Tag';

const MAX_DISPLAY = 5;

export default function Home() {
  const sorted = sortPosts(allBlogs);
  const posts = allCoreContent(sorted).slice(0, MAX_DISPLAY);

  return (
    <div className="space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-4 pt-6 md:space-y-5">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-[1.2]">
          {siteMetadata.title}
        </h1>
        <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
          Platform dokumentasi & blog berbasis <strong>Next.js</strong> +{' '}
          <strong>Markdown</strong>
          untuk{' '}
          <span className="font-semibold text-green-700 dark:text-green-300">
            engineer, teknisi, & profesional industri
          </span>
          . Cocok untuk menulis{' '}
          <i>design spec, HAZOP, S-Curve, estimation, JSA</i>, dan lainnya.
        </p>
        <p className="text-md italic text-gray-500 dark:text-gray-400">
          📁 Topik mencakup: AI · Design · Maintenance · Project · Safety
        </p>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {posts.map((post) => (
          <li key={post.slug} className="py-6">
            <article>
              <div className="space-y-2">
                <div>
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={post.date}>{post.date}</time>
                    </dd>
                  </dl>
                  <h2 className="text-2xl font-bold leading-8 tracking-tight">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-gray-900 dark:text-gray-100"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <div className="mt-2 flex flex-wrap">
                    {post.tags?.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
                <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                  {post.summary}
                </div>
                <div className="text-base font-medium leading-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Baca selengkapnya →
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {allBlogs.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          >
            Lihat semua postingan →
          </Link>
        </div>
      )}
    </div>
  );
}
