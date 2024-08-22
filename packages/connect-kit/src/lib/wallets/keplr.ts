/* eslint-disable @typescript-eslint/no-unsafe-member-access -- safe */
import type { Wallet } from '~/types/wallet';
import { KeplrExtensionIcon } from '~/components/icons';

export const keplrExtensionInfo: Wallet = {
  name: 'keplr-extension',
  prettyName: 'Keplr',
  logo: KeplrExtensionIcon,
  mode: 'extension',
  mobileDisabled: () =>
    !(
      typeof document !== 'undefined' &&
      document.readyState === 'complete' &&
      window.keplr &&
      window.keplr.mode === 'mobile-web'
    ),
  rejectMessage: {
    source: 'Request rejected',
  },
  connectEventNamesOnWindow: ['keplr_keystorechange'],
  supportedChains: [
    'agoric',
    'akash',
    'archway',
    'axelar',
    'bostrom',
    'celestia',
    'certik',
    'comdex',
    'cosmoshub',
    'cryptoorgchain',
    'dymension',
    'emoney',
    'evmos',
    'gravitybridge',
    'injective',
    'irisnet',
    'ixo',
    'juno',
    'kava',
    'kujira',
    'noble',
    'nois',
    'osmosis',
    'persistence',
    'quicksilver',
    'regen',
    'secretnetwork',
    'sentinel',
    'sifchain',
    'sommelier',
    'stargaze',
    'starname',
    'stride',
    'terra2',
    'tgrade',
    'umee',
  ],
  downloads: [
    {
      device: 'desktop',
      browser: 'chrome',
      link: 'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en',
    },
    {
      device: 'desktop',
      browser: 'firefox',
      link: 'https://addons.mozilla.org/en-US/firefox/addon/keplr/',
    },
    {
      link: 'https://www.keplr.app/download',
    },
  ],
};

export const keplrMobileInfo: Wallet = {
  name: 'keplr-mobile',
  prettyName: 'Keplr',
  logo: KeplrExtensionIcon,
  mode: 'wallet-connect',
  mobileDisabled: false,
  rejectMessage: {
    source: 'Request rejected',
  },
  downloads: [
    {
      device: 'mobile',
      os: 'android',
      link: 'https://play.google.com/store/apps/details?id=com.chainapsis.keplr&hl=en&gl=US&pli=1',
    },
    {
      device: 'mobile',
      os: 'ios',
      link: 'https://apps.apple.com/us/app/keplr-wallet/id1567851089',
    },
    {
      link: 'https://www.keplr.app/download',
    },
  ],
  connectEventNamesOnWindow: ['keplr_keystorechange'],
  supportedChains: [
    'agoric',
    'akash',
    'axelar',
    'bitcanna',
    'bitsong',
    'bostrom',
    'certik',
    'cheqd',
    'chihuahua',
    'comdex',
    'cosmoshub',
    'cryptoorgchain',
    'desmos',
    'dig',
    'emoney',
    'evmos',
    'gravitybridge',
    'injective',
    'irisnet',
    'ixo',
    'juno',
    'ki',
    'likecoin',
    'lumnetwork',
    'osmosis',
    'panacea',
    'persistence',
    'regen',
    'secretnetwork',
    'sentinel',
    'sifchain',
    'sommelier',
    'stargaze',
    'starname',
    'terra',
    'tick',
    'umee',
    'vidulum',
  ],
  walletconnect: {
    name: 'Keplr',
    projectId:
      '6adb6082c909901b9e7189af3a4a0223102cd6f8d5c39e39f3d49acb92b578bb',
    encoding: 'base64',
    requiredNamespaces: {
      methods: [
        'keplr_getKey',
        'keplr_signAmino',
        'keplr_signDirect',
        'keplr_signArbitrary',
        'keplr_enable',
        'keplr_signEthereum',
      ],
      events: ['keplr_accountsChanged'],
    },
    mobile: {
      native: {
        ios: 'keplrwallet:',
        android: 'intent:',
      },
    },
    formatNativeUrl: (
      appUrl: string,
      wcUri: string,
      os: 'android' | 'ios' | 'windows' | 'macos' | undefined,
      _name: string
    ) => {
      const plainAppUrl = appUrl.split(':')[0] ?? '';
      const encodedWcUrl = encodeURIComponent(wcUri);
      switch (os) {
        case 'ios':
          return `${plainAppUrl}://wcV2?${encodedWcUrl}`;
        case 'android':
          return `intent://wcV2?${encodedWcUrl}#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;`;
        default:
          return `${plainAppUrl}://wcV2?${encodedWcUrl}`;
      }
    },
  },
};
