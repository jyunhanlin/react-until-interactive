import { renderHook } from '@testing-library/react';

import { useUntilInteractive } from '../use-until-interactive';

describe('useUntilInteractive', () => {
  it('should call untilInteraction', () => {
    const { result } = renderHook(() => useUntilInteractive({ interactiveFn: () => void 0 }, []));

    expect(result.current).toBeDefined();
  });
});
