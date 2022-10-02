import { useEffect } from 'react';

import type { Options } from './types';
import { untilInteractive } from './until-interactive';

export const UntilInteractive = (props: Options) => {
  useEffect(() => {
    untilInteractive(props);
  }, []);

  return null;
};
