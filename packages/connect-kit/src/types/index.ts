import { type CSSProperties } from 'react';
import type { supportedWallets } from '~/providers';

type WelcomeScreen =
  | {
      img?: { height?: number; src: string; width?: number };
      subtitle?: string;
      title?: string;
    }
  | (() => React.ReactNode);

export interface ConnectWalletProps {
  mode: 'inline' | 'modal';
  signInButton: {
    label: string;
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
    title: string;
    titleIcon?: string;
    welcomeScreen?: WelcomeScreen;
  };
}

export type WalletType = keyof typeof supportedWallets;
export type Screen = 'home' | 'connecting' | 'error';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object | undefined
      ? DeepPartial<T[P]>
      : T[P];
};
