import { useState, useRef, useCallback } from 'react';

import type { HookOptions } from './types';
import { untilInteractive } from './until-interactive';

export const useUntilInteractive = (options: HookOptions) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const willMount = useRef(true);

  const handleInteractive = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await untilInteractive(options);
      setIsLoading(false);
      setData(result);
    } catch (e: any) {
      throw new Error('untilInteraction error', e);
    }
  }, []);

  if (willMount.current) handleInteractive();

  willMount.current = false;

  return { isLoading, data };
};
