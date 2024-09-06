import { type WalletType } from '~/lib/stores';
import { useConnectKitStore } from '~/lib/hooks';

import { AnimatePresence } from 'framer-motion';

import { Button } from '../../ui/button';

import { Wallet } from 'lucide-react';
import { useIsMobile } from '../../../lib/hooks/use-is-mobile';
import { useMemo } from 'react';
import { AnimateSlide } from '../../animate-slide';
import { WalletButton } from './button';

export const WalletSelectList = () => {
  const { supportedWallets, showAllWallets, setShowAllWallets } =
    useConnectKitStore();

  const { isMobile } = useIsMobile();

  const walletList = useMemo(() => {
    const isMobileDevice = isMobile();
    if (isMobileDevice) {
      return Object.entries(supportedWallets).filter(([_, wallet]) => {
        if (typeof wallet.mobileDisabled === 'function') {
          return !wallet.mobileDisabled();
        }
        return !wallet.mobileDisabled;
      });
    }

    return Object.entries(supportedWallets).filter(([_, wallet]) => {
      if (typeof wallet.mobileDisabled === 'function') {
        return wallet.mobileDisabled();
      }
      return wallet.mobileDisabled;
    });
  }, [isMobile, supportedWallets]);

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
                <Wallet className='ck-h-6 ck-w-6' />
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
