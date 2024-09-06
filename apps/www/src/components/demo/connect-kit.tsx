'use client';

import React, { useState } from 'react';

import { ConnectWallet } from '@nillion-tools/connect-kit';

import { Button } from '../ui/button';

export const ConnectKitDemo = () => {
  const [size, setSize] = useState<'compact' | 'wide'>('compact');
  return (
    <div className='mx-auto flex w-fit flex-col items-center justify-center gap-24 py-24'>
      <Button
        onClick={() => {
          setSize(size === 'compact' ? 'wide' : 'compact');
        }}
      >
        Current Size: {size}
      </Button>
      <ConnectWallet
        modalOptions={{
          title: 'Sign In',
          size,
          termsOfServiceUrl: '/terms',
          privacyPolicyUrl: '/privacy',
        }}
      />
    </div>
  );
};
