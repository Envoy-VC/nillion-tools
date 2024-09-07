/* eslint-disable no-nested-ternary -- safe */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useGraz, useUser, type TransactionType } from '~/lib/hooks';
import { cn, truncate } from '~/lib/utils';

import { ScrollArea } from '~/components/ui/scroll-area';
import { Skeleton } from '../ui/skeleton';
import { buttonVariants } from '../ui/button';

export const ActivityScreen = () => {
  const { getTxns } = useGraz();
  const { account } = useUser();
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['activity', account?.bech32Address],
    queryFn: async () => {
      return await getTxns();
    },
  });

  return (
    <ScrollArea className='ck-h-[400px] ck-my-8'>
      <div className='ck-flex ck-flex-col ck-gap-2'>
        {isLoading ? (
          <SkeletonLoader />
        ) : transactions?.length === 0 ? (
          <SkeletonLoader />
        ) : (
          <>
            {transactions?.map((tx) => (
              <TransactionPill key={tx.hash} {...tx} />
            ))}
          </>
        )}
      </div>
    </ScrollArea>
  );
};

const SkeletonLoader = () => {
  return (
    <>
      {Array(10)
        .fill(1)
        .map((_: number) => (
          <Skeleton key={_} className='ck-h-12 ck-w-full ck-rounded-xl' />
        ))}
    </>
  );
};

const TransactionPill = (props: TransactionType) => {
  const action =
    (props.attributes.message?.action ?? '').split('.').pop() ?? '';
  const fees = props.attributes.tx?.fee ?? '';
  return (
    <div
      className={cn(
        'hover:!ck-bg-secondary ck-h-12 !ck-rounded-xl ck-flex ck-flex-row !ck-items-center ck-justify-between !ck-py-0',
        buttonVariants({ variant: 'secondary' })
      )}
    >
      <div className='ck-flex ck-flex-col '>
        <div className='ck-font-medium ck-text-sm ck-text-primary'>
          <span className='ck-font-semibold'>Hash: </span>{' '}
          {truncate(props.hash, 12, true)}
        </div>

        <div className='ck-font-medium ck-text-xs ck-text-muted-foreground'>
          <span className='ck-font-semibold'>Action: </span> {action}
        </div>
      </div>

      <div className='ck-flex ck-flex-col !ck-items-end'>
        <div
          className={cn(
            'ck-rounded-sm ck-px-[6px] ck-py-[1px] ck-text-[8px] ck-uppercase ck-tracking-tight ck-font-semibold ck-leading-[1.5]',
            props.success
              ? 'ck-text-[#26b562] ck-bg-[#DAF0E4]'
              : 'ck-text-[#f44336] ck-bg-[#FCE8E6]'
          )}
        >
          {props.success ? 'Success' : 'Failed'}
        </div>

        <div className='ck-font-medium ck-text-[10px] ck-text-muted-foreground ck-leading-[1.4]'>
          {fees}
        </div>
      </div>
    </div>
  );
};
