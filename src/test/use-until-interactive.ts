import { renderHook } from '@testing-library/react';

import { useUntilInteractive } from '../use-until-interactive';

describe('useUntilInteractive', () => {
  it('should call untilInteraction', () => {
    const { result } = renderHook(() => useUntilInteractive({ onInteractive: () => void 0 }, []));

    expect(result.current).toBeUndefined();
  });
});
