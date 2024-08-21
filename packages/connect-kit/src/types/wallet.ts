import type * as React from 'react';

export declare type WalletMode =
  | 'ledger'
  | 'extension'
  | 'wallet-connect'
  | 'social-login';

export interface DownloadInfo extends DappEnv {
  icon?: string | ((props: unknown) => React.ReactNode);
  link: string;
}

export declare type OS = 'android' | 'ios' | 'windows' | 'macos';
export declare type BrowserName = 'chrome' | 'firefox' | 'safari' | 'edge';
export declare type DeviceType = 'desktop' | 'mobile';
export interface DappEnv {
  device?: DeviceType;
  os?: OS;
  browser?: BrowserName;
}

type BufferEncoding =
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'base64url'
  | 'latin1'
  | 'binary'
  | 'hex';

export interface AppUrl {
  native?:
    | string
    | {
        android?: string;
        ios?: string;
        macos?: string;
        windows?: string;
      };
  universal?: string;
}
export interface Wallet {
  name: string;
  prettyName: string;
  mode: WalletMode;
  extends?: 'MetaMask';
  mobileDisabled: boolean | (() => boolean);
  description?: string;
  rejectMessage?:
    | {
        source: string;
        target?: string;
      }
    | string;
  rejectCode?: number;
  connectEventNamesOnWindow?: string[];
  connectEventNamesOnClient?: string[];
  supportedChains?: string[];
  downloads?: DownloadInfo[];
  logo?:
    | string
    | {
        major: string;
        minor: string;
      };
  walletconnect?: {
    name: string;
    projectId: string;
    requiredNamespaces?: {
      methods: string[];
      events: string[];
    };
    encoding?: BufferEncoding;
    mobile?: AppUrl;
    formatNativeUrl?: (
      appUrl: string,
      wcUri: string,
      os: OS | undefined,
      name: string
    ) => string;
    formatUniversalUrl?: (
      appUrl: string,
      wcUri: string,
      name: string
    ) => string;
  };
}
