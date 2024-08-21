'use client';

import type { PropsWithChildren } from 'react';

import { ConnectKitProvider as Provider } from '@nillion-tools/connect-kit';

export const ConnectKitProvider = ({ children }: PropsWithChildren) => {
  return <Provider>{children}</Provider>;
};
