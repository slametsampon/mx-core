// plugins/mx-core-docs/src/app/page.tsx

import Link from 'next/link';
import { allBlogs } from '../../.contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import Tag from '@/components/Tag';

const MAX_DISPLAY = 5;

export default function Home() {
  const sortedPosts = allCoreContent(sortPosts(allBlogs)).slice(0, MAX_DISPLAY);

  return (
    <section className="relative">
      {/* Hero Section */}
      <div className="relative z-10 mb-12 mt-10 text-center">
        <h1 className="bg-gradient-to-r from-slate-700 via-cyan-500 to-blue-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent dark:from-slate-100 dark:via-cyan-300 dark:to-blue-400 sm:text-6xl">
          MxCore: Industrial Knowledge Platform
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
          Sistem dokumentasi dan blog modern berbasis{' '}
          <span className="font-medium text-cyan-600 dark:text-cyan-400">
            Next.js
          </span>{' '}
          &{' '}
          <span className="font-medium text-cyan-600 dark:text-cyan-400">
            Markdown
          </span>{' '}
          untuk sektor{' '}
          <strong className="text-sky-700 dark:text-cyan-300">
            engineering, project, safety, dan maintenance
          </strong>
          .
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Built with ❤️ for engineers, by engineers.
        </p>
      </div>

      {/* Topics Preview */}
      <div className="mb-10 flex flex-wrap justify-center gap-3 text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {['AI', 'Design', 'Project', 'Maintenance', 'Safety'].map((topic) => (
          <span
            key={topic}
            className="rounded border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 dark:border-cyan-800 dark:bg-slate-900 dark:text-cyan-300"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Latest Posts */}
      <div className="mx-auto max-w-4xl space-y-10">
        <ul className="space-y-10">
          {sortedPosts.map((post) => (
            <li
              key={post.slug}
              className="transition-all duration-300 hover:-translate-y-1 hover:opacity-95"
            >
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </div>
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-cyan-500 dark:hover:text-cyan-300"
                  >
                    {post.title}
                  </Link>
                </h2>
                <div className="mt-2 text-slate-600 dark:text-slate-300">
                  {post.summary}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block text-sm font-semibold text-sky-600 hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
                  >
                    Baca selengkapnya →
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Link to All Posts */}
        {allBlogs.length > MAX_DISPLAY && (
          <div className="flex justify-center">
            <Link
              href="/blog"
              className="rounded bg-sky-600 px-6 py-2 text-sm font-medium text-white shadow hover:bg-cyan-600"
            >
              Lihat Semua Postingan →
            </Link>
          </div>
        )}
      </div>

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-72 bg-gradient-to-r from-[#0EA5E933] via-[#22D3EE33] to-[#2563EB33] blur-3xl" />
    </section>
  );
}
