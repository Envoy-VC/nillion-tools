import { useConnectKitStore, useConnectWallet } from '~/lib/hooks';

import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { UserButton } from '../user-button';
import { DesktopLayout } from '../layouts';
import { WalletScreen } from '../screens';

export const DesktopUserModal = () => {
  const { isModalOpen, onDialogOpenChange } = useConnectKitStore();

  const { mode } = useConnectWallet();

  if (mode === 'modal') {
    return (
      <Dialog open={isModalOpen} onOpenChange={onDialogOpenChange}>
        <DialogTrigger>
          <UserButton />
        </DialogTrigger>
        <DialogContent
          className='!ck-rounded-3xl !ck-px-0 ck-w-full ck-py-4 ck-max-w-[22rem]'
          showCloseButton={false}
        >
          <DesktopLayout isUserModal>
            <WalletScreen isUserModal />
          </DesktopLayout>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className='!ck-rounded-3xl !ck-px-0 ck-w-full ck-gap-0 ck-border ck-bg-background ck-p-6 ck-shadow-lg sm:ck-rounded-lg ck-max-w-[22rem] ck-py-4'>
      <DesktopLayout isUserModal>
        <WalletScreen isUserModal />
      </DesktopLayout>
    </div>
  );
};
