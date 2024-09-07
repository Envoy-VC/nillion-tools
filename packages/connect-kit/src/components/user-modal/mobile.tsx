import { UserButton } from '../user-button';

import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer';
import { useConnectKitStore, useConnectWallet } from '~/lib/hooks';

export const MobileUserModal = () => {
  const { onUserModalOpenChange, isUserModalOpen } = useConnectKitStore();

  const { mode } = useConnectWallet();

  if (mode === 'modal') {
    return (
      <Drawer open={isUserModalOpen} onOpenChange={onUserModalOpenChange}>
        <DrawerTrigger>
          <UserButton />
        </DrawerTrigger>
        <DrawerContent className='ck-rounded-t-[2rem]'>
          test content
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className='!ck-rounded-3xl !ck-px-0 !ck-w-full ck-gap-4 ck-border ck-bg-background ck-p-6 ck-shadow-lg ck-max-w-[22rem] ck-py-3'>
      test content
    </div>
  );
};
