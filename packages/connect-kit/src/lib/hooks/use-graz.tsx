import {
  useConnect,
  useSuggestChainAndConnect,
  type WalletType as GrazWalletType,
} from 'graz';
import { useConnectWallet } from './use-connect-wallet';
import { useIsMobile } from './use-is-mobile';
import { useConnectKitStore } from './use-connect-kit-store';
import type { WalletType } from '~/types';
import { errorHandler } from '../utils';

export const useGraz = () => {
  const { isMobile } = useIsMobile();
  const isMobileDevice = isMobile();

  const {
    setActiveWalletType,
    setError,
    setActiveScreen,
    defaultChain,
    chains,
  } = useConnectKitStore();
  const { chain } = useConnectWallet();
  const { suggestAndConnectAsync } = useSuggestChainAndConnect();
  const { connectAsync } = useConnect();

  const connect = async (type: WalletType) => {
    try {
      setError(null);
      setActiveWalletType(type);
      setActiveScreen('connecting');

      let res;
      const chainToConnect = chain ?? defaultChain?.chainId;
      if (!chainToConnect) {
        throw new Error('Chain not found');
      }

      const chainInfo = chains.filter((c) => c.chainId === chainToConnect)[0];

      if (!isMobileDevice && chainInfo) {
        res = await suggestAndConnectAsync({
          chainInfo,
          walletType: type as GrazWalletType,
        });
      } else {
        res = await connectAsync({
          chainId: chainToConnect,
          walletType: type as GrazWalletType,
        });
      }

      const address = res.accounts[chainToConnect]?.bech32Address;
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
