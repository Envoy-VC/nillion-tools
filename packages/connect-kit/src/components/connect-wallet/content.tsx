import { useConnectWallet } from '~/lib/hooks';
import { AnimateChangeInHeight } from '../ui/animate-height';
import { WalletSelect } from './wallet-select';

import { cn } from '~/lib/utils';

import { TermsAndConditions } from './terms';
import { Navigation } from './navigation';

export const ConnectButtonContent = () => {
  const { modalOptions } = useConnectWallet();
  return (
    <div className='ck-w-full'>
      <div className={cn('ck-relative ck-text-center ck-pb-3 ')}>
        <div
          className={cn(
            'ck-font-semibold ck-text-base px-2',
            modalOptions?.size === 'wide' ? 'ck-text-start' : 'ck-text-center'
          )}
        >
          {modalOptions?.title}
        </div>
        {modalOptions?.size === 'compact' && <Navigation />}
      </div>
      <AnimateChangeInHeight className='ck-flex ck-w-full ck-flex-col'>
        <WalletSelect />
      </AnimateChangeInHeight>
      {modalOptions?.size === 'compact' && <TermsAndConditions />}
    </div>
  );
};
