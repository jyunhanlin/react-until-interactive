import { untilInteractive } from '../until-interactive';

describe('untilInteractive function', () => {
  it('should return a function', () => {
    expect(typeof untilInteractive).toBe('function');
  });
});
