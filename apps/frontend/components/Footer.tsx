// apps/frontend/components/Footer.tsx

import CustomLink from './CustomLink';
import siteMetadata from '@/data/siteMetadata';
import SocialIcon from '@/components/social-icons';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto w-full px-4 py-3 sm:px-6 lg:px-8">
        {/* Social Icons */}
        <div className="mb-4 flex justify-center space-x-4">
          <SocialIcon
            kind="mail"
            href={`mailto:${siteMetadata.email}`}
            size={6}
          />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
        </div>

        {/* Footer Text & Links */}
        <div className="mb-4 text-center">
          <section className="mt-1 border-t pt-1 text-sm text-gray-500">
            Powered by <strong>MX-Core</strong> • Modular Digital Ecosystem for
            Industry
          </section>

          <div className="mt-2 flex flex-wrap justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{siteMetadata.author}</span>
            <span>•</span>
            <span>© {new Date().getFullYear()}</span>
            <span>•</span>
            <CustomLink
              href={siteMetadata.siteRepo}
              className="text-blue-600 underline transition-colors duration-200 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              aria-label="Source code on GitHub"
            >
              {siteMetadata.title}
              <span> V-</span>
              {siteMetadata.version}
            </CustomLink>
            <span>•</span>
            <CustomLink
              href="/about"
              className="text-blue-600 underline transition-colors duration-200 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              aria-label="About page"
            >
              About
            </CustomLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
