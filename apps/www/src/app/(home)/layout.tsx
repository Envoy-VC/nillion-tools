import type { ReactNode } from 'react';

import { baseOptions } from '~/lib/fumadocs';
import { baseUrl, createMetadata } from '~/lib/metadata';

import { HomeLayout } from 'fumadocs-ui/home-layout';
import type { Viewport } from 'next';

import { Footer } from '~/components/fumadocs';

export const metadata = createMetadata({
  title: {
    template: '%s | Nillion Tools',
    default: 'Nillion Tools',
  },
  description: 'The Next.js framework for building documentation sites',
  metadataBase: baseUrl,
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <HomeLayout {...baseOptions}>
      {children}
      <Footer />
    </HomeLayout>
  );
};

export default Layout;
