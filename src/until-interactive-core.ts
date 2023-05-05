import type { Options } from './types';

const cached = new Map();

export class UntilInteractiveCore {
  private options: Options;
  private thresholdTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(options: Options) {
    this.options = {
      events: options.events || ['mousemove', 'click', 'scroll'],
      idle: options.idle || true,
      cache: options.cache || false,
      threshold: options.threshold,
      interactiveFn: options.interactiveFn,
      onInteractive: options.onInteractive,
    };
    this.setup();
  }

  private setup() {
    const { events, threshold } = this.options;
    events?.forEach((event) => {
      document.addEventListener(event, this.triggerInteractive);
    });

    if (threshold) {
      this.thresholdTimer = setTimeout(this.triggerInteractive, threshold);
    }
  }

  private triggerInteractive = () => {
    const { events, idle } = this.options;
    if (this.thresholdTimer) clearTimeout(this.thresholdTimer);

    events?.forEach((event) => {
      document.removeEventListener(event, this.triggerInteractive);
    });

    if (idle) {
      if (requestIdleCallback) requestIdleCallback(this.interactive);
      else setTimeout(this.interactive);
    } else {
      this.interactive();
    }
  };

  private interactive = async () => {
    const result = await this._interactive();
    if (result !== undefined) this.onInteractive(result);
  };

  private async _interactive() {
    const { cache, interactiveFn, onError } = this.options;

    try {
      const result = await interactiveFn();
      if (cache) cached.set(interactiveFn, result);
      return result;
    } catch (error: any) {
      onError?.(error);
    }
  }

  private onInteractive(result: any) {
    const { onInteractive } = this.options;
    onInteractive?.(result);
  }

  async updateInteractive() {
    const { cache, interactiveFn } = this.options;
    if (cache && cached.has(interactiveFn)) {
      const cachedResult = cached.get(interactiveFn);
      this.onInteractive(cachedResult);

      const result = await this._interactive();

      if (result !== cachedResult) this.onInteractive(cachedResult);
    }
  }
}
