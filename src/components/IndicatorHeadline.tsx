import { FC } from 'react';

interface Props {
  className: string
}

export const IndicatorHeadline: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className='flex-1'>TOTAL</div>
      <div className='flex-1'>SIZE</div>
      <div className='flex-1'>PRICE</div>
    </div>
  );
};
