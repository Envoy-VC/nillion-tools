import { useConnectKitStore, useConnectWallet } from '~/lib/hooks';
import { Button } from '~/components/ui/button';
import { ChevronLeft, X } from 'lucide-react';
import { cn } from '~/lib/utils';

export const Navigation = () => {
  const { activeScreen, onBack, onClose } = useConnectKitStore();
  const { mode } = useConnectWallet();

  return (
    <div
      className={cn(
        'ck-w-full ck-flex ck-flex-row ck-items-center',
        activeScreen !== 'home' ? 'ck-justify-between' : 'ck-justify-end'
      )}
    >
      {activeScreen !== 'home' ? (
        <Button
          className='!ck-m-0 !ck-p-0 ck-cursor-pointer hover:ck-bg-secondary-hover !ck-rounded-xl ck-w-9 ck-h-9 ck-transition-all ck-duration-300 ck-ease-in-out'
          variant='link'
          onClick={onBack}
        >
          <ChevronLeft size={18} strokeWidth={3} />
        </Button>
      ) : null}

      {mode === 'modal' && (
        <Button
          className='!ck-m-0 !ck-p-0 ck-cursor-pointer hover:ck-bg-secondary-hover !ck-rounded-xl ck-w-9 ck-h-9 ck-transition-all ck-duration-300 ck-ease-in-out'
          variant='link'
          onClick={onClose}
        >
          <X size={18} strokeWidth={3} />
        </Button>
      )}
    </div>
  );
};
