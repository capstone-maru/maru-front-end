type storeType = 'session' | 'local';

export const save = ({
  type,
  key,
  value,
}: {
  type: storeType;
  key: string;
  value: object;
}) => {
  if (type === 'local') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const load = ({ type, key }: { type: storeType; key: string }) => {
  if (type === 'local') {
    return localStorage.getItem(key);
  }
  return sessionStorage.getItem(key);
};
