import { useRef } from 'react';

import type { Options } from './types';
import { untilInteractive } from './until-interactive';

export const useUntilInteractive = (options: Options) => {
  const willMount = useRef(true);

  if (willMount.current) untilInteractive(options);

  willMount.current = false;
};
