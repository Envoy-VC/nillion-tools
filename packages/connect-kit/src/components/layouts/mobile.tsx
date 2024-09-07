import { type PropsWithChildren } from 'react';

import { Navigation } from '../navigation';
import { TermsAndConditions } from '../terms';
import { AnimateChangeInHeight } from '../ui/animate-height';
import { Header } from '../header';

export const MobileLayout = ({ children }: PropsWithChildren) => {
  return (
    <AnimateChangeInHeight>
      <div className='ck-py-2 ck-w-full'>
        <div className='ck-relative ck-text-center ck-px-3'>
          <Header />
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
