import { HomeScreen } from './home';
import { ConnectingScreen } from './connecting';
import { ErrorScreen } from './error';
import { UserModalHome } from './user-modal-home';
import { useConnectKitStore } from '~/lib/hooks';

interface WalletScreenProps {
  isUserModal?: boolean;
}

export const WalletScreen = ({ isUserModal = false }: WalletScreenProps) => {
  const { activeScreen } = useConnectKitStore();

  switch (activeScreen) {
    case 'home':
      return !isUserModal ? <HomeScreen /> : <UserModalHome />;
    case 'connecting':
      return <ConnectingScreen />;
    case 'error':
      return <ErrorScreen />;
  }
};
