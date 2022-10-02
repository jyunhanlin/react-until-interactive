import { render } from '@testing-library/react';

import { UntilInteractive } from '../react-until-interactive';

describe('UntilInteractive component', () => {
  it('should render without crashing', () => {
    render(<UntilInteractive untilInteractiveOptions={{ onInteractive: () => void 0 }} />);
  });
});
