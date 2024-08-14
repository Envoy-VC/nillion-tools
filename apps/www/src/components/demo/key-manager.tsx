'use client';

import React from 'react';

import { authenticate, register } from '~/lib/helpers/webauthn';

import { useKeyChain } from '@nillion-tools/key-manager/react';

import { Button } from '~/components/ui/button';

export const KeyManagerDemo = () => {
  const { webAuthnManager, keyChain } = useKeyChain();
  const onRegister = async () => {
    if (!webAuthnManager) return;
    await register('123', webAuthnManager);
  };

  const onAuthenticate = async () => {
    if (!webAuthnManager) return;
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
    <div className='gap-3` flex flex-col'>
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
