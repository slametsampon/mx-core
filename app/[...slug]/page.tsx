// app/[...slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { allPages } from 'contentlayer/generated';

import { Mdx } from '@/components/mdx-components';

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps['params']) {
  const slug = params?.slug?.join('/');
  const page = allPages.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split('/'),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <article className="prose prose-slate mx-auto max-w-4xl px-4 py-3 dark:prose-invert sm:px-6 lg:px-8">
      <h1 className="mb-2">{page.title}</h1>
      {page.description && (
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          {page.description}
        </p>
      )}
      <Mdx code={page.body.code} />
    </article>
  );
}
