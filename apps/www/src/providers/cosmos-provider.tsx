'use client';

import React, { type PropsWithChildren } from 'react';

import { ConnectKitProvider, nillionTestnet } from '@nillion-tools/connect-kit';
import { GrazProvider } from 'graz';
import { env } from '~/env';

export const CosmosProvider = ({ children }: PropsWithChildren) => {
  return (
    <GrazProvider
      grazOptions={{
        chains: [nillionTestnet],
        autoReconnect: false,
        walletConnect: {
          options: { projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID },
        },
      }}
    >
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </GrazProvider>
  );
};
