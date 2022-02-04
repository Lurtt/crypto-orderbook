import { render, screen } from '@testing-library/react';

import { BuyIndicator } from '../BuyIndicator';

describe('<BuyIndicator />', () => {
  it('renders', () => {
    const data = [ 200, 5, 1000 ] as any;
    const maxTotal = 10000;

    render(<BuyIndicator data={data} maxTotal={maxTotal} />);

    expect(screen.getByTestId('buy-indicator-total')).toHaveTextContent('1,000');
    expect(screen.getByTestId('buy-indicator-size')).toHaveTextContent('5');
    expect(screen.getByTestId('buy-indicator-price')).toHaveTextContent('200.00');
  });
});
