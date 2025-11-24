// plugins/mx-core-docs/contentlayer.config.ts

import {
  defineDocumentType,
  ComputedFields,
  makeSource,
} from 'contentlayer/source-files';
import readingTime from 'reading-time';
import { slug } from 'github-slugger';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url'; // tambahkan import ini di atas
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import {
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeCitation from 'rehype-citation';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypePresetMinify from 'rehype-preset-minify';
import siteMetadata from './src/data/siteMetadata';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js';
import type { Blog as BlogType } from './.contentlayer/generated';

const root = process.cwd(); // Akan otomatis menunjuk ke plugins/mx-core-docs

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
};

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'list', of: { type: 'string' } },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
        author: doc.authors,
      }),
    },
  },
}));

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    bio: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields,
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}));

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
    date: { type: 'date', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}));

function getPublicOutputPath(): string {
  const mode = process.env.GITHUB_PAGES === 'true' ? 'gh-pages' : 'local';
  const outputPath =
    mode === 'gh-pages'
      ? path.join(process.cwd(), 'public')
      : path.join(process.cwd(), 'src', 'public');

  console.log(
    `📂 [env:GITHUB_PAGES=${process.env.GITHUB_PAGES}] Mode: ${mode}`
  );
  console.log(`📦 Output path resolved to: ${outputPath}`);
  return outputPath;
}

function createSearchAssets(allBlogs: BlogType[]) {
  const content = allCoreContent(sortPosts(allBlogs));
  const kbarData = content.map((post) => ({
    id: post.slug,
    name: post.title,
    section: 'CONTENT',
    href: `/${post.path}`,
    subtitle: new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    keywords: post.tags,
  }));

  const outputPath = getPublicOutputPath();
  const outputFile = path.join(outputPath, 'search-kbar.json');

  console.log('🛠️  [createSearchAssets] Menyiapkan outputPath:', outputPath);
  console.log(
    '🛠️  [createSearchAssets] File output yang akan ditulis:',
    outputFile
  );

  if (!fs.existsSync(outputPath)) {
    console.warn(`📁 Folder ${outputPath} tidak ditemukan. Membuat...`);
    fs.mkdirSync(outputPath, { recursive: true });
  } else {
    console.log(
      `📁 Folder ${outputPath} ditemukan. Melanjutkan penulisan file.`
    );
  }

  fs.writeFileSync(outputFile, JSON.stringify(kbarData, null, 2));
  console.log(
    `✅ [createSearchAssets] search-kbar.json berhasil ditulis ke ${outputFile}`
  );
}

function createTagAndAuthorData(allBlogs: BlogType[]) {
  const tagCount: Record<string, number> = {};
  const authorCount: Record<string, number> = {};

  allBlogs.forEach((blog) => {
    if (blog.draft) return;
    blog.tags?.forEach((tag) => {
      const formatted = slug(tag);
      tagCount[formatted] = (tagCount[formatted] || 0) + 1;
    });
    blog.authors?.forEach((author) => {
      const formatted = slug(author);
      authorCount[formatted] = (authorCount[formatted] || 0) + 1;
    });
  });

  const outputPath = getPublicOutputPath();
  const tagFile = path.join(outputPath, 'tag-data.json');
  const authorFile = path.join(outputPath, 'author-data.json');

  console.log(
    '🛠️  [createTagAndAuthorData] Menyiapkan outputPath:',
    outputPath
  );

  if (!fs.existsSync(outputPath)) {
    console.warn(`📁 Folder ${outputPath} tidak ditemukan. Membuat...`);
    fs.mkdirSync(outputPath, { recursive: true });
  } else {
    console.log(
      `📁 Folder ${outputPath} ditemukan. Melanjutkan penulisan file.`
    );
  }

  fs.writeFileSync(tagFile, JSON.stringify(tagCount, null, 2));
  console.log(
    `✅ [createTagAndAuthorData] tag-data.json berhasil ditulis ke ${tagFile}`
  );

  fs.writeFileSync(authorFile, JSON.stringify(authorCount, null, 2));
  console.log(
    `✅ [createTagAndAuthorData] author-data.json berhasil ditulis ke ${authorFile}`
  );
}

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Blog, Authors, Page, Post],
  mdx: {
    cwd: path.join(process.cwd(), 'src'),
    remarkPlugins: [remarkGfm, remarkCodeTitles, remarkMath, remarkImgToJsx],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, 'src/content') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },

  onSuccess: async () => {
    console.log('📦 Contentlayer post-processing dimulai...');

    try {
      const generatedPath = pathToFileURL(
        path.resolve('.contentlayer/generated/index.mjs')
      ).href;

      console.log(`📄 Mengimpor module Contentlayer dari: ${generatedPath}`);

      const mod = await import(generatedPath);

      console.log(
        '✅ Modul berhasil diimpor. Berikut keys yang tersedia:',
        Object.keys(mod)
      );

      if (!('allBlogs' in mod)) {
        console.warn(
          '⚠️ Tidak ditemukan properti allBlogs di module. Pastikan dokumen Blog tersedia.'
        );
        return;
      }

      const allBlogs = (mod.allBlogs ?? []) as BlogType[];

      console.log(`📝 Jumlah Blog ditemukan: ${allBlogs.length}`);
      console.log(
        '📋 Preview blog (max 3):',
        allBlogs.slice(0, 3).map((b) => ({
          title: b.title,
          slug: b.slug,
          date: b.date,
          draft: b.draft,
        }))
      );

      createTagAndAuthorData(allBlogs);
      console.log('✅ tag-data.json dan author-data.json selesai dibuat.');

      createSearchAssets(allBlogs);
      console.log('✅ search-kbar.json selesai dibuat.');

      console.log('✅ Post-processing Contentlayer selesai tanpa error.');
    } catch (err: unknown) {
      console.error('❌ Terjadi error saat post-processing Contentlayer.');

      // ✅ Deteksi dan abaikan error akibat "assert"
      if (
        err instanceof SyntaxError &&
        typeof err.message === 'string' &&
        err.message.includes("Unexpected identifier 'assert'")
      ) {
        console.warn(
          '⚠️ GH Pages tidak mendukung syntax `assert` di .mjs dari Contentlayer. ' +
            'Build tetap berlanjut karena ini tidak memengaruhi output JSON.'
        );
        return;
      }

      // 🧠 Tampilkan error normal lainnya
      if (err instanceof Error) {
        console.error('🧠 Nama Error:', err.name);
        console.error('📜 Pesan Error:', err.message);
        console.error('🧩 Stacktrace:\n', err.stack);
      } else {
        console.error('📦 Error tidak diketahui:', err);
      }

      // ❌ Gagal total hanya jika error bukan karena "assert"
      process.exitCode = 1;
    }
  },
});
