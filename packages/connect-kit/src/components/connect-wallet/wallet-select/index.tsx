import { type WalletType } from '~/types';
import { useConnectKitStore, useIsMobile } from '~/lib/hooks';

import { AnimatePresence } from 'framer-motion';

import { Button } from '../../ui/button';

import { WalletIcon } from 'lucide-react';

import { useMemo } from 'react';
import { AnimateSlide } from '../../animate-slide';
import { WalletButton } from './button';

export const WalletSelectList = () => {
  const { supportedWallets, showAllWallets, setShowAllWallets } =
    useConnectKitStore();

  const { isMobile } = useIsMobile();
  const isMobileDevice = useMemo(() => isMobile(), [isMobile]);

  const walletList = useMemo(() => {
    if (isMobileDevice) {
      return Object.entries(supportedWallets).filter(([k]) => {
        return k.startsWith('wc_') && k.endsWith('_mobile');
      });
    }

    return Object.entries(supportedWallets).filter(([k]) => {
      return !(k.startsWith('wc_') && k.endsWith('_mobile'));
    });
  }, [isMobileDevice, supportedWallets]);

  return (
    <AnimateSlide>
      <div className='ck-flex ck-flex-col ck-py-3'>
        <div className='ck-flex ck-w-full ck-flex-col ck-gap-[6px]'>
          <AnimatePresence mode='popLayout'>
            {walletList
              .slice(0, showAllWallets ? undefined : 4)
              .map(([type, wallet], index) => {
                return (
                  <WalletButton
                    key={type}
                    index={index}
                    type={type as WalletType}
                    wallet={wallet}
                  />
                );
              })}
          </AnimatePresence>
          {walletList.length > 4 && (
            <Button
              className='ck-flex ck-h-12 ck-w-full ck-flex-row ck-items-center ck-justify-between ck-rounded-xl ck-px-4 ck-transition-all ck-duration-300 ck-ease-in-out'
              variant='secondary'
              onClick={() => {
                setShowAllWallets(!showAllWallets);
              }}
            >
              <div className='ck-flex ck-flex-row ck-items-center ck-gap-[10px]'>
                <WalletIcon className='ck-h-6 ck-w-6' />
                <div className='ck-text-base ck-font-medium'>
                  {showAllWallets ? 'Show less' : 'Show all Wallets'}
                </div>
              </div>
            </Button>
          )}
        </div>
      </div>
    </AnimateSlide>
  );
};
