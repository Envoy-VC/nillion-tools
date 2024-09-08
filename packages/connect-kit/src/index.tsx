import './styles/globals.css';

export { ConnectKitProvider, supportedWallets } from './providers/connectkit';
export { useConnectWallet, useUser } from './lib/hooks';
export * from './components';
export * from './lib/chain';
export type {
  ButtonOptions,
  ModalOptions,
  PartialConnectWalletProps as ConnectWalletProps,
  WalletType,
  Screen,
} from './types';

export * from './types/wallet';
