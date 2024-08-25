import { useConnectKitStore } from '~/lib/hooks';
import { Button } from '../ui/button';
import { ChevronLeft, X } from 'lucide-react';
import { sleep } from '~/lib/utils';

export const Navigation = () => {
  const {
    activeWalletType,
    setActiveWalletType,
    setError,
    setShowAllWallets,
    setIsModalOpen,
  } = useConnectKitStore();
  return (
    <>
      {activeWalletType ? (
        <div className='ck-absolute ck--top-3 ck-left-0'>
          <Button
            className='ck-m-0 ck-p-0 ck-cursor-pointer'
            variant='link'
            onClick={() => {
              setActiveWalletType(null);
              setError(null);
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
    </>
  );
};
