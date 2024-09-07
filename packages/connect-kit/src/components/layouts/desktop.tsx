import { type PropsWithChildren } from 'react';
import { useConnectWallet } from '~/lib/hooks';
import { Navigation } from '../navigation';
import { TermsAndConditions } from '../terms';
import { WalletSelectList } from '../connect-wallet/wallet-select';
import { AnimateChangeInHeight } from '../ui/animate-height';

export const DesktopLayout = ({ children }: PropsWithChildren) => {
  const { modalOptions } = useConnectWallet();

  if (modalOptions.size === 'compact') {
    return (
      <AnimateChangeInHeight>
        <div className='ck-pt-5 ck-pb-3'>
          <div className='ck-relative ck-text-center'>
            <div className='ck-font-semibold ck-text-base px-2 ck-text-center'>
              {modalOptions.title}
            </div>
            <div className='absolute ck-top-1/2 ck--translate-y-1/2 ck-w-full ck-px-3'>
              <Navigation />
            </div>
          </div>
          <div className='ck-px-3'>{children}</div>
          <TermsAndConditions />
        </div>
      </AnimateChangeInHeight>
    );
  }

  return (
    <AnimateChangeInHeight>
      <div className='ck-flex ck-flex-row ck-w-full ck-gap-2'>
        <div className='ck-flex ck-w-full ck-basis-2/5 ck-px-3'>
          <div className='ck-relative ck-flex ck-w-full ck-flex-col ck-min-h-[20rem] ck-py-5'>
            <div className='ck-font-semibold ck-text-base px-2 ck-text-start'>
              {modalOptions.title}
            </div>
            <WalletSelectList />
          </div>
        </div>
        <div className='ck-min-h-full ck-border-r' />
        <div className='ck-flex ck-flex-col ck-basis-3/5 ck-w-full ck-py-5 ck-relative ck-justify-between'>
          <div className='absolute ck-top-4 ck-w-full'>
            <Navigation />
          </div>
          {children}
          <TermsAndConditions />
        </div>
      </div>
    </AnimateChangeInHeight>
  );
};
