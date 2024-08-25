import { nillionTestnet } from '~/lib/chain';

import { type WalletType, type supportedWallets } from '~/lib/stores';
import { useConnectKitStore, useConnectWallet } from '~/lib/hooks';
import { cn, errorHandler } from '~/lib/utils';

import { AnimatePresence, type Variants, motion } from 'framer-motion';
import {
  type WalletType as GrazWalletType,
  checkWallet,
  useSuggestChainAndConnect,
} from 'graz';

import { Button, buttonVariants } from '../ui/button';

import { Wallet } from 'lucide-react';
import { useIsMobile } from '../../lib/hooks/use-is-mobile';
import { useMemo } from 'react';
import { AnimateSlide } from '../animate-slide';
import { ConnectingComponent } from './connecting';

export const WalletSelect = () => {
  const {
    supportedWallets,
    activeWalletType,
    showAllWallets,
    setShowAllWallets,
  } = useConnectKitStore();
  const { modalOptions } = useConnectWallet();

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

  if (activeWalletType && modalOptions?.size === 'compact') {
    return <ConnectingComponent />;
  }

  return (
    <AnimateSlide>
      <div className='ck-flex ck-flex-col'>
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

interface WalletButtonProps {
  type: WalletType;
  index: number;
  wallet: (typeof supportedWallets)[keyof typeof supportedWallets];
}

const WalletButton = ({ type, wallet, index }: WalletButtonProps) => {
  const { setActiveWalletType, setError } = useConnectKitStore();
  const { suggestAndConnectAsync } = useSuggestChainAndConnect();

  const variants: Variants = {
    initial: {
      opacity: index <= 3 ? 1 : 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: (index - 3) * 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        delay: 0.1,
      },
    },
  };

  const isWalletReady = checkWallet(type as GrazWalletType);
  const logo =
    typeof wallet.logo === 'object' ? wallet.logo.major : wallet.logo ?? '';

  return (
    <motion.button
      key={wallet.name}
      layout
      animate='animate'
      exit='exit'
      type='button'
      variants={variants}
      className={cn(
        'ck-flex ck-h-[3.125rem] ck-w-full ck-flex-row ck-items-center ck-justify-between ck-rounded-xl ck-px-4 ck-transition-all ck-duration-300 ck-ease-in-out',
        buttonVariants({ variant: 'secondary' })
      )}
      onClick={async () => {
        try {
          setActiveWalletType(type);
          const res = await suggestAndConnectAsync({
            chainInfo: nillionTestnet,
            walletType: type as GrazWalletType,
          });

          const address =
            res.accounts['nillion-chain-testnet-1']?.bech32Address;
          if (!address) {
            throw new Error('Failed to connect');
          }
        } catch (error) {
          setError(errorHandler(error));
        }
      }}
    >
      <div className='ck-flex ck-flex-row ck-items-center ck-gap-[10px]'>
        <img
          alt={wallet.name}
          className='ck-h-8 ck-w-8 ck-rounded-sm'
          src={logo}
        />
        <div className='ck-text-base ck-font-medium'>{wallet.prettyName}</div>
      </div>
      {isWalletReady ? (
        <div className='ck-rounded-lg ck-bg-green-100 ck-px-2 ck-py-[2px] ck-text-[10px] ck-uppercase ck-tracking-tight ck-text-green-500'>
          installed
        </div>
      ) : null}
    </motion.button>
  );
};
