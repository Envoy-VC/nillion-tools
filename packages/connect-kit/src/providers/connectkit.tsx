'use client';

import React, { useRef } from 'react';

import { createConnectKitStore, ConnectKitContext } from '~/lib/stores';

export const ConnectKitProvider = ({ children }: React.PropsWithChildren) => {
  const store = useRef(createConnectKitStore()).current;

  return (
    <ConnectKitContext.Provider value={store}>
      {children}
    </ConnectKitContext.Provider>
  );
};
