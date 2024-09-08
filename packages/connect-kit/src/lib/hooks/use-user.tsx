import { useMemo } from 'react';
import { useConnectKitStore } from './use-connect-kit-store';
import { useAccount, useActiveChains, useBalance, useChainInfo } from 'graz';
import { formatBalance } from '../helpers';
import { useGraz } from './use-graz';

export const useUser = () => {
  const { defaultChain } = useConnectKitStore();
  const { activeChainId } = useGraz();

  const { data: account } = useAccount({ multiChain: true });
  const activeChains = useActiveChains();
  const chainInfo = useChainInfo({ chainId: activeChainId });

  const currency = useMemo(() => {
    const stakeCurrency = chainInfo?.stakeCurrency;
    const feeCurrency = chainInfo?.feeCurrencies.at(0);
    const appCurrency = chainInfo?.currencies.at(0);

    const availableCurrency = appCurrency ?? feeCurrency ?? stakeCurrency;

    return {
      denom: availableCurrency?.coinDenom,
      minimalDenom: availableCurrency?.coinMinimalDenom,
      decimals: availableCurrency?.coinDecimals,
      imageUrl: availableCurrency?.coinImageUrl,
    };
  }, [chainInfo]);

  const { data: balance, isLoading } = useBalance({
    chainId: chainInfo?.chainId ?? defaultChain?.chainId ?? '',
    denom: currency.minimalDenom,
    bech32Address: account?.[activeChainId]?.bech32Address,
  });

  const formattedBalance = useMemo(() => {
    return formatBalance(
      balance ?? {
        amount: '0',
        denom: currency.minimalDenom ?? '',
      },
      currency.decimals ?? 18,
      currency.denom ?? ''
    );
  }, [balance, currency]);

  return {
    activeChains,
    chainInfo,
    currency,
    account,
    balance: {
      formatted: formattedBalance,
      isLoading,
    },
  };
};
