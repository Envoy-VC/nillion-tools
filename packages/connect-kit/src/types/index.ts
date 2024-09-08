import type { ReactNode, CSSProperties } from 'react';
import type { supportedWallets } from '~/providers';

export interface ButtonOptions {
  /**
   * The label for the button
   */
  label?: string;
  /**
   * CSS class for the button
   */
  className?: string;
  style?: CSSProperties;
}

export interface ModalOptions {
  /**
   * The Size of Modal window
   *
   * @defaultValue "compact"
   */
  size?: 'compact' | 'wide';
  /**
   * The URL for the Privacy Policy
   *
   * @defaultValue undefined
   */
  privacyPolicyUrl?: string;
  /**
   * The URL for the Terms of Service
   *
   * @defaultValue undefined
   */
  termsOfServiceUrl?: string;
  /**
   * The Connect Modal Title
   *
   * @defaultValue "Connect Wallet"
   */
  title?: ReactNode;
  /**
   */
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
  /**
   * Mode for the Connect Modal
   *
   * @defaultValue = "modal"
   */
  mode?: 'inline' | 'modal';
  /**
   * The chain ID for the Connect Wallet
   *
   * @defaultValue = "nillion-testnet-1"
   */
  chain?: string;
  /**
   * Button options for the sign-in button
   *
   */
  signInButton?: ButtonOptions;
  switchButton?: ButtonOptions;
  modalOptions?: ModalOptions;
}

export interface CurrencyDetails {
  /**
   * The currency denomination
   *
   * @defaultValue "NIL"
   */
  denom?: string;
  /**
   * The minimal denomination required for this currency
   *
   * @defaultValue "unil"
   */
  minimalDenom?: string;
  /**
   * The number of decimal places for this currency
   *
   * @defaultValue 6
   */
  decimals?: number;
  /**
   * The image URL for this currency
   *
   * @defaultValue ""
   */
  imageUrl?: string;
}
