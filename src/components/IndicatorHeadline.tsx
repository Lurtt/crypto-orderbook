import { FC } from 'react';

interface Props {
  className: string
  'data-testid': string
}

export const IndicatorHeadline: FC<Props> = ({ className, 'data-testid': dataTestId }) => {
  return (
    <div className={`${className} py-1 text-slate-500 font-medium tracking-wide border-slate-500 border-y`} data-testid={dataTestId}>
      <div className='flex-1'>TOTAL</div>
      <div className='flex-1'>SIZE</div>
      <div className='flex-1'>PRICE</div>
    </div>
  );
};
