// plugins/mx-core-docs/src/types/siteMetadata.d.ts

declare module '@/data/siteMetadata' {
  const siteMetadata: {
    siteUrl: string;
    socialBanner?: string;
    [key: string]: any;
  };
  export default siteMetadata;
}
