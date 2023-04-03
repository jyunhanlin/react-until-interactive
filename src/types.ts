export type Events = Array<keyof HTMLElementEventMap>;

export interface Options {
  events?: Events;
  idle?: boolean;
  cache?: boolean;
  onInteractive: () => void;
}

export interface HookOptions extends Options {
  once?: boolean;
}

export interface ComponentOptions {
  untilInteractiveOptions: HookOptions;
  children?: React.ReactNode;
  // All other props
  [x: string]: any;
}
