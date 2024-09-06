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
        'ck-w-full ck-flex ck-flex-row ck-items-center ck-px-3',
        activeWalletType ? 'ck-justify-between' : 'ck-justify-end'
      )}
    >
      {activeWalletType ? (
        <Button
          className='ck-m-0 ck-p-0 ck-cursor-pointer'
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
          className='ck-m-0 ck-p-0 ck-cursor-pointer'
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
          <X size={16} strokeWidth={3} />
        </Button>
      )}
    </div>
  );
};
