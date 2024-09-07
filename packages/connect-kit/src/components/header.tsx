import { useConnectKitStore, useConnectWallet } from '~/lib/hooks';

export const Header = () => {
  const { activeScreen, activeWalletType, supportedWallets } =
    useConnectKitStore();
  const { modalOptions } = useConnectWallet();

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
