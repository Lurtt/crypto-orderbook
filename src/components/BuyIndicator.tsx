import { FC, useMemo } from 'react';
import { useResponsive } from 'ahooks';
interface Props {
  data: Indicator
  maxTotal: number
}

export const BuyIndicator: FC<Props> = ({ data, maxTotal }) => {
  const [ price, size, total ] = data;
  const responsive = useResponsive();

  const gradientDirection = useMemo(() => !responsive.md ? 'right' : 'left', [responsive.md]);
  const stop = useMemo(() => ((total / (maxTotal ?? 1)) * 100), [ total, maxTotal ]);

  const background = useMemo(() => `linear-gradient(to ${gradientDirection}, #064e3b ${stop}%, transparent ${stop}%)`, [ stop, gradientDirection ]);

  return (
    <div style={{ background }} className='flex py-1'>
      <div className='flex-1'>{total}</div>
      <div className='flex-1'>{size}</div>
      <div className='flex-1 text-green-500'>{price}</div>
    </div>
  );
};
