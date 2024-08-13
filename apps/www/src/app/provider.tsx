'use client';

import type { ReactNode } from 'react';

import { RootProvider } from 'fumadocs-ui/provider';

export const Provider = ({
  children,
}: {
  children: ReactNode;
}): React.ReactElement => {
  return <RootProvider>{children}</RootProvider>;
};
