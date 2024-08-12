import { beforeAll, describe, it, expect } from 'vitest';

import { FsDatastore } from 'datastore-fs';

import fs from 'node:fs';

import { KeyChain } from '../../src/keychain';

let keychain: KeyChain;

describe('Keychain', () => {
  beforeAll(() => {
    if (fs.existsSync('./db')) {
      fs.rmSync('./db', { recursive: true });
    }
    fs.mkdirSync('./db');
    keychain = new KeyChain({
      datastore: new FsDatastore('./db'),
    });
  });
  it('should create key with name', async () => {
    const key = await keychain.createKey('foo');
    expect(key.id).toBeDefined();
    expect(key.name).eq('foo');
  });
  it('should get key with name', async () => {
    const key = await keychain.exportKey('foo', 'secure_password');
    expect(key).toBeDefined();
  });
});
