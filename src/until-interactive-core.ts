import type { Options } from './types';

export class UntilInteractiveCore {
  private options: Options;
  private thresholdTimer: ReturnType<typeof setTimeout> | undefined;
  private cached: any;

  constructor(options: Options) {
    this.options = {
      events: options.events || ['mousemove', 'click', 'scroll'],
      idle: options.idle || true,
      cache: options.cache || false,
      threshold: options.threshold,
      interactiveFn: options.interactiveFn,
      onInteractive: options.onInteractive,
      onError: options.onError,
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
      if (requestIdleCallback) requestIdleCallback(this.executeInteractive);
      else setTimeout(this.executeInteractive);
    } else {
      this.executeInteractive();
    }
  };

  private executeInteractive = async () => {
    const result = await this._executeInteractive();
    if (result !== undefined) this.onInteractive(result);
  };

  private async _executeInteractive() {
    const { cache, interactiveFn, onError } = this.options;

    try {
      const result = await interactiveFn();
      if (cache) this.cached = result;
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
    const { cache } = this.options;
    if (cache && this.cached) {
      const cachedResult = this.cached;
      this.onInteractive(cachedResult);

      const result = await this._executeInteractive();

      if (result !== cachedResult) this.onInteractive(result);
    } else {
      this.executeInteractive();
    }
  }
}
