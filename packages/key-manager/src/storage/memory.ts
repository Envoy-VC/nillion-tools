/* eslint-disable @typescript-eslint/no-unsafe-member-access -- safe */
/* eslint-disable @typescript-eslint/no-explicit-any -- safe */
import { type DataSource, StorageErrors } from './data-source';

/**
 * Generic Memory Data Source
 */
export class InMemoryDataSource<Type> implements DataSource<Type> {
  public _data: Type[] = [];

  /** saves in the memory */
  save(key: string, value: Type, keyName = 'id') {
    const itemIndex = this._data.findIndex((i: any) => i[keyName] === key);
    if (itemIndex === -1) {
      this._data.push(value);
    } else {
      this._data[itemIndex] = value;
    }
  }

  /** gets value from from the memory */
  get(key: string, keyName = 'id') {
    return this._data.find((t: any) => t[keyName] === key);
  }

  /** loads from value from the memory */
  load() {
    return this._data;
  }

  /** deletes from value from the memory */
  delete(key: string, keyName = 'id') {
    const newData = this._data.filter((i: any) => i[keyName] !== key);

    if (newData.length === this._data.length) {
      throw new Error(`${StorageErrors.ItemNotFound} to delete: ${key}`);
    }

    this._data = newData;
  }
}
