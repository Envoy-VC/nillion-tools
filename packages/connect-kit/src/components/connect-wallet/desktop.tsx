import { useConnectKitStore, useConnectWallet } from '~/lib/hooks';

import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { cn, sleep } from '~/lib/utils';
import { ConnectButtonTrigger } from './trigger';
import { WalletScreen } from '~/components/screens';
import { DesktopLayout } from '../layouts';

export const DesktopConnectButton = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    setActiveWalletType,
    setError,
    setShowAllWallets,
  } = useConnectKitStore();

  const { modalOptions, mode } = useConnectWallet();

  if (mode === 'modal') {
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
        <DialogTrigger>
          <ConnectButtonTrigger />
        </DialogTrigger>
        <DialogContent
          showCloseButton={false}
          className={cn(
            '!ck-rounded-3xl !ck-px-0 ck-w-full ck-py-0',
            modalOptions.size === 'compact'
              ? 'ck-max-w-[22rem] '
              : 'ck-max-w-2xl ck-min-h-[22rem]'
          )}
        >
          <DesktopLayout>
            <WalletScreen />
          </DesktopLayout>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div
      className={cn(
        '!ck-rounded-3xl !ck-px-0 ck-w-full ck-py-0 ck-gap-4 ck-border ck-bg-background ck-p-6 ck-shadow-lg sm:ck-rounded-lg',
        modalOptions.size === 'compact'
          ? 'ck-max-w-[22rem]'
          : 'ck-max-w-2xl ck-min-h-[22rem]'
      )}
    >
      <DesktopLayout>
        <WalletScreen />
      </DesktopLayout>
    </div>
  );
};
