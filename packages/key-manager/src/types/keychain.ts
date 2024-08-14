export type Awaitable<T> = T | Promise<T>;
export interface KeyType {
  id: string;
  userId: string;
  encryptedUserKey: string;
  nonce: Uint8Array;
}

export type EncryptFunction = (
  id: string,
  data: Uint8Array,
  nonce: Uint8Array
) => Awaitable<Uint8Array>;
export type DecryptFunction = (
  id: string,
  data: Uint8Array
) => Awaitable<Uint8Array>;
