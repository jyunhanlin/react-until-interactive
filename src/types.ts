export type Events = Array<keyof HTMLElementEventMap>;

export interface Options {
  events?: Events;
  idle?: boolean;
  cache?: boolean;
  threshold?: number;
  onInteractive: () => any;
  onChange?: (result: any) => any;
}

export interface HookOptions extends Options {
  once?: boolean;
  staleWhileRevalidate?: boolean;
  onError?: (error: Error) => never;
}

export interface ComponentOptions {
  untilInteractiveOptions: HookOptions;
  children?: React.ReactNode | ((args: { isLoading: boolean; isError: boolean }) => React.ReactNode);
  // All other props
  [x: string]: any;
}

export interface HookResult {
  isLoading: boolean;
  isError: boolean;
  data: any;
}
