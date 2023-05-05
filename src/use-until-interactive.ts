import { useMemo, useState, useRef, useLayoutEffect } from 'react';

import type { HookOptions, HookResult } from './types';
import { UntilInteractiveCore } from './until-interactive';

export const useUntilInteractive = (options: HookOptions, deps: React.DependencyList): HookResult => {
  const { once = true, staleWhileRevalidate = false, onError } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<any>(null);

  const resolvedOptions = useMemo(() => {
    const resolvedOptions = options;
    if (staleWhileRevalidate)
      resolvedOptions.onInteractive = (result) => {
        setData(result);
        setIsLoading(false);
      };

    if (onError) {
      resolvedOptions.onError = (error) => {
        onError(error);
        setIsError(true);
      };
    }
    return resolvedOptions;
  }, [options]);

  const untilInteractive = useRef(new UntilInteractiveCore(resolvedOptions));

  useLayoutEffect(() => {
    if (!once && !isLoading) {
      setIsLoading(true);
      setIsError(false);
      untilInteractive.current.updateInteractive();
    }
  }, deps);

  return { isLoading, isError, data };
};
