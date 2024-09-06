import { useMemo } from 'react';
import { useConnectWallet, useIsMobile } from '~/lib/hooks';

import { Welcome } from '../welcome';
import { WalletSelectList } from '../connect-wallet/wallet-select';

export const HomeScreen = () => {
  const { modalOptions } = useConnectWallet();

  const { isMobile } = useIsMobile();
  const isMobileDevice = useMemo(() => isMobile(), [isMobile]);

  if (modalOptions.size === 'compact' || isMobileDevice) {
    return <WalletSelectList />;
  }

  return <Welcome />;
};
