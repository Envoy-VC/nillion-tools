# Key Manager

Key Manager is a tool to manage and authenticate Ed25519 keys. It provides a simple workflow to create, import, and export keys. It also provides a way to authenticate keys using WebAuthn (PRF) and FIDO2.

## Features

- 🪝 Support for Mordern Frameworks such as Next.js, React, Vite, Svelte and more.
- 🔐 Uses `@simplewebauth` internally which passes FIDO® Conformance Server Tests.
- 🧩 Everything is authored in 100% TypeScript!
- 🍳 Simple to use API Syntax so that you can focus on your main application.
- 👏 Fully typed and tree-shakeable
- ...and many more ✨

## Structure

The Package is divided into the following parts:

1. **KeyChain**: A KeyChain is a root class that manages keys. It provides a way to create, import, and export keys.
2. **Storage**: A Storage class that provides a way to store keys securely. It provides implementations for local storage and browser storage(IndexedDB).
3. **WebAuthn**: A WebAuthn based implementation that can encrypt and decrypt Private keys using PRF(Pseudo Random Function).
4. **React**: A react wrapper for the KeyChain and WebAuthn classes.
5. **Types**: Shared types used in the package.

## Getting Started

To install Key Manager in your project, run the following command:

```bash
npm i @nillion-tools/key-manager
# or
yarn add @nillion-tools/key-manager
# or
pnpm add @nillion-tools/key-manager
# or
bun add @nillion-tools/key-manager
```

## Storage

To Start using the key manager, you first need to define a data source. This can be of any type that follows the [DataSource](https://github.com/Envoy-VC/nillion-tools/blob/main/packages/key-manager/src/storage/data-source.ts) Interface. For Example, you can use the IndexedDB data source as shown below:

```tsx title="storage.ts"
import { IndexedDBDataSource } from '@nillion-tools/key-manager/storage';
import type { KeyType } from '@nillion-tools/key-manager/types';

const keyChainDB = new IndexedDBDataSource<KeyType>('keychain');
```

## Keychain

Two Initialize keychain you need two functions: **encrypt** and **decrypt**. These functions are used to encrypt and decrypt the data. You can use any encryption library of your choice. The function takes in the id and data in from of `Uint8Array` and returns encrypted or decrypted `Uint8Array`.

```tsx title="keychain.ts"
import { KeyChain } from '@nillion-tools/key-manager/keychain';

const encrypt = (id: string, data: Uint8Array, nonce: Uint8Array) => {
  // Your encryption logic
  // Nonce is used to prevent replay attacks
  return data;
};

const decrypt = (id: string, data: Uint8Array) => {
  // Your decryption logic
  return data;
};

const keyChain = new KeyChain(keyChainDB, encrypt, decrypt);

const key = await keyChain.createKey('username');
console.log(key);
```

```json
{
  "id": "username",
  "userId": "z2i83AvZqBYe7NPR6rUdLMw1P8pW6J6dV7PSjWRLUZWW5SCDJm6KXTujZBtF1iJMxe7iLufkNQr5pSibz5kfiusTt",
  "encryptedUserKey": "z3dod5kUYH3KNhdhQzpC7BQDp3cAKA3MeN4kEQJf6qu63oxzoujnJHtEek3M2jgZ5Yf",
  "nonce": [178, 34, 89, 112, 98, 12, 67, 87, 3, 8, 33, 21]
}
```

## Documentation

For a complete overview of available functions and usage examples, please refer to the official documentation: [https://nillion-tools.envoy1084.xyz](https://nillion-tools.envoy1084.xyz/docs/key-manager)

# Contributing

We welcome contributions! Check out our [contributing guide](https://github.com/Envoy-VC/nillion-tools/blob/main/CONTRIBUTING.md) for more information

# Future Plans

We're actively working on expanding functionality. Stay tuned for:

- Connect Kit

**Let's build the future blind computation together!**
