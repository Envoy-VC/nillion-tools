/* eslint-disable @typescript-eslint/no-explicit-any -- safe */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- safe */
import { type DataSource, StorageErrors } from './data-source';

export class BrowserDataSource<Type> implements DataSource<Type> {
  /**
   * Creates an instance of BrowserDataSource.
   * @param _localStorageKey - key string to put storage name in the local storage
   */
  constructor(private _localStorageKey: string) {
    const data = localStorage.getItem(this._localStorageKey);
    if (!data) {
      localStorage.setItem(_localStorageKey, JSON.stringify([]));
    }
  }

  /**
   *
   * saves value to the local storage
   * @param key - key value
   * @param value - value to store
   * @param keyName -  key name (default is 'id')
   */
  save(key: string, value: Type, keyName = 'id') {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- can be false on server
    if (localStorage) {
      const data = localStorage.getItem(this._localStorageKey);
      let items: Type[] = [];
      if (data) {
        items = JSON.parse(data) as Type[];
      }
      const itemIndex = items.findIndex(
        (i: any): boolean => i[keyName] === key
      );
      if (itemIndex === -1) {
        items.push(value);
      } else {
        items[itemIndex] = value;
      }
      localStorage.setItem(this._localStorageKey, JSON.stringify(items));
    }
  }

  /**
   * gets value from the local storage by given key
   * @param  key - key value
   * @param keyName - key name (default is 'id')
   */

  get(key: string, keyName = 'id') {
    const data = localStorage.getItem(this._localStorageKey);
    let parsedData: Type[] = [];
    if (data) {
      parsedData = JSON.parse(data) as Type[];
    }
    return parsedData.find((t: any) => t[keyName] === key);
  }

  /**
   * loads all from the local storage
   */
  load() {
    const data = localStorage.getItem(this._localStorageKey);
    if (data) {
      return JSON.parse(data) as Type[];
    }
    return [];
  }
  /**
   * deletes item from the local storage
   * @param key - key value
   * @param keyName - key name
   */
  delete(key: string, keyName = 'id') {
    const dataStr = localStorage.getItem(this._localStorageKey);
    let data: Type[] = [];
    if (dataStr) {
      data = JSON.parse(dataStr) as Type[];
    }
    const items = data.filter((i: any) => i[keyName] !== key);
    if (data.length === items.length) {
      throw new Error(`${StorageErrors.ItemNotFound} to delete: ${key}`);
    }
    localStorage.setItem(this._localStorageKey, JSON.stringify(items));
  }
}
