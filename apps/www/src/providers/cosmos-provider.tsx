'use client';

import React, { type PropsWithChildren } from 'react';

import { chainRegistryChainToKeplr } from '@chain-registry/keplr';
import { ConnectKitProvider, nillionTestnet } from '@nillion-tools/connect-kit';
import { assets, chains } from 'chain-registry';
import { GrazProvider } from 'graz';
import { env } from '~/env';

export const CosmosProvider = ({ children }: PropsWithChildren) => {
  const grazChains = chains
    .map((c) => {
      try {
        const info = chainRegistryChainToKeplr(c, assets);
        return info;
      } catch (error) {
        return undefined;
      }
    })
    .filter((c) => !!c);

  return (
    <GrazProvider
      grazOptions={{
        chains: [nillionTestnet, ...grazChains],
        autoReconnect: false,
        walletConnect: {
          options: { projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID },
        },
      }}
    >
      <ConnectKitProvider chains={[nillionTestnet, ...grazChains]}>
        {children}
      </ConnectKitProvider>
    </GrazProvider>
  );
};
