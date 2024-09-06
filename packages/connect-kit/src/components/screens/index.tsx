import { HomeScreen } from './home';
import { ConnectingScreen } from './connecting';
import { useConnectKitStore } from '~/lib/hooks';

export const WalletScreen = () => {
  const { activeScreen } = useConnectKitStore();

  switch (activeScreen) {
    case 'home':
      return <HomeScreen />;
    case 'connecting':
      return <ConnectingScreen />;
    case 'error':
      return <ConnectingScreen />;
  }
};
