import { createContext } from 'react';
import { nillionTestnet } from '~/lib/chain';
import type { ConnectWalletProps } from '~/types';

export const ConnectWalletContext = createContext<ConnectWalletProps>({
  mode: 'modal',
  chainOptions: {
    chains: [nillionTestnet],
    defaultChain: nillionTestnet,
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
