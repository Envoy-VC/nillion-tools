import { useContext } from 'react';
import { ConnectKitContext } from '../stores/connect-wallet';
import { useStore } from 'zustand';

export const useConnectKitStore = () => {
  const store = useContext(ConnectKitContext);
  if (!store) throw new Error('Missing TerminalContext.Provider in the tree');
  return useStore(store);
};
