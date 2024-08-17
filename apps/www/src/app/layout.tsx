import { baseUrl, createMetadata } from '~/lib/metadata';

import 'fumadocs-ui/twoslash.css';
import type { Viewport } from 'next';
import '~/styles/globals.css';

import { Body } from '~/components/fumadocs/body';
import { Toaster } from '~/components/ui/sonner';

import { Provider } from './provider';

export const metadata = createMetadata({
  title: {
    template: '%s | Nillion Tools',
    default: 'Nillion Tools',
  },
  description:
    'A developer-centric toolkit that simplifies building on the Nillion network.',
  metadataBase: baseUrl,
  icons: [{ rel: 'icon', url: '/favicon.png' }],
  keywords: [
    'Nillion Tools',
    'Nillion',
    'API',
    'SDK',
    'Documentation',
    'Tutorial',
    'Next.js',
    'React',
    'Cryptography',
    'WebAuthn',
  ],
  creator: 'Vedant Chainani',
  publisher: 'Vedant Chainani',
  other: {
    'msapplication-tap-highlight': 'no',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Gymkhana Technical',
    'msapplication-TileColor': '#fff',
  },
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <Body>
        <Provider>{children}</Provider>
        <Toaster />
      </Body>
    </html>
  );
};

export default RootLayout;
