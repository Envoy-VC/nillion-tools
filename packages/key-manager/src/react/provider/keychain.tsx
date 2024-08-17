import { createContext, useContext, type PropsWithChildren } from 'react';
import type { KeyChainProviderProps } from '../../types/react';
import type { KeyType, Passkey } from '../../types';
import { KeyChain } from '../../keychain';
import { InMemoryDataSource } from '../../storage';
import { WebAuthnManager } from '../../webauthn/browser';

const KeyChainContext = createContext<KeyChainProviderProps>({
  keyChain: new KeyChain({
    store: new InMemoryDataSource<KeyType>(),
    encryptFn: () => new Uint8Array(),
    decryptFn: () => new Uint8Array(),
  }),
  webAuthnManager: new WebAuthnManager({
    store: new InMemoryDataSource<Passkey>(),
  }),
});

export const KeyChainProvider = ({
  children,
  ...props
}: KeyChainProviderProps & PropsWithChildren) => {
  return (
    <KeyChainContext.Provider value={props}>
      {children}
    </KeyChainContext.Provider>
  );
};

export const useKeyChain = () => {
  const data = useContext(KeyChainContext);

  return {
    keyChain: data.keyChain,
    webAuthnManager: data.webAuthnManager,
  };
};
