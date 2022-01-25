import { FC, useCallback } from 'react';

import { useOrderbook } from 'hooks/useOrderbook';
import { Indicator } from './Indicator';

export const Oderbook: FC = () => {
  const { bids, asks, maxTotal } = useOrderbook({ maxRecords: 20 });

  const renderRow = useCallback((type: IndicatorType) => (indicator: Indicator) => <Indicator key={indicator[0]} type={type} data={indicator} maxTotal={maxTotal} />, [maxTotal]);

  return (
    <div className="flex">
      <div className="flex flex-1 flex-col">
        <h1>BIDS/BUY</h1>
        {bids.map(renderRow('buy'))}
      </div>

      <div className="flex flex-1 flex-col">
        <h1>ASKS/SELL</h1>
        {asks.map(renderRow('sell'))}
      </div>
    </div>
  );
};
