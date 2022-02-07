import { FC, useCallback } from 'react';

import { useIndicators } from 'contexts/indicators-context/IndicatorsContext';
import { useOrderbook } from 'hooks/useOrderbook';
import { SellIndicator } from './SellIndicator';
import { BuyIndicator } from './BuyIndicator';
import { IndicatorHeadline } from './IndicatorHeadline';
import { OrderbookContainer } from './OrderbookContainer';
import { ToggleMarket } from './ToggleMarket';
import { Spread } from './Spread';
import { Title } from './Title';

export const Orderbook: FC = () => {
  const { bids, asks, maxTotal, sendJsonMessage } = useOrderbook({ maxRecords: 20 });
  const { dispatch } = useIndicators();

  const renderSellIndicator = useCallback((indicator: Indicator) => <SellIndicator key={indicator[0]} data={indicator} maxTotal={maxTotal} />, [maxTotal]);
  const renderBuyIndicator = useCallback((indicator: Indicator) => <BuyIndicator key={indicator[0]} data={indicator} maxTotal={maxTotal} />, [maxTotal]);

  const handleToggleMarket = () => dispatch({ type: 'TOGGLE_MARKETS', payload: { sendJsonMessage } });

  return (
    <div className='max-w-5xl mx-auto space-y-8'>
      <OrderbookContainer className='grid grid-areas-mobile md:grid-areas-desktop'>
        <Title className='grid-in-title'/>
        <Spread className="grid-in-spread" />

        <IndicatorHeadline className='grid-in-bids-title hidden md:flex' data-testid="indicator-headline-buys" />
        <div className='grid-in-bids-data'>
          {bids.map(renderBuyIndicator)}
        </div>

        <IndicatorHeadline className='grid-in-asks-title flex flex-row-reverse md:text-right' data-testid="indicator-headline-sells" />
        <div className='grid-in-asks-data flex flex-col-reverse md:flex-col'>
          {asks.map(renderSellIndicator)}
        </div>
      </OrderbookContainer>

      <ToggleMarket onClick={handleToggleMarket} />
    </div>
  );
};
