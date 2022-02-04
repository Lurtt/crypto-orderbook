import { render, screen } from '@testing-library/react';


import { IndicatorsProvider, useIndicators } from 'contexts/indicators-context/IndicatorsContext';
import { Spread } from '../Spread';

const useIndicatorSpy = useIndicators as jest.Mock;

jest.mock('contexts/indicators-context/IndicatorsContext', () => ({
  ...(jest.requireActual('contexts/indicators-context/IndicatorsContext')),
  useIndicators: jest.fn(),
}));

describe('<Spread />', () => {
  it('renders', () => {
    useIndicatorSpy.mockReturnValue({ state: { bids: [[ 1, 10, 100 ]], asks: [[ 2, 20, 200 ]] } });

    render(
      <IndicatorsProvider>
        <Spread className='custom-css' />
      </IndicatorsProvider>,
    );

    expect(screen.getByText(/Spread: /i)).toHaveTextContent('Spread: 1.0 (50.00%)');
  });
});
