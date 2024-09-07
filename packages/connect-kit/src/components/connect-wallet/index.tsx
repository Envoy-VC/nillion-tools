import { useAccount } from 'graz';

import { useIsMobile } from '~/lib/hooks/use-is-mobile';
import { useMemo } from 'react';

import { ConnectWalletContext } from '~/providers';

import { MobileConnectButton } from './mobile';
import { DesktopConnectButton } from './desktop';

import type { PartialConnectWalletProps } from '~/types';
import { buildConnectWalletProps } from '~/lib/helpers';
import { DesktopUserModal, MobileUserModal } from '../user-modal';

export const ConnectWallet = (props: PartialConnectWalletProps) => {
  return (
    <ConnectWalletContext.Provider value={buildConnectWalletProps(props)}>
      <Modal />
    </ConnectWalletContext.Provider>
  );
};

const Modal = () => {
  const { isConnected } = useAccount();

  const { isMobile } = useIsMobile();
  const isMobileDevice = useMemo(() => isMobile(), [isMobile]);

  if (!isConnected) {
    return (
      <>{isMobileDevice ? <MobileConnectButton /> : <DesktopConnectButton />}</>
    );
  }
  return <>{isMobileDevice ? <MobileUserModal /> : <DesktopUserModal />}</>;
};
