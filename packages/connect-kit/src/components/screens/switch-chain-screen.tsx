import { useConnectKitStore, useGraz } from '~/lib/hooks';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from '../ui/button';

import { truncate } from '~/lib/utils';
import { NetworkIcon } from 'lucide-react';

export const SwitchChainScreen = () => {
  const { chains } = useConnectKitStore();
  const { onSwitchChain } = useGraz();

  return (
    <div className='ck-flex ck-flex-col'>
      <ScrollArea className='ck-h-[400px] ck-my-4 ck-overflow-scroll'>
        <div className='ck-grid ck-grid-cols-4 ck-gap-2'>
          {chains.map((chain) => {
            const chainImage =
              chain.chainSymbolImageUrl ??
              chain.currencies[0]?.coinImageUrl ??
              chain.stakeCurrency?.coinImageUrl ??
              chain.feeCurrencies[0]?.coinImageUrl;
            return (
              <Button
                key={chain.chainId}
                className='ck-h-24 ck-rounded-3xl ck-flex ck-flex-col ck-justify-start ck-items-center ck-gap-2'
                variant='secondary'
                onClick={async () => await onSwitchChain(chain.chainId)}
              >
                {chainImage ? (
                  <img
                    alt={chain.chainName}
                    className='ck-h-10 ck-w-10 ck-rounded-full ck-mb-2 !ck-my-0 !ck-py-0'
                    src={chainImage}
                  />
                ) : (
                  <NetworkIcon className='ck-text-muted-foreground ck-h-10 ck-w-10' />
                )}
                <div className='ck-text-muted-foreground ck-text-[10px]'>
                  {truncate(chain.chainName, 10, false)}
                </div>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
