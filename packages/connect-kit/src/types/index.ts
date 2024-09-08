import type { ReactNode, CSSProperties } from 'react';
import type { supportedWallets } from '~/providers';

export interface ButtonOptions {
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export interface ModalOptions {
  size?: 'compact' | 'wide';
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
  title?: ReactNode;
  welcomeScreen?: React.ReactNode;
}

export interface ConnectWalletProps {
  mode: 'inline' | 'modal';
  chain?: string;
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
    welcomeScreen?: React.ReactNode;
  };
}

export type WalletType = keyof typeof supportedWallets;
export type Screen =
  | 'home'
  | 'connecting'
  | 'error'
  | 'activity'
  | 'switch-chain';

export interface PartialConnectWalletProps {
  mode?: 'inline' | 'modal';
  chain?: string;
  signInButton?: ButtonOptions;
  switchButton?: ButtonOptions;
  modalOptions?: ModalOptions;
}
