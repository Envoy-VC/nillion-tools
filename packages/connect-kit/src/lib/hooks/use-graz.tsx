import {
  useConnect,
  useSuggestChainAndConnect,
  type WalletType as GrazWalletType,
} from 'graz';
import { useConnectWallet } from './use-connect-wallet';
import { useIsMobile } from './use-is-mobile';
import { useConnectKitStore } from './use-connect-kit-store';
import type { WalletType } from '~/types';
import { nillionTestnet } from '../chain';
import { errorHandler } from '../utils';

export const useGraz = () => {
  const { isMobile } = useIsMobile();
  const isMobileDevice = isMobile();

  const { setActiveWalletType, setError, setActiveScreen } =
    useConnectKitStore();
  const { chainOptions } = useConnectWallet();
  const { suggestAndConnectAsync } = useSuggestChainAndConnect();
  const { connectAsync } = useConnect();

  const connect = async (type: WalletType) => {
    try {
      setError(null);
      setActiveWalletType(type);
      setActiveScreen('connecting');

      const chainInfo = chainOptions.chainInfos.find(
        (i) => i.chainId === chainOptions.defaultChain
      );

      let res;

      if (chainInfo && !isMobileDevice) {
        res = await suggestAndConnectAsync({
          chainInfo: nillionTestnet,
          walletType: type as GrazWalletType,
        });
      } else {
        res = await connectAsync({
          chainId: chainOptions.defaultChain,
          walletType: type as GrazWalletType,
        });
      }

      const address = res.accounts[chainOptions.defaultChain]?.bech32Address;
      if (!address) {
        throw new Error('Failed to connect');
      }
    } catch (error) {
      const serialized = errorHandler(error);
      setError(serialized.message ?? 'An Unknown Error Occurred');
      setActiveScreen('error');
    }
  };

  return { connect };
};
