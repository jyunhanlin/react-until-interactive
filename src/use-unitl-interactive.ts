import { useState, useRef, useCallback } from 'react';

import type { HookOptions } from './types';
import { untilInteractive } from './until-interactive';

export const useUntilInteractive = (options: HookOptions) => {
  const [state, setState] = useState<any>(false);
  const willMount = useRef(true);

  const handleInteractive = useCallback(async () => {
    try {
      const result = await untilInteractive(options);

      setState(result);
    } catch (e: any) {
      throw new Error('untilInteraction error', e);
    }
  }, []);

  if (willMount.current) handleInteractive();

  willMount.current = false;

  return state;
};
