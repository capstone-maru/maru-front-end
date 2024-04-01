export type StorageType = 'session' | 'local';

export const save = ({
  type,
  key,
  value,
}: {
  type: StorageType;
  key: string;
  value: string;
}) => {
  if (typeof window === 'undefined') return;

  if (type === 'local') {
    localStorage.setItem(key, value);
  } else {
    sessionStorage.setItem(key, value);
  }
};

export const load = ({ type, key }: { type: StorageType; key: string }) => {
  if (typeof window === 'undefined') return null;

  if (type === 'local') {
    return localStorage.getItem(key);
  }
  return sessionStorage.getItem(key);
};

export const remove = ({ type, key }: { type: StorageType; key: string }) => {
  if (typeof window === 'undefined') return;

  if (type === 'local') {
    localStorage.removeItem(key);
  } else {
    sessionStorage.removeItem(key);
  }
};
