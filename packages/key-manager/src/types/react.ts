import type { KeyChain } from '../keychain';
import type { WebAuthnManager } from '../webauthn/browser/manager';

export type KeyChainProviderProps =
  | {
      keyChain: KeyChain;
      webAuthnManager: WebAuthnManager;
    }
  | {
      keyChain: KeyChain;
    };
