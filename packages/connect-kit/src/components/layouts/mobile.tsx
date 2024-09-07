import { type PropsWithChildren } from 'react';
import { useConnectWallet } from '~/lib/hooks';
import { Navigation } from '../navigation';
import { TermsAndConditions } from '../terms';
import { AnimateChangeInHeight } from '../ui/animate-height';

export const MobileLayout = ({ children }: PropsWithChildren) => {
  const { modalOptions } = useConnectWallet();

  return (
    <AnimateChangeInHeight>
      <div className='ck-py-2 ck-w-full'>
        <div className='ck-relative ck-text-center ck-px-3'>
          <div className='ck-font-semibold ck-text-base px-2 ck-text-center'>
            {modalOptions.title}
          </div>
          <div className='absolute ck-top-1/2 ck--translate-y-1/2 ck-w-full ck-px-5'>
            <Navigation />
          </div>
        </div>
        <div className='ck-px-3'>{children}</div>
        <TermsAndConditions />
      </div>
    </AnimateChangeInHeight>
  );
};
