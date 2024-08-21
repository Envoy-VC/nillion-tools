import type { Wallet } from '~/types/wallet';
import { CompassExtentionLogo } from '~/components/icons';

export const compassExtensionInfo: Wallet = {
  name: 'compass-extension',
  prettyName: 'Compass',
  logo: CompassExtentionLogo,
  mode: 'extension',
  mobileDisabled: true,
  rejectMessage: {
    source: 'Request rejected',
  },
  connectEventNamesOnWindow: ['compass_keystorechange'],
  downloads: [
    {
      device: 'desktop',
      browser: 'chrome',
      link: 'https://chrome.google.com/webstore/detail/compass-wallet/anokgmphncpekkhclmingpimjmcooifb',
    },
    {
      link: 'https://chrome.google.com/webstore/detail/compass-wallet/anokgmphncpekkhclmingpimjmcooifb',
    },
  ],
};
