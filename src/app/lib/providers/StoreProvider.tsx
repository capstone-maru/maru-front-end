'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';

import { makeStore, type AppStore } from '../store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (storeRef?.current === undefined) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();

    // 만약, 초기 데이터를 초기화해야한다면 이 부분에 작성한다.
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
