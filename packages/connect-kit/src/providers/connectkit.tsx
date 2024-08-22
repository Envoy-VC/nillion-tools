'use client';

import React, { useRef } from 'react';

import { createConnectKitStore, ConnectKitContext } from '~/lib/stores';

export const ConnectKitProvider = ({ children }: React.PropsWithChildren) => {
  const store = useRef(createConnectKitStore()).current;

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return (
    <ConnectKitContext.Provider value={store}>
      {children}
    </ConnectKitContext.Provider>
  );
};
