import { type AtomEffect, type DefaultValue } from 'recoil';

import { type StorageType } from '.';

export const storageEffect =
  <StoredType>({
    key,
    storageType,
  }: {
    key: string;
    storageType: StorageType;
  }): AtomEffect<StoredType> =>
  ({ setSelf, onSet }) => {
    if (typeof window === 'undefined') return;
    const storage = storageType === 'local' ? localStorage : sessionStorage;

    const savedValue = storage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue) as StoredType);
    }

    onSet((newValue: StoredType | DefaultValue, _, isReset: boolean) => {
      if (isReset) {
        storage.removeItem(key);
      } else {
        storage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
