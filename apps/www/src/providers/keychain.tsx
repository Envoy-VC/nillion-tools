'use client';

import React, { type PropsWithChildren, createContext } from 'react';

import { authenticate } from '~/lib/helpers/webauthn';

import { KeyChain } from '@nillion-tools/key-manager/keychain';
import { IndexedDBDataSource } from '@nillion-tools/key-manager/storage';
import type { KeyType, Passkey } from '@nillion-tools/key-manager/types';
import {
  WebAuthnManager,
  decryptData,
  encryptData,
} from '@nillion-tools/key-manager/webauthn/browser';

export const KeyChainContext = createContext<{
  keyChain: KeyChain;
  webAuthnManager: WebAuthnManager;
}>({
  keyChain: new KeyChain(
    new IndexedDBDataSource<KeyType>('keychain'),
    () => new Uint8Array(),
    () => new Uint8Array()
  ),
  webAuthnManager: new WebAuthnManager(
    new IndexedDBDataSource<Passkey>('webauthn')
  ),
});

export const KeyChainProvider = ({ children }: PropsWithChildren) => {
  const keyChainDB = new IndexedDBDataSource<KeyType>('keychain');
  const webauthnDB = new IndexedDBDataSource<Passkey>('webauthn');

  const webAuthnManager = new WebAuthnManager(webauthnDB);

  const encrypt = async (id: string, data: Uint8Array, nonce: Uint8Array) => {
    const passKey = await webAuthnManager.getPasskey(id);
    if (!passKey) {
      throw new Error('No passkey found');
    }
    const { response } = await authenticate(id, webAuthnManager);
    const { encrypted } = await encryptData({
      keyData: new Uint8Array(
        response.clientExtensionResults.prf?.results.first ?? []
      ),
      nonce,
      data,
    });

    return new Uint8Array(encrypted);
  };

  const decrypt = async (id: string, encryptedData: Uint8Array) => {
    const passKey = await webAuthnManager.getPasskey(id);
    if (!passKey) {
      throw new Error('No passkey found');
    }
    const { response } = await authenticate(id, webAuthnManager);
    const key = await keyChainDB.get(id);
    if (!key) {
      throw new Error('Passkey Not Found');
    }
    const { decrypted } = await decryptData({
      keyData: new Uint8Array(
        response.clientExtensionResults.prf?.results.first ?? []
      ),
      nonce: key.nonce,
      encryptedData,
    });

    return new Uint8Array(decrypted);
  };

  const keyChain = new KeyChain(keyChainDB, encrypt, decrypt);

  return (
    <KeyChainContext.Provider
      value={{
        keyChain,
        webAuthnManager,
      }}
    >
      {children}
    </KeyChainContext.Provider>
  );
};
