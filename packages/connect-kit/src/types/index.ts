import { type CSSProperties } from 'react';

type WelcomeScreen =
  | {
      img?: { height?: number; src: string; width?: number };
      subtitle?: string;
      title?: string;
    }
  | (() => React.ReactNode);

export interface ConnectWalletProps {
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
