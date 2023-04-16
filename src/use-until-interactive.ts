import { useState, useRef, useCallback, useLayoutEffect } from 'react';

import type { HookOptions, HookResult } from './types';
import { untilInteractive } from './until-interactive';

export const useUntilInteractive = (options: HookOptions, deps: React.DependencyList): HookResult => {
  const { onError } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<any>(null);
  const willMount = useRef(true);

  const handleInteractive = useCallback(async () => {
    try {
      const result = await untilInteractive(options);
      setIsLoading(false);
      setData(result);
    } catch (error: any) {
      setIsError(true);
      onError?.(error);
    }
  }, deps);

  if (typeof window !== 'undefined' && willMount.current) handleInteractive();

  willMount.current = false;

  useLayoutEffect(() => {
    if (!willMount.current && !isLoading) {
      handleInteractive();
    }
  }, deps);

  return { isLoading, isError, data };
};
