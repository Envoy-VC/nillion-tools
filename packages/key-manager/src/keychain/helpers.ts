import { sha512 } from '@noble/hashes/sha512';
import { base58btc } from 'multiformats/bases/base58';

export const pubKeyToUserId = (pubKey: Uint8Array) => {
  const hash = sha512.create().update(pubKey).digest();
  return base58btc.encode(hash);
};

export const privKeyToUserKey = (privKey: Uint8Array) => {
  return base58btc.encode(privKey);
};

export const toBase58 = (data: Uint8Array) => {
  return base58btc.encode(data);
};

export const fromBase58 = (data: string) => {
  return base58btc.decode(data);
};
