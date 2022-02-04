import { render, screen, fireEvent } from '@testing-library/react';

import { ToggleMarket } from '../ToggleMarket';

describe('<ToggleMarket />', () => {
  it('renders', () => {
    const handleClick = jest.fn();
    render(<ToggleMarket onClick={handleClick} />);

    fireEvent.click(screen.getByText(/Toggle Feed/i));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
