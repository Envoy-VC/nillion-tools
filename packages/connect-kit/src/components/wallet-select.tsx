/* eslint-disable @next/next/no-img-element -- custom urls  */

import { nillionTestnet } from '~/lib/chain';

import { type WalletType, type supportedWallets } from '~/lib/stores';
import { useConnectKitStore } from '~/lib/hooks';
import { cn, errorHandler } from '~/lib/utils';

import { type Variants, motion } from 'framer-motion';
import {
  type WalletType as GrazWalletType,
  checkWallet,
  useSuggestChainAndConnect,
} from 'graz';

import { Button, buttonVariants } from './ui/button';

import { Wallet, X } from 'lucide-react';
import { useIsMobile } from '../lib/hooks/use-is-mobile';
import { useMemo } from 'react';

export const WalletSelect = () => {
  const {
    supportedWallets,
    activeWalletType,
    showAllWallets,
    setShowAllWallets,
  } = useConnectKitStore();

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
  }, []);

  if (!activeWalletType) {
    return (
      <div className='ck-flex ck-flex-col'>
        <div className='ck-flex ck-w-full ck-flex-col ck-gap-1'>
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
          {walletList.length > 4 && (
            <Button
              className={
                'ck-flex ck-h-12 ck-w-full ck-flex-row ck-items-center ck-justify-between ck-rounded-xl ck-px-4 ck-transition-all ck-duration-300 ck-ease-in-out'
              }
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
    );
  }

  return <ConnectingComponent />;
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
  };

  const isWalletReady = checkWallet(type as GrazWalletType);
  const logo =
    typeof wallet.logo === 'object' ? wallet.logo.major : wallet.logo ?? '';
  return (
    <motion.button
      key={wallet.name}
      animate='animate'
      className={cn(
        'ck-flex ck-h-12 ck-w-full ck-flex-row ck-items-center ck-justify-between ck-rounded-xl ck-px-4 ck-transition-all ck-duration-300 ck-ease-in-out',
        buttonVariants({ variant: 'secondary' })
      )}
      initial='initial'
      type='button'
      variants={variants}
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
        <img alt={wallet.name} className='ck-h-7 ck-w-7' src={logo} />
        <div className='ck-text-base ck-font-medium'>{wallet.prettyName}</div>
      </div>
      {isWalletReady ? (
        <div className='ck-rounded-lg ck-bg-green-100 ck-px-2 ck-py-1 ck-text-xs ck-uppercase ck-tracking-tight ck-text-green-500'>
          installed
        </div>
      ) : null}
    </motion.button>
  );
};

const ConnectingComponent = () => {
  const { supportedWallets, activeWalletType, error } = useConnectKitStore();
  if (!activeWalletType) return null;

  const wallet = supportedWallets[activeWalletType];
  const logo =
    typeof wallet.logo === 'object' ? wallet.logo.major : wallet.logo ?? '';

  return (
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
  );
};
