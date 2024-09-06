import { ConnectButtonTrigger } from './trigger';

import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer';
import { useConnectKitStore } from '~/lib/hooks';
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
};
