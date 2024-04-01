import { type AtomEffect, type DefaultValue } from 'recoil';

import { load, remove, save, type StorageType } from '@/shared/storage';

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

    const savedValue = load({ type: storageType, key });
    if (savedValue != null) {
      setSelf(load({ type: storageType, key }) as StoredType);
    }

    onSet((newValue: StoredType | DefaultValue, _, isReset: boolean) => {
      if (isReset) {
        remove({ type: storageType, key });
      } else {
        save({ type: storageType, key, value: JSON.stringify(newValue) });
      }
    });
  };
