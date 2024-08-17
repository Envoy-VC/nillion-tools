import type { KeyChain } from '../keychain';
import type { WebAuthnManager } from '../webauthn/browser/manager';

export interface KeyChainProviderProps {
  keyChain: KeyChain;
  webAuthnManager: WebAuthnManager | null;
}
