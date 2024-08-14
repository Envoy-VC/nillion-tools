import { createContext, useContext, type PropsWithChildren } from 'react';
import type { KeyChainProviderProps } from '../../types/react';
import type { KeyType } from '../../types/keychain';
import { KeyChain } from '../../keychain';
import { InMemoryDataSource } from '../../storage';

const KeyChainContext = createContext<KeyChainProviderProps>({
  keyChain: new KeyChain(
    new InMemoryDataSource<KeyType>(),
    () => new Uint8Array(),
    () => new Uint8Array()
  ),
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

  if ('webAuthnManager' in data) {
    return {
      keyChain: data.keyChain,
      webAuthnManager: data.webAuthnManager,
    };
  }
  return {
    keyChain: data.keyChain,
    webAuthnManager: null,
  };
};
