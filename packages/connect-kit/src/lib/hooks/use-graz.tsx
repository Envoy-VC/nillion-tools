import {
  useAccount,
  useConnect,
  useDisconnect,
  useStargateSigningClient,
  useSuggestChainAndConnect,
  type WalletType as GrazWalletType,
  useActiveWalletType,
} from 'graz';
import { useConnectWallet } from './use-connect-wallet';
import { useIsMobile } from './use-is-mobile';
import { useConnectKitStore } from './use-connect-kit-store';
import type { WalletType } from '~/types';
import { errorHandler } from '../utils';

import { useLocalStorage } from 'usehooks-ts';
import { nillionTestnet } from '../chain';

export interface TransactionType {
  hash: string;
  height: number;
  attributes: Record<string, Record<string, string>>;
  success: boolean;
}

export const useGraz = () => {
  const { isMobile } = useIsMobile();
  const isMobileDevice = isMobile();

  const {
    setActiveWalletType,
    setError,
    setActiveScreen,
    setIsModalOpen,
    defaultChain,
    chains,
  } = useConnectKitStore();

  const [activeChainId, setActiveChainId] = useLocalStorage<string>(
    'connect-kit-active-chain',
    defaultChain?.chainId ?? nillionTestnet.chainId
  );

  const { data: stargateClient } = useStargateSigningClient({
    chainId: activeChainId,
  });
  const { data: account } = useAccount({ multiChain: true });

  const { chain } = useConnectWallet();
  const { suggestAndConnectAsync } = useSuggestChainAndConnect();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { walletType } = useActiveWalletType();

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
      setActiveChainId(chainToConnect);
      setActiveScreen('home');
      setActiveWalletType(null);
    } catch (error) {
      const serialized = errorHandler(error);
      setError(serialized.message ?? 'An Unknown Error Occurred');
      setActiveScreen('error');
    }
  };

  const onDisconnect = async () => {
    await disconnectAsync();
    setActiveScreen('home');
    setIsModalOpen(false);
    setError(null);
    setActiveWalletType(null);
  };

  const getTxns = async () => {
    if (!stargateClient) return [];

    const txns = await stargateClient.searchTx([
      {
        key: 'message.sender',
        value: account?.[activeChainId]?.bech32Address ?? '',
      },
    ]);

    const eventAttributes: Record<string, Record<string, string>> = {};

    const parsedTxns = txns.map((tx) => {
      const eventTypes = Array.from(
        new Set(
          tx.events.map((e) => {
            return e.type;
          })
        )
      );
      eventTypes.forEach((type) => {
        const messageEvents = tx.events.filter((e) => e.type === type);
        const attributes: Record<string, string> = {};

        messageEvents.forEach((e) => {
          e.attributes.forEach((attr) => {
            attributes[attr.key] = attr.value;
          });
        });

        eventAttributes[type] = attributes;
      });
      return {
        hash: tx.hash,
        height: tx.height,
        attributes: eventAttributes,
        success: tx.code === 0,
      };
    });

    return parsedTxns as TransactionType[];
  };

  const onSwitchChain = async (chainId: string) => {
    try {
      let res;
      const chainInfo = chains.filter((c) => c.chainId === chainId)[0];

      if (!chainInfo) {
        throw new Error('Chain not found');
      }

      if (!isMobileDevice) {
        res = await suggestAndConnectAsync({
          chainInfo,
          walletType,
        });
      } else {
        res = await connectAsync({
          chainId,
          walletType,
        });
      }

      const address = res.accounts[chainId]?.bech32Address;
      if (!address) {
        throw new Error('Failed to connect');
      }
      setActiveChainId(chainInfo.chainId);
      setActiveScreen('home');
    } catch (error) {
      const serialized = errorHandler(error);
      setError(serialized.message ?? 'An Unknown Error Occurred');
    }
  };

  return { connect, onDisconnect, getTxns, onSwitchChain, activeChainId };
};
