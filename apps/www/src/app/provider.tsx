'use client';

import type { ReactNode } from 'react';

import { RootProvider } from 'fumadocs-ui/provider';
import { CosmosProvider, QueryProvider } from '~/providers';

export const Provider = ({
  children,
}: {
  children: ReactNode;
}): React.ReactElement => {
  return (
    <QueryProvider>
      <RootProvider>
        <CosmosProvider>{children}</CosmosProvider>
      </RootProvider>
    </QueryProvider>
  );
};
