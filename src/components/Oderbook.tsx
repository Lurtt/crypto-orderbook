import { FC, useCallback } from 'react';

import { useOrderbook } from 'hooks/useOrderbook';
import { SellIndicator } from './SellIndicator';
import { BuyIndicator } from './BuyIndicator';
import { IndicatorHeadline } from './IndicatorHeadline';
import { OderbookContainer } from './OderbookContainer';
import { ToggleMarket } from './ToggleMarket';
import { useIndicators } from 'contexts/indicators-context/IndicatorsContext';

export const Oderbook: FC = () => {
  const { bids, asks, maxTotal, sendJsonMessage } = useOrderbook({ maxRecords: 20 });
  const { dispatch } = useIndicators();

  const renderSellIndicator = useCallback((indicator: Indicator) => <SellIndicator key={indicator[0]} data={indicator} maxTotal={maxTotal} />, [maxTotal]);
  const renderBuyIndicator = useCallback((indicator: Indicator) => <BuyIndicator key={indicator[0]} data={indicator} maxTotal={maxTotal} />, [maxTotal]);

  const handleToggleMarket = () => dispatch({ type: 'TOGGLE_MARKETS', payload: { sendJsonMessage } });

  return (
    <div className='space-y-8'>
      <OderbookContainer className='grid grid-cols-1 md:grid-cols-2 items-center'>
        <div className='row-start-4 text-center md:text-left md:row-start-auto py-1 text-slate-500'>Spread: 17.0 (0.05%)</div>

        <IndicatorHeadline className='hidden md:flex md:row-start-2' />
        <div className='row-start-5 md:row-start-3'>
          {bids.map(renderBuyIndicator)}
        </div>

        <IndicatorHeadline className='row-start-2 flex flex-row-reverse md:text-right' />
        <div className='row-start-3 flex flex-col-reverse md:flex-col'>
          {asks.map(renderSellIndicator)}
        </div>
      </OderbookContainer>

      <ToggleMarket onClick={handleToggleMarket} />
    </div>
  );
};
