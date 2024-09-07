import Avatar from 'avvvatars-react';
import { useConnectKitStore, useGraz, useUser } from '~/lib/hooks';
import { truncate } from '~/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { ArrowRightLeftIcon, ChevronRightIcon, LogOutIcon } from 'lucide-react';

export const UserModalHome = () => {
  const { account, balance, currency, chainInfo } = useUser();
  const { onDisconnect } = useGraz();
  const { setActiveScreen } = useConnectKitStore();
  if (!account) return null;

  return (
    <div className='ck-flex ck-flex-col'>
      <div className='ck-flex ck-flex-col ck-gap-1 ck-items-center ck-pb-12'>
        <div className='ck-bg-secondary ck-rounded-full ck-w-20 ck-h-20 ck-flex ck-items-center ck-justify-center'>
          <Avatar
            size={64}
            style='shape'
            value={Buffer.from(account.pubKey).toString('hex')}
          />
        </div>
        <div className='ck-text-xl ck-font-semibold'>
          {truncate(account.bech32Address, 10)}
        </div>
        {balance.isLoading && !balance.formatted ? (
          <Skeleton className='ck-w-[64px] ck-h-[14px] ck-rounded-xl' />
        ) : (
          <div className='ck-flex ck-flex-row ck-items-center ck-gap-2'>
            <img
              alt={chainInfo?.chainName}
              className='ck-w-5 ck-h-5 ck-rounded-full !my-0 !py-0'
              src={currency.imageUrl}
            />
            <span className='ck-text-sm ck-font-semibold ck-text-muted-foreground ck-leading-[1]'>
              {balance.formatted}
            </span>
          </div>
        )}
      </div>
      <div className='ck-flex ck-flex-col ck-gap-2'>
        <Button
          className='ck-w-full !ck-rounded-2xl ck-flex ck-flex-row ck-items-center ck-gap-2 !ck-justify-between ck-h-12'
          variant='secondary'
        >
          <div className='ck-flex ck-flex-row ck-items-center ck-gap-2'>
            <img
              alt={chainInfo?.chainName}
              className='ck-w-8 ck-h-8 ck-rounded-full !my-0 !py-0'
              src={currency.imageUrl}
            />
            <span className='ck-text-base ck-font-semibold ck-text-muted-foreground ck-leading-[1]'>
              {chainInfo?.chainName}
            </span>
          </div>
          <ChevronRightIcon
            className='ck-w-6 ck-h-6 ck-text-muted-foreground'
            strokeWidth={2}
          />
        </Button>
        <Button
          className='ck-w-full !ck-rounded-2xl ck-flex ck-flex-row ck-items-center ck-gap-2 !ck-justify-between ck-h-12'
          variant='secondary'
          onClick={() => {
            setActiveScreen('activity');
          }}
        >
          <div className='ck-flex ck-flex-row ck-items-center ck-gap-2'>
            <div className='ck-h-8 ck-w-8 ck-rounded-full ck-bg-[#E2E6FB] ck-flex ck-items-center ck-justify-center'>
              <ArrowRightLeftIcon
                className='ck-w-4 ck-h-4 ck-rounded-full !my-0 !py-0 ck-text-[#677DFF]'
                strokeWidth={2.5}
              />
            </div>
            <span className='ck-text-base ck-font-semibold ck-text-muted-foreground ck-leading-[1]'>
              Activity
            </span>
          </div>
          <ChevronRightIcon
            className='ck-w-6 ck-h-6 ck-text-muted-foreground'
            strokeWidth={2}
          />
        </Button>
        <Button
          className='ck-w-full !ck-rounded-2xl ck-flex ck-flex-row ck-items-center ck-gap-2 !ck-justify-start ck-h-12'
          variant='secondary'
          onClick={onDisconnect}
        >
          <div className='ck-h-8 ck-w-8 ck-rounded-full ck-bg-[#E6E7E7] ck-flex ck-items-center ck-justify-center'>
            <LogOutIcon
              className='ck-w-4 ck-h-4 ck-rounded-full !my-0 !py-0 ck-text-[#788686]'
              strokeWidth={2.5}
            />
          </div>
          <span className='ck-text-base ck-font-semibold ck-text-muted-foreground ck-leading-[1]'>
            Disconnect
          </span>
        </Button>
      </div>
    </div>
  );
};
