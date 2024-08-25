import { useConnectKitStore, useConnectWallet } from '~/lib/hooks';
import { Navigation } from './navigation';
import { TermsAndConditions } from './terms';
import { ConnectingComponent } from './connecting';
import { AnimateSlide } from '../animate-slide';

export const Welcome = () => {
  const { modalOptions } = useConnectWallet();
  const { activeWalletType } = useConnectKitStore();
  if (modalOptions?.size === 'wide')
    return (
      <div className='ck-relative ck-w-full ck-p-3'>
        <Navigation />
        <div className='ck-flex ck-flex-col ck-justify-between ck-h-full'>
          {activeWalletType ? (
            <ConnectingComponent />
          ) : (
            <AnimateSlide>
              <div className='ck-h-[10rem]'>Welcome</div>
            </AnimateSlide>
          )}
          <TermsAndConditions />
        </div>
      </div>
    );
  return null;
};
