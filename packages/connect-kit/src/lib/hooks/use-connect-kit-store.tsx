import { useContext } from 'react';
import { ConnectKitContext } from '~/providers';
import { sleep } from '../utils';

export const useConnectKitStore = () => {
  const store = useContext(ConnectKitContext);

  const onDialogOpenChange = async (open: boolean) => {
    store.setIsModalOpen(open);
    await sleep(500);
    if (!open) {
      store.setError(null);
      store.setActiveWalletType(null);
      store.setShowAllWallets(false);
    }
  };

  const onBack = () => {
    store.setActiveWalletType(null);
    store.setError(null);
    store.setActiveScreen('home');
  };
  const onClose = async () => {
    store.setIsModalOpen(false);
    await sleep(500);
    store.setError(null);
    store.setActiveWalletType(null);
    store.setShowAllWallets(false);
    store.setActiveScreen('home');
  };

  return {
    ...store,
    onDialogOpenChange,
    onBack,
    onClose,
  };
};
