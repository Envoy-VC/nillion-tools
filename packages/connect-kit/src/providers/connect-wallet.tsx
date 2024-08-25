import { createContext } from 'react';
import type { ConnectWalletProps } from '~/types';

export const ConnectWalletContext = createContext<ConnectWalletProps>({
  signInButton: {
    label: 'Connect Wallet',
  },
  switchButton: {
    label: 'Switch Chain',
  },
});
