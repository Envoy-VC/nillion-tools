export type Awaitable<T> = T | Promise<T>;
export interface KeyType {
  id: string;
  userId: string;
  encryptedUserKey: string;
}

export type EncryptFunction = (data: Uint8Array) => Awaitable<Uint8Array>;
export type DecryptFunction = (data: Uint8Array) => Awaitable<Uint8Array>;
