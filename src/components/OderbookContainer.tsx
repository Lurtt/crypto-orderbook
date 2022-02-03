import { FC } from 'react';

interface Props {
  className: string;
}

export const OderbookContainer: FC<Props> = ({ className, children }) => (
  <div className={className}>
    <h2 className='text-lg tracking-wider'>Order Book</h2>
    {children}
  </div>
);
