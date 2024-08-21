import type { Wallet } from '~/types/wallet';
import { XDEFIExtensionLogo } from '~/components/icons';

export const xdefiExtensionInfo: Wallet = {
  name: 'xdefi-extension',
  prettyName: 'XDEFI',
  logo: XDEFIExtensionLogo,
  mode: 'extension',
  mobileDisabled: true,
  rejectMessage: {
    source: 'Request rejected',
  },
  downloads: [
    {
      device: 'desktop',
      browser: 'chrome',
      link: 'https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
    },
    {
      link: 'https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
    },
  ],
};
