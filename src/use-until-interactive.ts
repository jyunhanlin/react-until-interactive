import { useMemo, useState, useRef, useLayoutEffect } from 'react';

import type { HookOptions, HookResult } from './types';
import { UntilInteractiveCore } from './until-interactive-core';

export const useUntilInteractive = (options: HookOptions, deps: React.DependencyList): HookResult => {
  const { once = true, onError } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<any>(null);

  const resolvedOptions = useMemo(() => {
    const resolvedOptions = options;
    resolvedOptions.onInteractive = (result) => {
      setData(result);
      setIsLoading(false);
    };

    resolvedOptions.onError = (error) => {
      onError?.(error);
      setIsError(true);
    };
    return resolvedOptions;
  }, []);

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
