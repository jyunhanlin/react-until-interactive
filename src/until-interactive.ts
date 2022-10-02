import type { Options } from './types';

export const untilInteractive = (options: Options) => {
  const { events = ['mousemove', 'click', 'scroll'], idle = false, onInteractive } = options;

  const check = () => {
    events.forEach((event) => {
      document.removeEventListener(event, check);
    });

    if (idle) {
      requestIdleCallback(onInteractive);
    } else {
      onInteractive();
    }
  };

  events.forEach((event) => {
    document.addEventListener(event, check);
  });
};
