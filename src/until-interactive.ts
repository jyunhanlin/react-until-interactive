import type { Options } from './types';

export const untilInteractive = (options: Options) =>
  new Promise((resolve, reject) => {
    const { events = ['mousemove', 'click', 'scroll'], idle = false, onInteractive } = options;

    const trigger = () => {
      events.forEach((event) => {
        document.removeEventListener(event, trigger);
      });

      if (idle && requestIdleCallback) {
        requestIdleCallback(handleInteractive);
      } else {
        handleInteractive();
      }
    };

    const handleInteractive = async () => {
      try {
        const result = await onInteractive();

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    events.forEach((event) => {
      document.addEventListener(event, trigger);
    });
  });
