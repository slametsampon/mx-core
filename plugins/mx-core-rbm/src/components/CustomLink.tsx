// plugins/mx-core-metric/src/app/components/CustomLink.tsx

'use client';

import Link from 'next/link';
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';

type CustomLinkProps = {
  href: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

/**
 * CustomLink - Mendukung internal dan eksternal link dengan pengelolaan otomatis.
 * Gunakan ini untuk semua link dalam aplikasi.
 */
const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ href, children, ...rest }, ref) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');

    if (isInternal) {
      return (
        <Link href={href} passHref legacyBehavior>
          <a ref={ref} {...rest}>
            {children}
          </a>
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }
);

CustomLink.displayName = 'CustomLink';

export default CustomLink;
