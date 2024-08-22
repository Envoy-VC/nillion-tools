'use client';

import { useConnectKitStore } from '~/lib/hooks';
import { sleep } from '~/lib/utils';

import { useAccount } from 'graz';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

import { AnimateChangeInHeight } from './ui/animate-height';
// import { UserModal } from './user-modal';
import { WalletSelect } from './wallet-select';

import { ChevronLeft, X } from 'lucide-react';

export const ConnectWallet = () => {
  const { data: account } = useAccount();
  const {
    isModalOpen,
    activeWalletType,
    setIsModalOpen,
    setActiveWalletType,
    setError,
    setShowAllWallets,
  } = useConnectKitStore();

  if (!account) {
    return (
      <Dialog
        open={isModalOpen}
        onOpenChange={async (open) => {
          setIsModalOpen(open);
          await sleep(500);
          if (!open) {
            setError(null);
            setActiveWalletType(null);
            setShowAllWallets(false);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button>Connect Wallet</Button>
        </DialogTrigger>
        <DialogContent
          className='ck-max-w-xs !ck-rounded-3xl ck-px-3 ck-py-4'
          showCloseButton={false}
        >
          <DialogTitle className='ck-relative ck-text-center ck-font-medium'>
            <div>Connect Wallet</div>
            {activeWalletType ? (
              <div className='ck-absolute ck--top-3 ck-left-0'>
                <Button
                  className='ck-m-0 ck-p-0 ck-cursor-pointer'
                  variant='link'
                  onClick={() => {
                    setActiveWalletType(null);
                    setError(null);
                    setShowAllWallets(false);
                  }}
                >
                  <ChevronLeft size={18} strokeWidth={3} />
                </Button>
              </div>
            ) : null}
            <div className='ck-absolute ck--top-3 ck-right-0'>
              <Button
                className='ck-m-0 ck-p-0 ck-cursor-pointer'
                variant='link'
                onClick={async () => {
                  setIsModalOpen(false);
                  await sleep(500);
                  setError(null);
                  setActiveWalletType(null);
                  setShowAllWallets(false);
                }}
              >
                <X size={16} strokeWidth={3} />
              </Button>
            </div>
          </DialogTitle>
          <AnimateChangeInHeight className='ck-flex ck-w-full ck-flex-col'>
            <WalletSelect />
          </AnimateChangeInHeight>
        </DialogContent>
      </Dialog>
    );
  }
  return <div>User Modal</div>;
};
