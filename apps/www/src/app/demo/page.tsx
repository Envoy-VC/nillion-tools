'use client';

import React, { useContext } from 'react';

import { authenticate, register } from '~/lib/helpers/webauthn';

import { KeyChainContext } from '~/providers';

import { Button } from '~/components/ui/button';

const DemoPage = () => {
  const { webAuthnManager, keyChain } = useContext(KeyChainContext);
  const onRegister = async () => {
    await register('123', webAuthnManager);
  };

  const onAuthenticate = async () => {
    const res = await authenticate('123', webAuthnManager);
    console.log(res);
  };

  const onCreateKey = async () => {
    const res = await keyChain.createKey('123');
    console.log(res);
  };

  const onDecryptKey = async () => {
    const key = await keyChain.getKey('123');
    if (!key) {
      throw new Error('Key not found');
    }
    const res = await keyChain.decryptKey(key);
    console.log(res);
  };

  return (
    <div className='flex flex-col gap-3`'>
      <Button className='w-fit' onClick={onRegister}>
        Register
      </Button>
      <Button className='w-fit' onClick={onAuthenticate}>
        Authenticate
      </Button>
      <Button className='w-fit' onClick={onCreateKey}>
        Create Key
      </Button>

      <Button className='w-fit' onClick={onDecryptKey}>
        Decrypt Key
      </Button>
    </div>
  );
};

export default DemoPage;
