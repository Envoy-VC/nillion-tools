import { useConnectKitStore } from '~/lib/hooks';
import { AnimateSlide } from '../animate-slide';

export const ConnectingScreen = () => {
  const { supportedWallets, activeWalletType } = useConnectKitStore();

  if (!activeWalletType) return null;

  const wallet = supportedWallets[activeWalletType];
  const logo =
    typeof wallet.logo === 'object' ? wallet.logo.major : wallet.logo ?? '';

  return (
    <AnimateSlide>
      <div className='ck-flex ck-w-full ck-flex-col ck-items-center ck-justify-center ck-gap-3 ck-py-8 ck-text-center'>
        <div className='ck-relative connectingLoader'>
          <img
            alt={wallet.name}
            className='ck-h-20 ck-w-20 ck-rounded-2xl !my-0 !py-0'
            src={logo}
          />
        </div>
        <div className='ck-flex ck-flex-col'>
          <div className='ck-text-lg ck-font-medium'>
            Continue in {wallet.prettyName}
          </div>

          <div className='ck-text-sm ck-font-medium ck-text-neutral-500'>
            Accept Connect request in wallet
          </div>
        </div>
      </div>
    </AnimateSlide>
  );
};
