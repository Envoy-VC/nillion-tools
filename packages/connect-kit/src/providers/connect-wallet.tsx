import { createContext } from 'react';
import type { ConnectWalletProps } from '~/types';

export const ConnectWalletContext = createContext<ConnectWalletProps>({
  mode: 'modal',
  chainOptions: {
    chains: [],
    defaultChain: '',
    chainInfos: [],
  },
  signInButton: {
    label: 'Connect Wallet',
    className: '',
    style: {},
  },
  switchButton: {
    label: 'Switch Chain',
    className: '',
    style: {},
  },
  modalOptions: {
    size: 'compact',
    title: 'Connect Wallet',
  },
});
