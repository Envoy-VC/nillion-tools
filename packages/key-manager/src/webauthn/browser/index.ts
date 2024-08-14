import * as browser from '@simplewebauthn/browser';
import type * as Types from '../../types/webauthn';

export const startRegistration = async (
  props: Types.PublicKeyCredentialCreationOptionsJSONWithPRF
) => {
  const cred = (await browser.startRegistration(
    props
  )) as Types.RegistrationResponseJSONWitPRF;

  if (!cred.clientExtensionResults.prf?.enabled) {
    throw new Error('PRF Extension is not supported');
  }

  return cred;
};

export const startAuthentication = async (
  props: Types.PublicKeyCredentialRequestOptionsJSONWitPRF
) => {
  const response = (await browser.startAuthentication(
    props
  )) as Types.AuthenticationResponseJSONWithPRF;

  return response;
};

const constructEncryptionKey = async (keyData: Uint8Array) => {
  const keyDerivationKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    'HKDF',
    false,
    ['deriveKey']
  );

  const label = 'encryption key';
  const info = new TextEncoder().encode(label);
  const salt = new Uint8Array();

  const encryptionKey = await crypto.subtle.deriveKey(
    { name: 'HKDF', info, salt, hash: 'SHA-256' },
    keyDerivationKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );

  return encryptionKey;
};

export const encryptData = async ({
  nonce,
  keyData,
  data,
}: Types.EncryptDataProps) => {
  const encryptionKey = await constructEncryptionKey(keyData);

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: nonce },
    encryptionKey,
    data
  );

  return { encrypted };
};

export const decryptData = async ({
  keyData,
  nonce,
  encryptedData,
}: Types.DecryptDataProps) => {
  const encryptionKey = await constructEncryptionKey(keyData);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: nonce },
    encryptionKey,
    encryptedData
  );

  return { decrypted };
};

const base64URLStringToBuffer = browser.base64URLStringToBuffer;
const browserSupportsWebAuthn = browser.browserSupportsWebAuthn;
const browserSupportsWebAuthnAutofill = browser.browserSupportsWebAuthnAutofill;
const bufferToBase64URLString = browser.bufferToBase64URLString;
const platformAuthenticatorIsAvailable =
  browser.platformAuthenticatorIsAvailable;
const WebAuthnError = browser.WebAuthnError;

export {
  base64URLStringToBuffer,
  browserSupportsWebAuthn,
  browserSupportsWebAuthnAutofill,
  bufferToBase64URLString,
  platformAuthenticatorIsAvailable,
  WebAuthnError,
};

export * from './manager';
