'use client';

import React, { useEffect, useRef, useState } from 'react';

import { authenticate, register } from '~/lib/helpers/webauthn';

import { baseUrl, host } from '~/lib/metadata';
import { errorHandler } from '~/lib/utils';

import { useKeyChain } from '@nillion-tools/key-manager/react';
import { useQuery } from '@tanstack/react-query';
import { KeyChainProvider } from '~/providers';

import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import { Input } from '../ui/input';

export const DemoComponent = () => {
  const { webAuthnManager, keyChain } = useKeyChain();
  const containerRef = useRef<HTMLDivElement>(null);

  console.log({
    baseUrl,
    host,
  });

  const [output, setOutput] = useState<string>('');

  const [userName, setUserName] = useState<string>('');
  const [activePasskey, setActivePasskey] = useState<string>();

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [output]);

  const appendOutput = (output: string) => {
    setOutput((prev) => `${prev}${output}`);
  };

  const { data: passkeys, refetch } = useQuery({
    queryKey: ['passkeys'],
    queryFn: async () => {
      if (!webAuthnManager) return;
      const passkeys = await webAuthnManager.dataSource.load();
      return passkeys;
    },
  });
  const onRegister = async () => {
    try {
      if (userName === '') {
        throw new Error('Please enter a username');
      }
      if (!webAuthnManager) {
        throw new Error('WebAuthn Manager not initialized');
      }
      await register(userName, webAuthnManager, appendOutput);
      await refetch();
      setActivePasskey(userName);
    } catch (error) {
      const message = errorHandler(error);
      appendOutput(`❌ ${message}\n`);
    }
  };

  const onCreateKey = async () => {
    try {
      if (!activePasskey) {
        throw new Error('No active passkey selected');
      }
      appendOutput(`\n⏳ Creating Ed25519 KeyPair...\n`);
      const res = await keyChain.createKey(activePasskey);
      appendOutput(
        `✅ Key Created Successfully\n\nUserId: ${res.userId}\nEncrypted UserKey: ${res.encryptedUserKey}\n`
      );
    } catch (error) {
      const message = errorHandler(error);
      appendOutput(`❌ ${message}\n`);
    }
  };

  const onAuthenticate = async () => {
    try {
      if (!activePasskey) {
        throw new Error('No active passkey selected');
      }
      if (!webAuthnManager) {
        throw new Error('WebAuthn Manager not initialized');
      }
      await authenticate(activePasskey, webAuthnManager, appendOutput);
    } catch (error) {
      const message = errorHandler(error);
      appendOutput(`❌ ${message}\n`);
    }
  };

  const onDecryptKey = async () => {
    try {
      if (!activePasskey) {
        throw new Error('No active passkey selected');
      }
      const key = await keyChain.getKey(activePasskey);
      if (!key) {
        throw new Error('Key not found');
      }
      appendOutput(`\n⏳ Decrypting Ed25519 KeyPair...\n\n`);
      const res = await keyChain.decryptKey(key);
      appendOutput(
        `✅ Key Decrypted Successfully\nUserId: ${res.userId}\nUserKey: ${res.userKey}\n`
      );
    } catch (error) {
      const message = errorHandler(error);
      appendOutput(`❌ ${message}\n`);
    }
  };

  return (
    <div className='flex w-full flex-col gap-8 md:flex-col'>
      <div className='flex w-full basis-1/3'>
        <div className='flex w-full flex-col gap-3'>
          <Select value={activePasskey} onValueChange={setActivePasskey}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select Passkey' />
            </SelectTrigger>
            <SelectContent>
              {passkeys?.map((passkey) => {
                return (
                  <SelectItem key={passkey.id} value={passkey.id}>
                    {passkey.id}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Input
            placeholder='Username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <Button onClick={onRegister}>Register</Button>
          <Button disabled={!activePasskey} onClick={onAuthenticate}>
            Authenticate
          </Button>
          <Button disabled={!activePasskey} onClick={onCreateKey}>
            Create Key
          </Button>
          <Button disabled={!activePasskey} onClick={onDecryptKey}>
            Decrypt Key
          </Button>
        </div>
      </div>
      <div
        ref={containerRef}
        className='flex h-64 w-full max-w-4xl overflow-x-scroll whitespace-pre rounded-xl border bg-neutral-900 p-2'
      >
        {output}
      </div>
    </div>
  );
};

export const KeyManagerDemo = () => {
  return (
    <KeyChainProvider>
      <DemoComponent />
    </KeyChainProvider>
  );
};
