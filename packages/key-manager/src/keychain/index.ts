import { type Keychain as LibP2PKeychain, keychain } from '@libp2p/keychain';
import { logger } from '@libp2p/logger';

import type { KeyChainProps } from '../types/keychain';
import { decryptKey, peerIdToUserID, peerIdToUserKey } from './helpers';

class KeyChain {
  private keychain: LibP2PKeychain;

  constructor(props: KeyChainProps) {
    const { dek, pass, datastore } = props;
    if (!props.logger) {
      props.logger = {
        forComponent: logger,
      };
    }
    this.keychain = keychain({ dek, pass })({
      datastore,
      logger: props.logger,
    });
  }

  async createKey(name: string) {
    return await this.keychain.createKey(name, 'Ed25519');
  }

  async getKeyByName(name: string) {
    return await this.keychain.findKeyByName(name);
  }

  async getKeyById(id: string) {
    return await this.keychain.findKeyById(id);
  }

  async getAllKeys() {
    return await this.keychain.listKeys();
  }

  async removeKey(name: string) {
    return await this.keychain.removeKey(name);
  }

  async renameKey(oldName: string, newName: string) {
    return await this.keychain.renameKey(oldName, newName);
  }

  async rotateKeychainPass(oldPass: string, newPass: string) {
    await this.keychain.rotateKeychainPass(oldPass, newPass);
  }

  async exportKey(name: string, password: string) {
    const res = (await this.keychain.exportKey(name, password)) as string;
    return res;
  }

  decryptKey(encryptedKey: string, password: string) {
    return decryptKey(encryptedKey, password);
  }

  async getNillionKeys(name: string) {
    const peerId = await this.keychain.exportPeerId(name);
    const userId = peerIdToUserID(peerId);
    const userKey = peerIdToUserKey(peerId);

    return {
      userId,
      userKey,
    };
  }
}

export { KeyChain, decryptKey, peerIdToUserID, peerIdToUserKey };
