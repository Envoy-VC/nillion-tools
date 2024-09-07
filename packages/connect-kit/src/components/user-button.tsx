import React, { useMemo } from 'react';

import { useConnectKitStore } from '~/lib/hooks';
import { Button } from './ui/button';
import { useAccount, useActiveChains, useBalance, useChainInfo } from 'graz';
import { truncate } from '~/lib/utils';

import Avatar from 'avvvatars-react';
import { formatBalance } from '~/lib/helpers';
import { Skeleton } from '~/components/ui/skeleton';

export const UserButton = () => {
  const { defaultChain } = useConnectKitStore();
  const { data: account } = useAccount({
    chainId: defaultChain?.chainId,
  });
  const activeChains = useActiveChains();
  const chainInfo = useChainInfo({ chainId: activeChains?.[0]?.chainId });

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
    bech32Address: account?.bech32Address,
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

  if (!account) return;

  return (
    <Button
      className='ck-flex ck-flex-row ck-h-12 !ck-px-4 ck-gap-2 !ck-rounded-2xl !ck-bg-background ck-border'
      variant='secondary'
    >
      <Avatar size={38} style='shape' value={account.bech32Address} />
      <div className='ck-flex ck-flex-col ck-items-start ck-justify-start'>
        <div className='ck-text-primary'>
          {truncate(account.bech32Address, 10)}
        </div>
        {isLoading && !formattedBalance ? (
          <Skeleton className='ck-w-[64px] ck-h-[14px] ck-rounded-xl' />
        ) : (
          <div className='ck-flex ck-flex-row ck-items-center ck-gap-1'>
            <img
              alt={defaultChain?.chainName}
              className='ck-w-3 ck-h-3 ck-rounded-full !my-0 !py-0'
              src={currency.imageUrl}
            />
            <span className='ck-text-[10px] ck-font-semibold ck-text-muted-foreground ck-leading-[1]'>
              {formattedBalance}
            </span>
          </div>
        )}
      </div>
    </Button>
  );
};
