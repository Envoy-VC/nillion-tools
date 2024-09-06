import { nillionTestnet } from '~/lib/chain';

import { type supportedWallets } from '~/providers';
import type { WalletType } from '~/types';
import { useConnectKitStore, useConnectWallet } from '~/lib/hooks';
import { cn, errorHandler } from '~/lib/utils';

import { type Variants, motion } from 'framer-motion';
import {
  type WalletType as GrazWalletType,
  checkWallet,
  useConnect,
  useSuggestChainAndConnect,
} from 'graz';

import { buttonVariants } from '~/components/ui/button';

interface WalletButtonProps {
  type: WalletType;
  index: number;
  wallet: (typeof supportedWallets)[keyof typeof supportedWallets];
}

export const WalletButton = ({ type, wallet, index }: WalletButtonProps) => {
  const { setActiveWalletType, setError, setActiveScreen } =
    useConnectKitStore();
  const { chainOptions } = useConnectWallet();
  const { suggestAndConnectAsync } = useSuggestChainAndConnect();
  const { connectAsync } = useConnect();

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
          setError(null);
          setActiveWalletType(type);
          setActiveScreen('connecting');

          const chainInfo = chainOptions.chainInfos.find(
            (i) => i.chainId === chainOptions.defaultChain
          );

          let res;

          if (chainInfo) {
            res = await suggestAndConnectAsync({
              chainInfo: nillionTestnet,
              walletType: type as GrazWalletType,
            });
          } else {
            res = await connectAsync({
              chainId: chainOptions.defaultChain,
              walletType: type as GrazWalletType,
            });
          }

          const address =
            res.accounts[chainOptions.defaultChain]?.bech32Address;
          if (!address) {
            throw new Error('Failed to connect');
          }
        } catch (error) {
          const serialized = errorHandler(error);
          setError(serialized.message ?? 'An Unknown Error Occurred');
          setActiveScreen('error');
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
