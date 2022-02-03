import { FC, useMemo } from 'react';

import { useNumberFormat } from 'hooks/useNumberFormat';

interface Props {
  data: Indicator
  maxTotal: number
}

export const SellIndicator: FC<Props> = ({ data, maxTotal }) => {
  const [ price, size, total ] = data;
  const priceFormat = useNumberFormat({ minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const numberFormat = useNumberFormat({ minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const stop = useMemo(() => ((total / (maxTotal ?? 1)) * 100), [ total, maxTotal ]);

  const background = useMemo(() => `linear-gradient(to right, #7f1d1d ${stop}%, transparent ${stop}%)`, [stop]);

  return (
    <div style={{ background }} className='flex flex-row-reverse md:text-right py-1'>
      <div className='flex-1'>{numberFormat.format(total)}</div>
      <div className='flex-1'>{numberFormat.format(size)}</div>
      <div className='flex-1 text-red-500'>{priceFormat.format(price)}</div>
    </div>
  );
};
