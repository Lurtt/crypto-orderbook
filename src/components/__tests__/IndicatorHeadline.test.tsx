import { render, screen } from '@testing-library/react';

import { IndicatorHeadline } from '../IndicatorHeadline';

describe('<IndicatorHeadline />', () => {
  it('renders', () => {
    render(<IndicatorHeadline className='custom-css' />);

    expect(screen.getByText(/TOTAL/i)).toHaveClass('flex-1');
    expect(screen.getByText(/SIZE/i)).toHaveClass('flex-1');
    expect(screen.getByText(/PRICE/i)).toHaveClass('flex-1');
  });
});
