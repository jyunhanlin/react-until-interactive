import type { Options } from './types';

export const untilInteractive = (options: Options) => {
  const { events = ['mousemove', 'click', 'scroll'], idle = false, onInteractive } = options;

  const handleInteractive = () => {
    events.forEach((event) => {
      document.removeEventListener(event, handleInteractive);
    });

    if (idle && requestIdleCallback) {
      requestIdleCallback(onInteractive);
    } else {
      onInteractive();
    }
  };

  events.forEach((event) => {
    document.addEventListener(event, handleInteractive);
  });
};
