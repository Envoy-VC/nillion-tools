import { useAccount } from 'graz';
import { useConnectKitStore, useConnectWallet } from '~/lib/hooks';

export const Header = () => {
  const { data } = useAccount();
  const { activeScreen, activeWalletType, supportedWallets } =
    useConnectKitStore();
  const { modalOptions } = useConnectWallet();

  const isUserModal = Boolean(data);

  if (isUserModal) {
    if (activeScreen === 'activity') {
      return (
        <div className='ck-font-semibold ck-text-base px-2 ck-text-center'>
          Activity
        </div>
      );
    } else if (activeScreen === 'switch-chain') {
      return (
        <div className='ck-font-semibold ck-text-base px-2 ck-text-center'>
          Switch Chain
        </div>
      );
    }
    return null;
  }

  if (activeScreen === 'home') {
    return (
      <div className='ck-font-semibold ck-text-base px-2 ck-text-center'>
        {modalOptions.title}
      </div>
    );
  } else if (activeWalletType) {
    return (
      <div className='ck-font-semibold ck-text-base px-2 ck-text-center'>
        {supportedWallets[activeWalletType].prettyName}
      </div>
    );
  }
};
