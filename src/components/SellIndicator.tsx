import { FC, useMemo } from 'react';

interface Props {
  data: Indicator
  maxTotal: number
}

export const SellIndicator: FC<Props> = ({ data, maxTotal }) => {
  const [ price, size, total ] = data;

  const stop = useMemo(() => ((total / (maxTotal ?? 1)) * 100), [ total, maxTotal ]);

  const background = useMemo(() => `linear-gradient(to right, #7f1d1d ${stop}%, transparent ${stop}%)`, [stop]);

  return (
    <div style={{ background }} className='flex md:flex-row-reverse md:text-right py-1'>
      <div className='flex-1'>{total}</div>
      <div className='flex-1'>{size}</div>
      <div className='flex-1 text-red-500'>{price}</div>
    </div>
  );
};
