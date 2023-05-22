'use client';

import React from 'react';

import type { ComponentOptions } from './types';
import { useUntilInteractive } from './use-until-interactive';

export const UntilInteractive = ({ untilInteractiveOptions, children, otherProps }: ComponentOptions) => {
  const { isLoading, isError } = useUntilInteractive(untilInteractiveOptions, []);

  if (children && React.isValidElement(children)) {
    const Component = React.cloneElement(children, { ...otherProps });

    return isLoading || isError ? null : Component;
  }

  if (children && typeof children === 'function') {
    return <>{children({ isLoading, isError })}</>;
  }

  if (children) return isLoading || isError ? null : <>{children}</>;

  return null;
};
