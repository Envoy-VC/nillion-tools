import type { DataSource } from '../storage';
import type { DecryptFunction, EncryptFunction, KeyType } from '../types';
import * as ed25519 from '@noble/ed25519';
import { fromBase58, pubKeyToUserId, toBase58 } from './helpers';

export class KeyChain {
  public dataSource: DataSource<KeyType>;
  public encrypt: EncryptFunction;
  public decrypt: DecryptFunction;

  constructor(
    store: DataSource<KeyType>,
    encryptFn: EncryptFunction,
    decryptFn: DecryptFunction
  ) {
    this.dataSource = store;
    this.encrypt = encryptFn;
    this.decrypt = decryptFn;
  }

  async createKey(id: string) {
    const priv = ed25519.utils.randomPrivateKey();
    const encryptedPriv = await this.encrypt(priv);

    const pub = await ed25519.getPublicKeyAsync(priv);
    const userId = pubKeyToUserId(pub);
    const encryptedUserKey = toBase58(encryptedPriv);

    const key: KeyType = {
      id,
      userId,
      encryptedUserKey,
    };

    await this.dataSource.save(id, key, 'id');
    return key;
  }

  async getKey(id: string) {
    const key = await this.dataSource.get(id, 'id');

    if (!key) {
      throw new Error(`Key not found: ${id}`);
    }

    const decrypted = await this.decrypt(fromBase58(key.encryptedUserKey));

    return {
      id: key.id,
      userId: key.userId,
      userKey: toBase58(decrypted),
    };
  }
}
