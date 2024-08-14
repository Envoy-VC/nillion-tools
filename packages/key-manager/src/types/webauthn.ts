import type {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  AuthenticationExtensionsClientInputs,
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
  AuthenticationExtensionsClientOutputs,
  AuthenticatorTransportFuture,
  CredentialDeviceType,
  Base64URLString,
} from '@simplewebauthn/types';

type WithPRF<T> = Omit<T, 'extensions'> & {
  extensions?: AuthenticationExtensionsClientInputs & {
    prf: {
      eval: {
        first: Buffer;
      };
    };
  };
};

export type PublicKeyCredentialCreationOptionsJSONWithPRF =
  WithPRF<PublicKeyCredentialCreationOptionsJSON>;

export type PublicKeyCredentialRequestOptionsJSONWitPRF =
  WithPRF<PublicKeyCredentialRequestOptionsJSON>;

export type RegistrationResponseJSONWitPRF = Omit<
  RegistrationResponseJSON,
  'clientExtensionResults'
> & {
  clientExtensionResults: AuthenticationExtensionsClientOutputs & {
    prf?: {
      enabled: boolean;
    };
  };
};

export type AuthenticationResponseJSONWithPRF = Omit<
  AuthenticationResponseJSON,
  'clientExtensionResults'
> & {
  clientExtensionResults: AuthenticationExtensionsClientOutputs & {
    prf?: {
      results: {
        first: Buffer;
      };
    };
  };
};

export interface EncryptDataProps {
  keyData: Uint8Array;
  data: BufferSource;
}

export interface DecryptDataProps {
  keyData: Uint8Array;
  nonce: Uint8Array;
  encryptedData: BufferSource;
}

interface UserModel {
  id: string;
  username: string;
}

export interface Passkey {
  id: Base64URLString;
  publicKey: Uint8Array;
  user: UserModel;
  webauthnUserID: Base64URLString;
  counter: number;
  deviceType: CredentialDeviceType;
  backedUp: boolean;
  transports?: AuthenticatorTransportFuture[];
}
