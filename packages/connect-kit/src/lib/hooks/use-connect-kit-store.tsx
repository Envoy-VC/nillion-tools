import { useContext } from 'react';
import { ConnectKitContext } from '~/providers';

export const useConnectKitStore = () => {
  const store = useContext(ConnectKitContext);
  return store;
};
