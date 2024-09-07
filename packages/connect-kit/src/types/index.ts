import type { ChainInfo } from '@keplr-wallet/types';
import type { ReactNode, CSSProperties } from 'react';
import type { supportedWallets } from '~/providers';

type WelcomeScreen =
  | {
      img?: { height?: number; src: string; width?: number };
      subtitle?: string;
      title?: string;
    }
  | (() => React.ReactNode);

export interface ConnectWalletProps {
  chainOptions: {
    chains: ChainInfo[];
    defaultChain: ChainInfo;
  };
  mode: 'inline' | 'modal';
  signInButton: {
    label: ReactNode;
    className: string;
    style: CSSProperties;
  };
  switchButton: {
    className: string;
    label: string;
    style: React.CSSProperties;
  };
  modalOptions: {
    size: 'compact' | 'wide';
    privacyPolicyUrl?: string;
    termsOfServiceUrl?: string;
    title: ReactNode;
    welcomeScreen?: WelcomeScreen;
  };
}

export type WalletType = keyof typeof supportedWallets;
export type Screen = 'home' | 'connecting' | 'error';

export interface PartialConnectWalletProps {
  chainOptions?: {
    chains?: ChainInfo[];
    defaultChain?: ChainInfo;
  };
  mode?: 'inline' | 'modal';
  signInButton?: {
    label?: string;
    className?: string;
    style?: CSSProperties;
  };
  switchButton?: {
    className?: string;
    label?: string;
    style?: React.CSSProperties;
  };
  modalOptions?: {
    size?: 'compact' | 'wide';
    privacyPolicyUrl?: string;
    termsOfServiceUrl?: string;
    title?: ReactNode;
    welcomeScreen?: WelcomeScreen;
  };
}
