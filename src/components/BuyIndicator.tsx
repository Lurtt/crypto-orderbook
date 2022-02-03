import { FC, useMemo } from 'react';
import { useResponsive } from 'ahooks';
import { useNumberFormat } from 'hooks/useNumberFormat';
interface Props {
  data: Indicator
  maxTotal: number
}

export const BuyIndicator: FC<Props> = ({ data, maxTotal }) => {
  const [ price, size, total ] = data;
  const responsive = useResponsive();
  const priceFormat = useNumberFormat({ minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const numberFormat = useNumberFormat({ minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const gradientDirection = useMemo(() => !responsive.md ? 'right' : 'left', [responsive.md]);
  const stop = useMemo(() => ((total / (maxTotal ?? 1)) * 100), [ total, maxTotal ]);
  const background = useMemo(() => `linear-gradient(to ${gradientDirection}, #064e3b ${stop}%, transparent ${stop}%)`, [ stop, gradientDirection ]);

  return (
    <div style={{ background }} className='flex flex-row-reverse md:flex-row py-1'>
      <div className='flex-1'>{total && numberFormat.format(total)}</div>
      <div className='flex-1'>{numberFormat.format(size)}</div>
      <div className='flex-1 text-green-500'>{priceFormat.format(price)}</div>
    </div>
  );
};
