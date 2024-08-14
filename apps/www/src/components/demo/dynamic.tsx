import dynamic from 'next/dynamic';

export const KeyManagerDemo = dynamic(
  () => import('~/components/demo/key-manager').then((m) => m.KeyManagerDemo),
  {
    ssr: false,
  }
);
