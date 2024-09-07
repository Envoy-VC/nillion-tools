import { useAccount } from 'graz';

import { useIsMobile } from '~/lib/hooks/use-is-mobile';
import { useMemo } from 'react';

import { ConnectWalletContext } from '~/providers';

import { MobileConnectButton } from './mobile';
import { DesktopConnectButton } from './desktop';

import type { PartialConnectWalletProps } from '~/types';
import { buildConnectWalletProps } from '~/lib/helpers';
import { UserButton } from '../user-button';

export const ConnectWallet = (props: PartialConnectWalletProps) => {
  const { isConnected } = useAccount();

  const { isMobile } = useIsMobile();
  const isMobileDevice = useMemo(() => isMobile(), [isMobile]);

  if (!isConnected) {
    return (
      <ConnectWalletContext.Provider value={buildConnectWalletProps(props)}>
        {isMobileDevice ? <MobileConnectButton /> : <DesktopConnectButton />}
      </ConnectWalletContext.Provider>
    );
  }
  return <UserButton />;
};
