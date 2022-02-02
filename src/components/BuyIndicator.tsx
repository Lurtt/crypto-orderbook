import { FC, useMemo } from 'react';

interface Props {
  data: Indicator
  maxTotal: number
}

export const BuyIndicator: FC<Props> = ({ data, maxTotal }) => {
  const [ price, size, total ] = data;

  const stop = useMemo(() => ((total / (maxTotal ?? 1)) * 100), [ total, maxTotal ]);

  const background = useMemo(() => `linear-gradient(to left, #22c55e ${stop}%, transparent ${stop}%)`, [stop]);

  return (
    <div style={{ background }} className='flex'>
      <div className='flex-1'>{total}</div>
      <div className='flex-1'>{size}</div>
      <div className='flex-1'>{price}</div>
    </div>
  );
};