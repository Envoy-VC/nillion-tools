import type { PeerId } from '@libp2p/interface';
import { sha512 } from '@noble/hashes/sha512';
import { base58btc } from 'multiformats/bases/base58';
import { base64 } from 'multiformats/bases/base64';
import { fromString } from 'multiformats/bytes';

import crypto from 'node:crypto';
import { concatBytes } from '@noble/hashes/utils';

export const peerIdToUserID = (peerId: PeerId) => {
  const pubKey = (peerId.publicKey ?? new Uint8Array(36)).subarray(4);
  const hash = sha512.create().update(pubKey).digest();
  const userId = base58btc.encode(hash);
  return userId;
};

export const peerIdToUserKey = (peerId: PeerId) => {
  const privKey = (peerId.privateKey ?? new Uint8Array(68)).subarray(4, 36);
  console.log(peerId.privateKey);
  const userKey = base58btc.encode(privKey);
  return userKey;
};

export const decryptKey = (encryptedKey: string, password: string) => {
  const keyLength = 16;
  const nonceLength = 12;
  const digest = 'sha256';
  const saltLength = 16;
  const iterations = 32767;
  const algorithmTagLength = 16;
  const data = base64.decode(encryptedKey);

  const salt = data.subarray(0, saltLength);
  const ciphertextAndNonce = data.subarray(saltLength);

  const passwordBytes = fromString(password);

  const key = crypto.pbkdf2Sync(
    passwordBytes,
    salt,
    iterations,
    keyLength,
    digest
  );

  const nonce = ciphertextAndNonce.subarray(0, nonceLength);
  const ciphertext = ciphertextAndNonce.subarray(
    nonceLength,
    ciphertextAndNonce.length - algorithmTagLength
  );
  const tag = ciphertextAndNonce.subarray(ciphertext.length + nonceLength);

  const cipher = crypto.createDecipheriv('aes-128-gcm', key, nonce);
  cipher.setAuthTag(tag);
  const final = Uint8Array.from(cipher.final());
  const prefix = Uint8Array.from(cipher.update(ciphertext));
  return concatBytes(prefix, final);
};
