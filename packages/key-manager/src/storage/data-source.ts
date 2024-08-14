export interface DataSource<Type> {
  /**
   * load all object with Type from data source
   *
   * @returns `{Type[]}`
   */
  load: () => Type[] | Promise<Type[]>;

  /**
   * Save value under the key with optional key name
   *
   * @param key - key value
   * @param value - value to store
   * @param keyName - key name
   */
  save: (key: string, value: Type, keyName?: string) => void | Promise<void>;

  /**
   * returns data value for key value and optional key name
   *
   * @param  key - key value
   * @param keyName - key name
   */
  get: (
    key: string,
    keyName?: string
  ) => Type | undefined | Promise<Type | undefined>;

  /**
   * deletes data value for given key with an optional key name
   *
   * @param key - key value
   * @param keyName - key name
   */
  delete: (key: string, keyName?: string) => void | Promise<void>;
}

export enum StorageErrors {
  ItemNotFound = 'item not found',
}
