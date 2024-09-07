'use client';

import React, { useState } from 'react';

import {
  ConnectWallet,
  type ConnectWalletProps,
} from '@nillion-tools/connect-kit';

import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

import { ConnectKitOptions } from './connect-kit-options';

export const ConnectKitDemo = () => {
  const [connectProps, setConnectProps] = useState<ConnectWalletProps>({
    mode: 'inline',
  });

  return (
    <div className='my-24 flex min-w-full'>
      <div className='flex w-full flex-col gap-8 md:flex-row'>
        <div className='order-3 flex w-full basis-1/3 flex-col gap-3 md:order-1'>
          <ConnectKitOptions opts={connectProps} setOpts={setConnectProps} />
        </div>
        <div className='order-2 hidden min-h-full border-r md:block' />
        <div className='relative order-1 flex w-full basis-2/3 md:order-2'>
          <div className='grid-bg absolute inset-0 z-[-1]' />
          <div className='relative mx-auto flex h-fit w-full justify-center px-12 py-24'>
            <div className='absolute left-4 top-0'>
              <Tabs
                className='w-[400px]'
                defaultValue='modal'
                onValueChange={(value: string) => {
                  setConnectProps({
                    ...connectProps,
                    mode: value === 'button' ? 'modal' : 'inline',
                  });
                }}
              >
                <TabsList>
                  <TabsTrigger value='modal'>Modal</TabsTrigger>
                  <TabsTrigger value='button'>Button</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <ConnectWallet {...connectProps} chain='celestia' />
          </div>
        </div>
      </div>
    </div>
  );
};
