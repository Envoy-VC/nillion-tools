import type { Wallet } from '~/types/wallet';
import { VectisExtensionIcon } from '~/components/icons';

export const vectisExtensionInfo: Wallet = {
  name: 'vectis-extension',
  prettyName: 'Vectis',
  logo: VectisExtensionIcon,
  mode: 'extension',
  mobileDisabled: true,
  rejectMessage: {
    source:
      "The requested action couldn't be completed, it was rejected by the user.",
  },
  connectEventNamesOnWindow: ['vectis_accountChanged'],
  downloads: [
    {
      device: 'desktop',
      browser: 'chrome',
      link: 'https://chrome.google.com/webstore/detail/vectis-wallet/cgkaddoglojnmfiblgmlinfaijcdpfjm',
    },
  ],
};
