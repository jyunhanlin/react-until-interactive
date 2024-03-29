export type Events = Array<keyof HTMLElementEventMap>;

export interface Options {
  events?: Events;
  idle?: boolean;
  cache?: boolean;
  threshold?: number;
  interactiveFn: () => any;
  onInteractive?: (result: any) => any;
  onError?: (error: Error) => void;
}

export type HookOptions = Options;

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
