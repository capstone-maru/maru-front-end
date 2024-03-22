import { useCallback, useMemo, useState } from 'react';

import { type MainPageFilter } from '.';

export const useMainPageFilter: () => [
  MainPageFilter,
  (
    optionOrUpdater:
      | Partial<MainPageFilter>
      | ((prev: MainPageFilter) => MainPageFilter),
  ) => void,
] = () => {
  const [filter, setFilter] = useState<MainPageFilter>({ hasRoom: false });
  const setter = useCallback(
    (
      optionOrUpdater:
        | Partial<MainPageFilter>
        | ((prev: MainPageFilter) => MainPageFilter),
    ) => {
      if (typeof optionOrUpdater === 'function') {
        setFilter(optionOrUpdater);
      } else {
        setFilter(prev => ({ ...prev, ...optionOrUpdater }));
      }
    },
    [],
  );

  return useMemo(() => [filter, setter], [filter, setter]);
};
