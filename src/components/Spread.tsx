import { FC, useMemo } from 'react';

import { useIndicators } from 'contexts/indicators-context/IndicatorsContext';
import { useNumberFormat } from 'hooks/useNumberFormat';

interface Props {
  className: string;
}

export const Spread: FC<Props> = ({ className }) => {
  const { state: { asks, bids } } = useIndicators();
  const formatNumber = useNumberFormat({ minimumFractionDigits: 1, maximumFractionDigits: 2 });
  const formatPercentage = useNumberFormat({ style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 3 });

  const ask = useMemo(() => asks[0]?.[0], [asks]);
  const bid = useMemo(() => bids[0]?.[0], [bids]);
  const spread = useMemo(() => ask - bid, [ ask, bid ]);
  const spreadPercentage = useMemo(() => formatPercentage.format(spread / ask), [ ask, spread, formatPercentage ]);

  return (
    <div className={`${className} py-1 text-center md:text-left text-slate-500`}>
      Spread: {formatNumber.format(spread)} ({spreadPercentage})
    </div>
  );
};
