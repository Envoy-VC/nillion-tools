import { createContext } from 'react';

import * as wallets from '~/lib/wallets';

import { createStore } from 'zustand';

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

export type WalletType = keyof typeof supportedWallets;

export interface ConnectKitState {
  supportedWallets: typeof supportedWallets;
  isModalOpen: boolean;
  isUserModalOpen: boolean;
  activeWalletType: WalletType | null;
  error: string | null;
  showAllWallets: boolean;
}

export interface ConnectKitActions {
  setIsModalOpen: (isOpen: boolean) => void;
  setActiveWalletType: (walletType: WalletType | null) => void;
  setError: (error: string | null) => void;
  setShowAllWallets: (showAllWallets: boolean) => void;
  setUserModalOpen: (isUserModalOpen: boolean) => void;
}

export type ConnectKitProps = ConnectKitState & ConnectKitActions;
export type ConnectKitStore = ReturnType<typeof createConnectKitStore>;

export const createConnectKitStore = () => {
  const defaultProps: ConnectKitState = {
    supportedWallets,
    isModalOpen: false,
    activeWalletType: null,
    error: null,
    showAllWallets: false,
    isUserModalOpen: false,
  };

  return createStore<ConnectKitProps>()((set) => ({
    ...defaultProps,
    setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
    setActiveWalletType: (activeWalletType) => set({ activeWalletType }),
    setError: (error) => set({ error }),
    setShowAllWallets: (showAllWallets) => set({ showAllWallets }),
    setUserModalOpen: (isUserModalOpen) => set({ isUserModalOpen }),
  }));
};

export const ConnectKitContext = createContext<ConnectKitStore | null>(null);
