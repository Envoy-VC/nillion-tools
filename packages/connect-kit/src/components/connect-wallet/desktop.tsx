import { ConnectButtonContent } from './content';
import { useConnectKitStore, useConnectWallet } from '~/lib/hooks';

import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { cn, sleep } from '~/lib/utils';
import { ConnectButtonTrigger } from './trigger';
import { Welcome } from './welcome';

export const DesktopConnectButton = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    setActiveWalletType,
    setError,
    setShowAllWallets,
  } = useConnectKitStore();

  const { modalOptions } = useConnectWallet();

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
          '!ck-rounded-3xl ck-px-3 ck-w-full ck-py-0',
          modalOptions?.size === 'compact'
            ? 'ck-max-w-[22rem] '
            : 'ck-max-w-2xl ck-min-h-[22rem]'
        )}
      >
        <div className='ck-flex ck-flex-row ck-w-full ck-gap-2'>
          <div
            className={cn(
              'ck-flex ck-w-full ck-py-5',
              modalOptions?.size === 'wide' ? 'ck-basis-2/5' : 'ck-basis-full'
            )}
          >
            <ConnectButtonContent />
          </div>
          {modalOptions?.size === 'wide' && (
            <>
              <div className='ck-h-full ck-border-r' />
              <div className='ck-flex ck-basis-3/5 ck-w-full ck-py-5'>
                <Welcome />
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
