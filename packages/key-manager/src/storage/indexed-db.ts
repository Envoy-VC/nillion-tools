import { type DataSource } from './data-source';
import { set, get, del, values, createStore, type UseStore } from 'idb-keyval';

/**
 * Storage in the browser, uses indexed db storage
 */
export class IndexedDBDataSource<Type> implements DataSource<Type> {
  /**
   * Creates an instance of IndexedDBDataSource.
   *
   * @param _storageKey - key string to put storage name
   */
  private readonly _store: UseStore;
  constructor(private _storageKey: string) {
    this._store = createStore(`${_storageKey}-db`, _storageKey);
  }

  /**
   * Saves value to the indexed db storage
   *
   * @param key - key value
   * @param value - value to store
   */
  async save(key: string, value: Type): Promise<void> {
    return set(key, value, this._store);
  }

  /**
   * Gets value from the indexed db storage by given key
   *
   * @param key - key value
   */
  async get(key: string): Promise<Type | undefined> {
    return get(key, this._store);
  }

  /**
   * loads all from the indexed db storage
   */
  async load(): Promise<Type[]> {
    return values(this._store);
  }
  /**
   * deletes item from the indexed db storage
   * @param key - key value
   */
  async delete(key: string): Promise<void> {
    return del(key, this._store);
  }
}
