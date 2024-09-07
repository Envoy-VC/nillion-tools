import { type PropsWithChildren } from 'react';
import { useConnectWallet } from '~/lib/hooks';
import { Navigation } from '../navigation';
import { TermsAndConditions } from '../terms';
import { WalletSelectList } from '../connect-wallet/wallet-select';
import { AnimateChangeInHeight } from '../ui/animate-height';
import { Header } from '../header';
import { cn } from '~/lib/utils';

interface DesktopLayoutProps extends PropsWithChildren {
  isUserModal?: boolean;
}

export const DesktopLayout = ({
  children,
  isUserModal = false,
}: DesktopLayoutProps) => {
  const { modalOptions } = useConnectWallet();

  if (modalOptions.size === 'compact') {
    return (
      <AnimateChangeInHeight>
        <div className='ck-pt-5 ck-pb-3'>
          <div className='ck-relative ck-text-center'>
            <Header />
            <div className='ck-absolute ck-top-1/2 ck--translate-y-1/2 ck-w-full ck-px-3'>
              <Navigation />
            </div>
          </div>
          <div className='ck-px-3'>{children}</div>
          {!isUserModal && <TermsAndConditions />}
        </div>
      </AnimateChangeInHeight>
    );
  }

  return (
    <AnimateChangeInHeight>
      <div className='ck-flex ck-flex-row ck-w-full ck-gap-1'>
        {!isUserModal && (
          <div className='ck-flex ck-w-full ck-basis-2/5 ck-px-3'>
            <div className='ck-relative ck-flex ck-w-full ck-flex-col ck-min-h-[20rem] ck-py-5'>
              <Header />
              <WalletSelectList />
            </div>
          </div>
        )}
        {!isUserModal && <div className='ck-min-h-full ck-border-r' />}
        <div
          className={cn(
            'ck-flex ck-flex-col ck-w-full ck-pt-5 ck-pb-3 ck-relative ck-justify-start',
            isUserModal ? '' : 'ck-basis-3/5'
          )}
        >
          <div className='ck-text-center'>
            <div className='ck-absolute ck-top-2 ck-w-full  ck-px-3'>
              <Navigation />
            </div>
            {isUserModal ? <Header /> : null}
          </div>
          <div className='ck-px-3'>{children}</div>
          {!isUserModal && <TermsAndConditions />}
        </div>
      </div>
    </AnimateChangeInHeight>
  );
};
