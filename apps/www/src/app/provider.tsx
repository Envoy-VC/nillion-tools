'use client';

import type { ReactNode } from 'react';

import { RootProvider } from 'fumadocs-ui/provider';
import { QueryProvider } from '~/providers';

export const Provider = ({
  children,
}: {
  children: ReactNode;
}): React.ReactElement => {
  return (
    <QueryProvider>
      <RootProvider>{children}</RootProvider>
    </QueryProvider>
  );
};
