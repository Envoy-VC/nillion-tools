import { useGraz, useUser } from '~/lib/hooks';
import { Button } from './ui/button';
import { truncate } from '~/lib/utils';

import Avatar from 'avvvatars-react';
import { Skeleton } from '~/components/ui/skeleton';

export const UserButton = () => {
  const { account, balance, currency, chainInfo } = useUser();
  const { activeChainId } = useGraz();

  if (!account) return;

  return (
    <Button
      className='ck-flex ck-flex-row ck-h-12 !ck-px-2 ck-gap-2 !ck-rounded-2xl !ck-bg-background ck-border'
      variant='secondary'
    >
      <Avatar
        size={38}
        style='shape'
        value={Buffer.from(account[activeChainId]?.pubKey ?? '').toString(
          'hex'
        )}
      />
      <div className='ck-flex ck-flex-col ck-items-start ck-justify-start'>
        <div className='ck-text-primary'>
          {truncate(account[activeChainId]?.bech32Address ?? '', 10)}
        </div>
        {balance.isLoading && !balance.formatted ? (
          <Skeleton className='ck-w-[64px] ck-h-[14px] ck-rounded-xl' />
        ) : (
          <div className='ck-flex ck-flex-row ck-items-center ck-gap-1'>
            <img
              alt={chainInfo?.chainName}
              className='ck-w-3 ck-h-3 ck-rounded-full !my-0 !py-0'
              src={currency.imageUrl}
            />
            <span className='ck-text-[10px] ck-font-semibold ck-text-muted-foreground ck-leading-[1]'>
              {balance.formatted}
            </span>
          </div>
        )}
      </div>
    </Button>
  );
};
