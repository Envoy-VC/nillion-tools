import type { ChainInfo } from '@keplr-wallet/types';
import { createContext, useReducer, type ReactNode } from 'react';
import * as wallets from '~/lib/wallets';

import type { WalletType, Screen } from '~/types';

export const supportedWallets = {
  keplr: wallets.keplrExtensionInfo,
  wc_keplr_mobile: wallets.keplrMobileInfo,
  leap: wallets.leapExtensionInfo,
  wc_leap_mobile: wallets.leapMobileInfo,
  vectis: wallets.vectisExtensionInfo,
  cosmostation: wallets.cosmostationExtensionInfo,
  wc_cosmostation_mobile: wallets.cosmostationMobileInfo,
  station: wallets.stationExtensionInfo,
  xdefi: wallets.xdefiExtensionInfo,
  compass: wallets.compassExtensionInfo,
};

export interface ConnectKitState {
  supportedWallets: typeof supportedWallets;
  isModalOpen: boolean;
  activeScreen: Screen;
  activeWalletType: WalletType | null;
  error: string | null;
  showAllWallets: boolean;
  chains: ChainInfo[];
  defaultChain?: ChainInfo;
}

export type ConnectKitAction =
  | { type: 'SET_IS_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_ACTIVE_WALLET_TYPE'; payload: WalletType | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SHOW_ALL_WALLETS'; payload: boolean }
  | { type: 'SET_ACTIVE_SCREEN'; payload: Screen }
  | { type: 'SET_IS_USER_MODAL_OPEN'; payload: boolean };

const initialState: ConnectKitState = {
  supportedWallets,
  isModalOpen: false,
  activeScreen: 'home',
  activeWalletType: null,
  error: null,
  showAllWallets: false,
  chains: [],
};

const connectKitReducer = (
  state: ConnectKitState,
  action: ConnectKitAction
): ConnectKitState => {
  switch (action.type) {
    case 'SET_IS_MODAL_OPEN':
      return { ...state, isModalOpen: action.payload };
    case 'SET_ACTIVE_WALLET_TYPE':
      return { ...state, activeWalletType: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SHOW_ALL_WALLETS':
      return { ...state, showAllWallets: action.payload };
    case 'SET_ACTIVE_SCREEN':
      return { ...state, activeScreen: action.payload };
    default:
      return state;
  }
};

export interface ConnectKitActions {
  setIsModalOpen: (isOpen: boolean) => void;
  setActiveWalletType: (walletType: WalletType | null) => void;
  setError: (error: string | null) => void;
  setShowAllWallets: (showAllWallets: boolean) => void;
  setActiveScreen: (activeScreen: Screen) => void;
}

export type ConnectKitProps = ConnectKitState & ConnectKitActions;

export const ConnectKitContext = createContext<ConnectKitProps>({
  ...initialState,
  setIsModalOpen: () => null,
  setActiveWalletType: () => null,
  setError: () => null,
  setShowAllWallets: () => null,
  setActiveScreen: () => null,
});

export interface ConnectKitProviderProps {
  children?: ReactNode;
  chains?: ChainInfo[];
  defaultChain?: ChainInfo;
}

export const ConnectKitProvider = (props: ConnectKitProviderProps) => {
  const [state, dispatch] = useReducer(connectKitReducer, initialState);

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  }

  const actions: ConnectKitActions = {
    setIsModalOpen: (isOpen: boolean) =>
      dispatch({ type: 'SET_IS_MODAL_OPEN', payload: isOpen }),
    setActiveWalletType: (walletType: WalletType | null) =>
      dispatch({ type: 'SET_ACTIVE_WALLET_TYPE', payload: walletType }),
    setError: (error: string | null) =>
      dispatch({ type: 'SET_ERROR', payload: error }),
    setShowAllWallets: (showAllWallets: boolean) =>
      dispatch({ type: 'SET_SHOW_ALL_WALLETS', payload: showAllWallets }),
    setActiveScreen: (activeScreen: Screen) =>
      dispatch({ type: 'SET_ACTIVE_SCREEN', payload: activeScreen }),
  };

  return (
    <ConnectKitContext.Provider
      value={{
        ...state,
        chains: props.chains ?? [],
        defaultChain: props.defaultChain,
        ...actions,
      }}
    >
      {props.children}
    </ConnectKitContext.Provider>
  );
};
