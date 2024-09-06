import { useConnectKitStore } from '~/lib/hooks';
import { AnimateSlide } from '../animate-slide';
import { cn } from '~/lib/utils';
import { X } from 'lucide-react';

export const ConnectingScreen = () => {
  const { supportedWallets, activeWalletType, error } = useConnectKitStore();
  if (!activeWalletType) return null;

  const wallet = supportedWallets[activeWalletType];
  const logo =
    typeof wallet.logo === 'object' ? wallet.logo.major : wallet.logo ?? '';

  return (
    <AnimateSlide>
      <div className='ck-flex ck-w-full ck-flex-col ck-items-center ck-justify-center ck-gap-3 ck-py-8 ck-text-center'>
        <div className={cn('relative', error ? '' : 'connectingLoader')}>
          <img
            alt={wallet.name}
            className='ck-h-20 ck-w-20 ck-rounded-2xl'
            src={logo}
          />
          {error ? (
            <div className='ck-absolute ck--bottom-1 ck--right-1 ck-flex ck-h-6 ck-w-6 ck-items-center ck-justify-center ck-rounded-full ck-bg-red-100 ck-text-red-400'>
              <X size={16} strokeWidth={3} />
            </div>
          ) : null}
        </div>
        <div className='ck-flex ck-flex-col'>
          {error ? (
            <div className='ck-text-lg ck-font-medium ck-text-red-400'>
              {error}
            </div>
          ) : (
            <div className='ck-text-lg ck-font-medium'>
              Continue in {wallet.prettyName}
            </div>
          )}
          <div className='ck-text-sm ck-font-medium ck-text-neutral-500'>
            Accept Connect request in wallet
          </div>
        </div>
      </div>
    </AnimateSlide>
  );
};
