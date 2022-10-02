export type Events = Array<keyof HTMLElementEventMap>;

export type Options = {
  events?: Events;
  idle?: boolean;
  onInteractive: () => void;
};
