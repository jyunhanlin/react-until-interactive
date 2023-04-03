import type { Options } from './types';

const cached = new Map();

export const untilInteractive = (options: Options) =>
  new Promise((resolve, reject) => {
    const { events = ['mousemove', 'click', 'scroll'], idle = false, cache = false, onInteractive } = options;

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
      if (cache && cached.has(onInteractive)) {
        const result = cached.get(onInteractive);
        resolve(result);
        return;
      }

      try {
        const result = await onInteractive();

        if (cache) cached.set(onInteractive, result);

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    events.forEach((event) => {
      document.addEventListener(event, trigger);
    });
  });
