import { render, screen } from '@testing-library/react';

import { Title } from '../Title';

describe('<Title />', () => {
  it('renders', () => {
    render(<Title className='custom-css' />);

    expect(screen.getByRole('heading')).toHaveTextContent('Order Book');
    expect(screen.getByRole('heading')).toHaveClass('custom-css');
  });
});
