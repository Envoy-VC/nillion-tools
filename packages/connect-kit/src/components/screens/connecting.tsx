import { useConnectKitStore, useGraz } from '~/lib/hooks';
import { AnimateSlide } from '../animate-slide';
import { cn } from '~/lib/utils';
import { RotateCcwIcon, X } from 'lucide-react';

export const ConnectingScreen = () => {
  const { supportedWallets, activeWalletType, error } = useConnectKitStore();
  const { connect } = useGraz();

  if (!activeWalletType) return null;

  const wallet = supportedWallets[activeWalletType];
  const logo =
    typeof wallet.logo === 'object' ? wallet.logo.major : wallet.logo ?? '';

  return (
    <AnimateSlide>
      <div className='ck-flex ck-w-full ck-flex-col ck-items-center ck-justify-center ck-gap-3 ck-py-8 ck-text-center'>
        <div className={cn('ck-relative', error ? '' : 'connectingLoader')}>
          <img
            alt={wallet.name}
            className='ck-h-20 ck-w-20 ck-rounded-2xl !my-0 !py-0'
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
          {error ? (
            <button
              className='ck-bg-[#F0F1FF] ck-text-[#677DFF] ck-border-[#E3E4F2] ck-h-8 ck-w-fit ck-px-4 !ck-rounded-full ck-text-sm ck-font-semibold ck-my-4 ck-mx-auto ck-flex ck-flex-row ck-items-center ck-gap-2'
              type='button'
              onClick={async () => {
                await connect(activeWalletType);
              }}
            >
              <RotateCcwIcon size={16} strokeWidth={3} />
              Try again
            </button>
          ) : null}
        </div>
      </div>
    </AnimateSlide>
  );
};
