import { UserButton } from '../user-button';

import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer';
import { useConnectKitStore, useConnectWallet } from '~/lib/hooks';
import { WalletScreen } from '../screens';
import { MobileLayout } from '../layouts';

export const MobileUserModal = () => {
  const { onDialogOpenChange, isModalOpen } = useConnectKitStore();

  const { mode } = useConnectWallet();

  if (mode === 'modal') {
    return (
      <Drawer open={isModalOpen} onOpenChange={onDialogOpenChange}>
        <DrawerTrigger>
          <UserButton />
        </DrawerTrigger>
        <DrawerContent className='ck-rounded-t-[2rem]'>
          <MobileLayout isUserModal>
            <WalletScreen isUserModal />
          </MobileLayout>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className='!ck-rounded-3xl !ck-px-0 ck-w-full ck-gap-4 ck-border ck-bg-background ck-p-6 ck-shadow-lg ck-max-w-[22rem] ck-py-3'>
      <MobileLayout isUserModal>
        <WalletScreen isUserModal />
      </MobileLayout>
    </div>
  );
};
