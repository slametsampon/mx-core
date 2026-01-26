// plugins/mx-core-docs/src/components/Link.tsx

/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const CustomLink = ({ href, ...rest }: AnchorProps) => {
  if (!href) {
    return <a {...rest} />;
  }

  const isInternalLink = href.startsWith('/');
  const isAnchorLink = href.startsWith('#');

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest} />
      </Link>
    );
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};

export default CustomLink;
