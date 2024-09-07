import { type supportedWallets } from '~/providers';
import type { WalletType } from '~/types';
import { useGraz } from '~/lib/hooks';
import { cn } from '~/lib/utils';

import { type Variants, motion } from 'framer-motion';
import { type WalletType as GrazWalletType, checkWallet } from 'graz';

import { buttonVariants } from '~/components/ui/button';

interface WalletButtonProps {
  type: WalletType;
  index: number;
  wallet: (typeof supportedWallets)[keyof typeof supportedWallets];
}

export const WalletButton = ({ type, wallet, index }: WalletButtonProps) => {
  const { connect } = useGraz();

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
        await connect(type);
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
        <div className='ck-rounded-lg ck-bg-[#DAF0E4] ck-px-[6px] ck-py-[2px] ck-text-[10px] ck-uppercase ck-tracking-tight ck-text-[#26b562] ck-font-semibold'>
          installed
        </div>
      ) : null}
    </motion.button>
  );
};
