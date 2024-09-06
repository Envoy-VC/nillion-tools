import { ConnectButtonTrigger } from './trigger';

import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer';
import { useConnectKitStore, useConnectWallet } from '~/lib/hooks';
import { sleep } from '~/lib/utils';
import { WalletScreen } from '~/components/screens';
import { MobileLayout } from '../layouts';

export const MobileConnectButton = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    setActiveWalletType,
    setError,
    setShowAllWallets,
  } = useConnectKitStore();

  const { mode } = useConnectWallet();

  if (mode === 'modal') {
    return (
      <Drawer
        open={isModalOpen}
        onOpenChange={async (open) => {
          setIsModalOpen(open);
          await sleep(500);
          if (!open) {
            setError(null);
            setActiveWalletType(null);
            setShowAllWallets(false);
          }
        }}
      >
        <DrawerTrigger>
          <ConnectButtonTrigger />
        </DrawerTrigger>
        <DrawerContent className='ck-rounded-t-[2rem]'>
          <MobileLayout>
            <WalletScreen />
          </MobileLayout>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className='!ck-rounded-3xl !ck-px-0 ck-w-full ck-py-0 ck-gap-4 ck-border ck-bg-background ck-p-6 ck-shadow-lg sm:ck-rounded-lg ck-max-w-[22rem]'>
      <MobileLayout>
        <WalletScreen />
      </MobileLayout>
    </div>
  );
};
