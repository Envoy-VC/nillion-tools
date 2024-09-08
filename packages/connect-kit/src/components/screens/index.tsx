import { HomeScreen } from './home';
import { ConnectingScreen } from './connecting';
import { ErrorScreen } from './error';
import { UserModalHome } from './user-modal-home';
import { useConnectKitStore } from '~/lib/hooks';
import { ActivityScreen } from './activity-screen';
import { SwitchChainScreen } from './switch-chain-screen';

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
    case 'activity':
      return <ActivityScreen />;
    case 'switch-chain':
      return <SwitchChainScreen />;
  }
};
