import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://fumadocs.vercel.app',
      images: '/banner.png',
      siteName: 'Fumadocs',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@Envoy_1084',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/banner.png',
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? new URL('http://localhost:3000')
    : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe
      new URL(`https://${process.env.VERCEL_URL!}`);
