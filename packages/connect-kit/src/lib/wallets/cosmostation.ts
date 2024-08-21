import type { Wallet } from '~/types/wallet';
import { CosmostationExtensionIcon } from '~/components/icons';

export const cosmostationExtensionInfo: Wallet = {
  name: 'cosmostation-extension',
  prettyName: 'Cosmostation',
  logo: CosmostationExtensionIcon,
  mode: 'extension',
  downloads: [
    {
      device: 'desktop',
      browser: 'chrome',
      link: 'https://chrome.google.com/webstore/detail/cosmostation/fpkhgmpbidmiogeglndfbkegfdlnajnf?hl=en',
    },
    {
      link: 'https://cosmostation.io/wallet/#extension',
    },
  ],
  mobileDisabled: () =>
    !('cosmostation' in window || /Cosmostation/i.test(navigator.userAgent)),
  rejectMessage: {
    source:
      'The requested account and/or method has not been authorized by the user.',
    // target:
    //   'The requested account and/or method has not been authorized by the user. \n Open Extension/App to authorize this site before retrying.',
  },
  rejectCode: 4001,
  connectEventNamesOnWindow: ['cosmostation_keystorechange'],
};

export const cosmostationMobileInfo: Wallet = {
  name: 'cosmostation-mobile',
  prettyName: 'Cosmostation Mobile',
  logo: CosmostationExtensionIcon,
  mode: 'wallet-connect',
  downloads: [
    {
      device: 'mobile',
      os: 'android',
      link: 'https://play.google.com/store/apps/details?id=wannabit.io.cosmostaion',
    },
    {
      device: 'mobile',
      os: 'ios',
      link: 'https://apps.apple.com/kr/app/cosmostation/id1459830339',
    },
    {
      link: 'https://cosmostation.io/wallet/#extension',
    },
  ],
  mobileDisabled: () =>
    'cosmostation' in window || /Cosmostation/i.test(navigator.userAgent),
  walletconnect: {
    name: 'Cosmostation',
    encoding: 'base64',
    projectId:
      'feb6ff1fb426db18110f5a80c7adbde846d0a7e96b2bc53af4b73aaf32552bea',
    formatNativeUrl: (appUrl, wcUri, _name) => {
      const plainAppUrl = appUrl.replaceAll('/', '').replaceAll(':', '');
      return `${plainAppUrl}://wc?${wcUri}`;
    },
  },
};
