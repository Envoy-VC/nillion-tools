import { ConnectWalletContext } from '~/providers';

import { useContext } from 'react';

export const useConnectWallet = () => {
  const store = useContext(ConnectWalletContext);
  return store;
};
