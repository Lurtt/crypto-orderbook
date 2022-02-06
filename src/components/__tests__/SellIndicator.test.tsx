import { render, screen } from '@testing-library/react';

import { SellIndicator } from '../SellIndicator';

describe('<SellIndicator />', () => {
  it('renders', () => {
    const data = [ 100, 51, 3000 ] as any;
    const maxTotal = 10000;

    render(<SellIndicator data={data} maxTotal={maxTotal} />);

    expect(screen.getByTestId('sell-indicator-total')).toHaveTextContent('3,000');
    expect(screen.getByTestId('sell-indicator-size')).toHaveTextContent('51');
    expect(screen.getByTestId('sell-indicator-price')).toHaveTextContent('100.00');
  });
});
