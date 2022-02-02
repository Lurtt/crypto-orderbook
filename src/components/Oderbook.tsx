import { FC, useCallback } from 'react';

import { useOrderbook } from 'hooks/useOrderbook';
import { SellIndicator } from './SellIndicator';
import { BuyIndicator } from './BuyIndicator';
import { IndicatorHeadline } from './IndicatorHeadline';
import { OderbookContainer } from './OderbookContainer';
import { useIndicators } from 'contexts/indicators-context/IndicatorsContext';

export const Oderbook: FC = () => {
  const { bids, asks, maxTotal, sendJsonMessage } = useOrderbook({ maxRecords: 20 });
  const { dispatch } = useIndicators();

  const renderSellIndicator = useCallback((indicator: Indicator) => <SellIndicator key={indicator[0]} data={indicator} maxTotal={maxTotal} />, [maxTotal]);
  const renderBuyIndicator = useCallback((indicator: Indicator) => <BuyIndicator key={indicator[0]} data={indicator} maxTotal={maxTotal} />, [maxTotal]);

  return (
    <>
      <OderbookContainer className='grid grid-cols-1 md:grid-cols-2'>
        <div className='row-start-3 md:row-start-auto'>Spread: xx - xx</div>

        <div className='row-start-4 md:row-start-2'>
          <IndicatorHeadline className='flex' />
          {bids.map(renderBuyIndicator)}
        </div>

        <div className='row-start-2'>
          <IndicatorHeadline className='hidden md:flex md:flex-row-reverse md:text-right' />
          {asks.map(renderSellIndicator)}
        </div>
      </OderbookContainer>

      <button className='block mt-8 mx-auto' onClick={() => dispatch({ type: 'TOGGLE_MARKETS', payload: { sendJsonMessage } })}>TOGGLE MARKET</button>
    </>
  );
};
