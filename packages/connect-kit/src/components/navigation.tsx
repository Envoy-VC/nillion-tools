import { useConnectKitStore, useConnectWallet } from '~/lib/hooks';
import { Button } from '~/components/ui/button';
import { ChevronLeft, X } from 'lucide-react';
import { cn, sleep } from '~/lib/utils';

export const Navigation = () => {
  const {
    activeWalletType,
    setActiveWalletType,
    setError,
    setShowAllWallets,
    setIsModalOpen,
    setActiveScreen,
  } = useConnectKitStore();

  const { mode } = useConnectWallet();
  return (
    <div
      className={cn(
        'ck-w-full ck-flex ck-flex-row ck-items-center',
        activeWalletType ? 'ck-justify-between' : 'ck-justify-end'
      )}
    >
      {activeWalletType ? (
        <Button
          className='!ck-m-0 !ck-p-0 ck-cursor-pointer hover:ck-bg-neutral-100 !ck-rounded-xl ck-w-9 ck-h-9 ck-transition-all ck-duration-300 ck-ease-in-out'
          variant='link'
          onClick={() => {
            setActiveWalletType(null);
            setError(null);
            setActiveScreen('home');
          }}
        >
          <ChevronLeft size={18} strokeWidth={3} />
        </Button>
      ) : null}

      {mode === 'modal' && (
        <Button
          className='!ck-m-0 !ck-p-0 ck-cursor-pointer hover:ck-bg-neutral-100 !ck-rounded-xl ck-w-9 ck-h-9 ck-transition-all ck-duration-300 ck-ease-in-out'
          variant='link'
          onClick={async () => {
            setIsModalOpen(false);
            await sleep(500);
            setError(null);
            setActiveWalletType(null);
            setShowAllWallets(false);
            setActiveScreen('home');
          }}
        >
          <X size={18} strokeWidth={3} />
        </Button>
      )}
    </div>
  );
};
