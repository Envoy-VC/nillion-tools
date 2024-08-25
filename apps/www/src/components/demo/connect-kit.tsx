import React from 'react';

import { ConnectWallet } from '@nillion-tools/connect-kit';

export const ConnectKitDemo = () => {
  return (
    <div className='mx-auto flex w-fit items-center justify-center py-24'>
      <ConnectWallet
        modalOptions={{
          title: 'Sign In',
          size: 'wide',
          termsOfServiceUrl: '/terms',
          privacyPolicyUrl: '/privacy',
        }}
      />
    </div>
  );
};
