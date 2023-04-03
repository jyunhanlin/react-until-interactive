import React from 'react';

import type { ComponentOptions } from './types';
import { useUntilInteractive } from './use-until-interactive';

export const UntilInteractive = ({ untilInteractiveOptions, children, otherProps }: ComponentOptions) => {
  const { isLoading } = useUntilInteractive(untilInteractiveOptions);

  if (children && React.isValidElement(children)) {
    const Component = React.cloneElement(children, { ...otherProps });

    return isLoading ? null : Component;
  }

  if (children) return isLoading ? null : <>{children}</>;

  return null;
};
