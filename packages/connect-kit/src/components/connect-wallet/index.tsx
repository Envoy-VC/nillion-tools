import { useAccount } from 'graz';

import { useIsMobile } from '~/lib/hooks/use-is-mobile';
import { useMemo } from 'react';

import { ConnectWalletContext } from '~/providers';

import { MobileConnectButton } from './mobile';
import { DesktopConnectButton } from './desktop';

import type { ConnectWalletProps } from '~/types';
import { buildConnectWalletProps } from '~/lib/helpers';

export const ConnectWallet = (props: ConnectWalletProps) => {
  const { data: account } = useAccount();

  const { isMobile } = useIsMobile();
  const isMobileDevice = useMemo(() => isMobile(), [isMobile]);

  if (!account) {
    if (isMobileDevice) {
      return (
        <ConnectWalletContext.Provider value={buildConnectWalletProps(props)}>
          <MobileConnectButton />
        </ConnectWalletContext.Provider>
      );
    }

    return (
      <ConnectWalletContext.Provider value={buildConnectWalletProps(props)}>
        <DesktopConnectButton />
      </ConnectWalletContext.Provider>
    );
  }
  return <div>User Modal</div>;
};
