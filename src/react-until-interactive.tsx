import React from 'react';

import type { ComponentOptions } from './types';
import { useUntilInteractive } from './use-unitl-interactive';

export const UntilInteractive = ({ untilInteractiveOptions, children, otherProps }: ComponentOptions) => {
  const state = useUntilInteractive(untilInteractiveOptions);

  if (children && React.isValidElement(children)) {
    const Component = React.cloneElement(children, { ...otherProps });

    return state ? Component : null;
  }

  if (children) return state ? <>{children}</> : null;

  return null;
};
