import { useEffect } from 'react';

import type { Options } from './types';
import { untilInteractive } from './until-interactive';

export const useUntilInteractive = (options: Options, deps: any[]) => {
  useEffect(() => {
    untilInteractive(options);
  }, deps);
};
