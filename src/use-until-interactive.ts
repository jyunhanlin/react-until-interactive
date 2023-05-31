'use client';

import { useMemo, useState, useLayoutEffect } from 'react';

import type { HookOptions, HookResult } from './types';
import { UntilInteractiveCore } from './until-interactive-core';

export const useUntilInteractive = (options: HookOptions, deps: React.DependencyList): HookResult => {
  const { onInteractive, onError } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<any>(null);

  const untilInteractive = useMemo(
    () =>
      new UntilInteractiveCore({
        ...options,
        onInteractive: (result) => {
          onInteractive?.(result);
          setData(result);
          setIsLoading(false);
        },
        onError: (error) => {
          onError?.(error);
          setIsError(true);
        },
      }),
    [],
  );

  useLayoutEffect(() => {
    if ((!deps || deps?.length) && !isLoading) {
      setIsLoading(true);
      setIsError(false);
      untilInteractive.updateInteractive();
    }
  }, [...deps, isLoading]);

  return { isLoading, isError, data };
};
