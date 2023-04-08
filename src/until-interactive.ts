import type { Options } from './types';

const cached = new Map();

const isServer = typeof window === 'undefined';

export const untilInteractive = async (options: Options) => {
  if (isServer) return;

  return new Promise((resolve, reject) => {
    const {
      events = ['mousemove', 'click', 'scroll'],
      idle = false,
      cache = false,
      threshold,
      onInteractive,
    } = options;
    let thresholdTimer: ReturnType<typeof setTimeout>;

    if (!onInteractive) reject('please provide the onInteractive callback');

    const trigger = () => {
      if (thresholdTimer) clearTimeout(thresholdTimer);

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
        resolve(cached.get(onInteractive));
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

    if (threshold) {
      thresholdTimer = setTimeout(trigger, threshold);
    }
  });
};
